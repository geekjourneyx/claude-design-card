#!/usr/bin/env bun
import { chromium } from 'playwright';
import { resolve, basename, extname } from 'path';
import { existsSync } from 'fs';

// --- Argument parsing ---
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error([
    'Usage:',
    '  bun scripts/screenshot.ts <input.html> [output.png] [width] [height]',
    '  bun scripts/screenshot.ts <input.html> [output.png] [width] --full-page',
    '',
    'Examples:',
    '  bun scripts/screenshot.ts card.html                              # → /tmp/claude-card-card.png, 1080×1080',
    '  bun scripts/screenshot.ts card.html out.png 1280 720             # fixed size',
    '  bun scripts/screenshot.ts longform.html out.png 800 --full-page  # auto-height',
  ].join('\n'));
  process.exit(1);
}

const inputHtml = args[0];

// Determine output path
let outputPng: string;
// Check if args[1] looks like an output file (ends with .png/.jpg or has no extension suggesting it IS a path)
// Simple heuristic: if args[1] exists and doesn't parse as a number and isn't --full-page, treat as output path
const stem = basename(inputHtml, extname(inputHtml));
if (args[1] && !args[1].startsWith('--') && isNaN(Number(args[1]))) {
  outputPng = args[1];
} else {
  outputPng = `/tmp/claude-card-${stem}.png`;
}

// Parse width, height/--full-page
// Remaining args after optional output path
const remainingArgs = (args[1] === outputPng) ? args.slice(2) : args.slice(1);
const widthStr = remainingArgs[0];
const heightStr = remainingArgs[1];

const w = widthStr ? parseInt(widthStr, 10) : 1080;
const fullPage = heightStr === '--full-page';
const h = (!fullPage && heightStr) ? parseInt(heightStr, 10) : 1080;

if (isNaN(w) || w <= 0) {
  console.error(`Invalid width: ${widthStr}`);
  process.exit(1);
}
if (!fullPage && isNaN(h)) {
  console.error(`Invalid height: ${heightStr}`);
  process.exit(1);
}

// Resolve paths
const inputPath = resolve(inputHtml);
if (!existsSync(inputPath)) {
  console.error(`Input file not found: ${inputPath}`);
  process.exit(1);
}
const outputPath = resolve(outputPng);

// --- Screenshot ---
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  if (fullPage) {
    await page.setViewportSize({ width: w, height: 800 });
    await page.goto(`file://${inputPath}`);
    await page.waitForTimeout(3000);
    const contentHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.setViewportSize({ width: w, height: contentHeight });
    await page.screenshot({ path: outputPath, fullPage: true });
    console.log(`✅ Saved: ${outputPath} (${w}×${contentHeight}px)`);
  } else {
    await page.setViewportSize({ width: w, height: h });
    await page.goto(`file://${inputPath}`);
    await page.waitForTimeout(3000);
    await page.screenshot({ path: outputPath, clip: { x: 0, y: 0, width: w, height: h } });
    console.log(`✅ Saved: ${outputPath} (${w}×${h}px)`);
  }

  await browser.close();
})();
