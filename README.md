<div align="center">

# claude-design-card

**14 种格式，一套审美标准 — Claude 设计语言驱动的卡片生成技能**

<img src="assets/banner.png" alt="claude-design-card — Claude 设计语言驱动的卡片生成技能" width="100%">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-1.x-fbf0df.svg)](https://bun.sh/)
[![Playwright](https://img.shields.io/badge/Playwright-1.59-45ba4b.svg)](https://playwright.dev/)

</div>

---

## 这是什么

将任意文本、网页或 URL 转化为精致的可发布卡片，覆盖平台封面、社交分享、长文编辑排版。所有卡片严格遵循 [Claude/Anthropic 设计系统](DESIGN.md)：Parchment 暖色基调、Georgia 衬线字体、Terracotta 强调色，14 种格式一套审美标准。

```
输入：一段文字 / URL / 数据
输出：/tmp/claude-card-*.png（像素精准的设计卡片）
```

---

## 核心特性

<img src="assets/features.png" alt="claude-design-card 核心特性 — 14种格式族、Claude设计语言、SVG系统、长文排版、Playwright截图、自然语言触发" width="100%">

---

## 工作流程

<img src="assets/workflow.png" alt="claude-design-card 工作流程 — 内容解析、格式选择、卡片生成、截图输出" width="100%">

---

## 环境依赖

| 依赖 | 版本 | 说明 |
|------|------|------|
| [Bun](https://bun.sh) | ≥ 1.0 | 运行时 & 包管理器 |
| [Playwright](https://playwright.dev) | ≥ 1.59 | Chromium 截图引擎 |
| TypeScript | ≥ 5.0 | 脚本语言（Bun 原生支持） |
| Node.js | — | 仅 `npx skills add` 安装时需要 |

---

## 安装

**作为 AI Skill（推荐）：**

```bash
npx skills add https://github.com/geekjourneyx/claude-design-card
```

**本地开发：**

```bash
bun install
bunx playwright install chromium
```

---

## 快速上手

```bash
# 固定尺寸（平台封面、内容卡）
bun scripts/screenshot.ts <input.html> [output.png] [width] [height]

# 自动高度（长文编辑排版）
bun scripts/screenshot.ts <input.html> [output.png] [width] --full-page
```

示例：

```bash
# 公众号首图 900×383
bun scripts/screenshot.ts /tmp/card.html /tmp/cover.png 900 383

# 小红书图文笔记 1080×1440
bun scripts/screenshot.ts /tmp/card.html /tmp/xiaohongshu.png 1080 1440

# The Broadsheet 长文排版（自动高度）
bun scripts/screenshot.ts /tmp/broadsheet.html /tmp/broadsheet.png 800 --full-page

# 省略输出路径 → /tmp/claude-card-<basename>.png
bun scripts/screenshot.ts /tmp/my-card.html
```

---

## 支持格式

### 格式族 A — 平台封面

| 格式 | 尺寸 | 适用平台 |
|---|---|---|
| 公众号首图 | 900 × 383 px | 微信公众号文章封面 |
| 视频号竖封面 | 1080 × 1440 px | 微信视频号封面 |
| B站/YouTube 横封面 | 1280 × 720 px | B站、YouTube 缩略图 |
| 抖音全屏竖版 | 1080 × 1920 px | 抖音、TikTok 封面 |

### 格式族 B — 图文内容卡

| 格式 | 尺寸 | 特征 |
|---|---|---|
| 小红书图文笔记 | 1080 × 1440 px | 分层标签 + 图文混排 |
| 步骤教程卡 | 1080 × 1440 px | 编号步骤 + SVG 进度条 |
| 对比分析卡 | 1080 × 1440 px | 双列对比，Terracotta 高亮胜出方 |

### 格式族 C — 社交分享卡

| 格式 | 尺寸 | 特征 |
|---|---|---|
| 金句分享卡 | 1080 × 1080 px | 大号引言符，极简单栏 |
| 数据大字卡 | 1080 × 1080 px | 超大数字主导，SVG 进度条 |
| 方形通用卡 | 1080 × 1080 px | 标准单栏，灵活适配 |

### 格式族 D — 长文编辑排版

| 格式 | 宽度 | 气质 |
|---|---|---|
| The Broadsheet | 800 px | 三栏报纸，版刻装饰，Drop Cap |
| The Feature | 760 px | 杂志深度，暗头双栏，边侧栏 |
| The Reader | 720 px | 文学期刊，Marginalia 边注 |
| The Digest | 760 px | 分析报告，摘要框 + 数据列 |

---

## 设计系统

所有卡片使用统一的 Claude 设计 Token，详见 [DESIGN.md](DESIGN.md) 和 [references/design-spec.md](references/design-spec.md)。

| Token | 色值 | 用途 |
|---|---|---|
| `--pg` Parchment | `#f5f4ed` | 主背景 |
| `--iv` Ivory | `#faf9f5` | 卡面/次背景 |
| `--nk` Near-Black | `#141413` | 正文、标题 |
| `--tc` Terracotta | `#c96442` | 强调、装饰 |
| `--ds` Dark-Surface | `#30302e` | 深色区块 |
| `--og` Olive-Gray | `#5e5d59` | 副文本 |
| `--sg` Stone-Gray | `#87867f` | 元信息 |

字体：Georgia（衬线，标题/正文）+ system-ui（UI/标签）。禁止冷色调蓝灰、纯白 `#ffffff`、`font-weight: 700`。

---

## 作为 AI Skill 使用

在 Claude Code 中安装后，通过自然语言描述触发：

```
帮我把这篇文章做成小红书图文笔记卡片
把这个数据做成方形分享卡
帮我生成一张公众号首图封面
把这篇长文做成 The Broadsheet 编辑排版
```

技能自动完成：分析内容 → 选择格式 → 提炼关键信息（不编造）→ 生成 HTML → 截图输出至 `/tmp/`。

---

## 许可证

[MIT](./LICENSE) — 自由使用、修改、分发。

---

## 关于作者

| | |
|:---|:---|
| 个人主页 | [jieni.ai](https://jieni.ai) |
| GitHub | [geekjourneyx](https://github.com/geekjourneyx) |
| Twitter | [@seekjourney](https://x.com/seekjourney) |
| 公众号 | 微信搜「极客杰尼」 |
