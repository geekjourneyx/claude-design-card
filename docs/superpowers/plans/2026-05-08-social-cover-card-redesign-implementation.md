# Social Cover Card Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade format families A and B from generic summary cards into platform-specific, high-click covers and saveable editorial content cards.

**Architecture:** This is a guidance/spec implementation, not a runtime feature. Update the card-specific truth source first (`references/design-spec.md`), then wire the operational generation rules into `SKILL.md`, then align the broader design reference and public README. Keep QR code changes and unrelated dirty worktree changes out of scope.

**Tech Stack:** Markdown skill docs, Bun screenshot workflow, Playwright rendering script for downstream validation.

---

## File Structure

- Modify: `references/design-spec.md`
  - Responsibility: canonical card-generation visual rules and format structures.
  - Add the A/B social cover redesign as the card-specific source of truth.
- Modify: `SKILL.md`
  - Responsibility: operational instructions used by the AI skill when selecting formats and generating HTML.
  - Add platform cover contracts, content-card aesthetic modes, and new quality gates.
- Modify: `DESIGN.md`
  - Responsibility: broader Claude/Anthropic design system.
  - Add a compact social-card extension without changing core Claude tokens.
- Modify: `README.md`
  - Responsibility: public project documentation.
  - Summarize the new A/B behavior and updated design philosophy.
- Do not modify: `scripts/screenshot.ts`
  - QR rendering changes are unrelated to this redesign plan.

## Implementation Notes

- The worktree may already contain unrelated edits to `DESIGN.md` and `scripts/screenshot.ts`. Do not revert them. Before editing `DESIGN.md`, inspect the current file and apply additions around the existing content.
- `docs/` is ignored in this repository. If committing a new/changed plan or spec file under `docs/`, use `git add -f`.
- All commits must include:

```text
Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
```

---

### Task 1: Update the canonical card design spec

**Files:**
- Modify: `references/design-spec.md`

- [ ] **Step 1: Confirm the approved spec exists**

Run:

```bash
test -f docs/superpowers/specs/2026-05-08-social-cover-card-redesign.md && \
rg "Claude Editorial Cover System|Family A: Platform Cover System|Family B: Content Card System" docs/superpowers/specs/2026-05-08-social-cover-card-redesign.md
```

Expected: all three phrases are printed.

- [ ] **Step 2: Inspect current format catalog**

Run:

```bash
sed -n '59,124p' references/design-spec.md
```

Expected: current typography baseline and format family A/B tables are visible.

- [ ] **Step 3: Replace the generic A/B rows with platform-specific purpose**

In `references/design-spec.md`, replace the existing "格式族 A — 平台封面" and "格式族 B — 图文内容卡" tables with:

```markdown
### 格式族 A — 平台封面

平台封面是「点击前承诺」，不是文章摘要。每张封面最多三层信息：

1. 主判断标题
2. 一句承接承诺
3. 一个证据点（数字 / 来源 / 对象 / 场景 / 对比）

| 格式 | 画布尺寸 | 截图命令参数 | 角色 | 标题视觉占比 | 标题字号 |
|---|---|---|---|---:|---:|
| 公众号首图 | 900 × 383 px | `900 383` | 横向秒读 banner | 28–36% | 44–64px |
| 视频号竖封面 | 1080 × 1440 px | `1080 1440` | 竖版海报 | 30–40% | 76–108px |
| B站/YouTube 横封面 | 1280 × 720 px | `1280 720` | 缩略图路牌 | 32–42% | 64–92px |
| 抖音全屏竖版 | 1080 × 1920 px | `1080 1920` | 全屏停顿设计 | 28–34% | 76–104px |

**A 族禁止**：4–6 条正文摘要、同权模块网格、小字密集说明、把封面当内容页。
```

Then replace the existing family B table with:

```markdown
### 格式族 B — 图文内容卡

图文内容卡是「可保存的知识物件」，不是摘要 PPT。首图负责停留，内页负责理解，工具页负责收藏。

| 格式 | 画布尺寸 | 截图命令参数 | 默认美学模式 | 核心职责 |
|---|---|---|---|---|
| 小红书图文笔记 | 1080 × 1440 px | `1080 1440` | Editorial Artifact + Dark Magazine Cover | 首图承诺 + 轮播结构 |
| 步骤教程卡 | 1080 × 1440 px | `1080 1440` | Practical Toolkit | 动作路径 + 收藏复用 |
| 对比分析卡 | 1080 × 1440 px | `1080 1440` | Editorial Artifact | 一眼分胜负 |

**B 族字号基准（1080×1440）**：

| 层级 | 字号 | 职责 |
|---|---:|---|
| 主标题 | 64–96px | 判断、冲突、收益 |
| 承接句 | 26–34px | 为什么继续看 |
| 正文块 | 24–30px | 步骤、对比、框架 |
| 元信息 / 标签 | 16–20px | 来源、分类、页码 |
```

- [ ] **Step 4: Add a dedicated A/B redesign section**

Immediately after the format catalog section and before "编辑排版结构详解", add:

```markdown
---

## 5. A/B 族社交封面系统

### 第一性原理

- **A 族平台封面**：封面是注意力交易。读者付出一次点击或停顿，封面必须承诺一个明确收益。
- **B 族内容卡**：内容卡是可保存的知识物件。首图停留，内页解释，工具页帮助复用。

### A 族通用结构

```text
一个强判断标题
+ 一句承接承诺
+ 一个可信证据点
+ 足够留白
```

证据点只能选一个：数字、来源、对象、场景、对比标记。

### A 族平台规则

| 平台 | 构图规则 |
|---|---|
| 公众号首图 | 左侧标题，右侧证据或安静装饰。高度有限，标题通常两行内。 |
| B站/YouTube | 缩略图路牌。必须通过眯眼测试，2–6 个关键词缩小后仍可读。 |
| 视频号 | 中央标题锚点，上方轻品牌，下方证据或来源。用竖向节奏，不塞更多文字。 |
| 抖音/故事 | 全屏停顿设计。顶部 14% 弱信息区，中部 44–52% 主阅读区，底部 20% 弱信息区，右侧避让互动按钮。 |

### B 族三种美学模式

#### Editorial Artifact（默认）

高级编辑手册 / 收藏卡 / 知识物件感。使用网格、编号、细规则线、边注、留白和非对称结构。

#### Dark Magazine Cover（强传播首图）

用于观点、争议、反差内容的首图。深色 Claude surface，大标题，单个 coral 关键词，少量几何编辑标记。

#### Practical Toolkit（教程/清单）

用于步骤、清单、方法论内页。动作标题、2–4 个清晰步骤块、强间距、弱装饰。

### A/B 族反模式

1. 摘要幻灯片：标题 + 四条 bullet + footer。
2. 同权圆角卡片网格。
3. 无信息价值的装饰标签。
4. 1080px 画布上使用 16–18px 正文作为核心内容。
5. 过大吼叫标题破坏高级感。
6. 所有平台只换尺寸，不换构图。
7. B 族所有卡都使用同一个「标题 + 模块块」模板。
```

Renumber the old "## 5. 编辑排版结构详解" heading to "## 6. 编辑排版结构详解" and increment later top-level numeric headings by one if necessary.

- [ ] **Step 5: Validate canonical spec content**

Run:

```bash
rg "点击前承诺|可保存的知识物件|全屏停顿设计|Editorial Artifact|Dark Magazine Cover|Practical Toolkit" references/design-spec.md
```

Expected: each phrase appears at least once.

- [ ] **Step 6: Commit canonical spec update**

Run:

```bash
git add references/design-spec.md
git commit -m "docs: define social cover card design system" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

Expected: commit succeeds and includes only `references/design-spec.md`.

---

### Task 2: Update the operational skill instructions

**Files:**
- Modify: `SKILL.md`

- [ ] **Step 1: Inspect current operational sections**

Run:

```bash
sed -n '51,160p' SKILL.md && sed -n '197,223p' SKILL.md && sed -n '509,521p' SKILL.md
```

Expected: current typography reference, format family tables, title rules, and quality gate are visible.

- [ ] **Step 2: Replace the old generic size guidance**

In `SKILL.md`, replace the current "字号参考（按格式宽度缩放）" code block with:

```markdown
### 字号参考（按格式和平台缩放）

```css
/* 格式族 A — 平台封面 */
/* 公众号首图 900×383: 主标题 44-64px，标题视觉占比 28-36% */
/* B站/YouTube 1280×720: 主标题 64-92px，标题视觉占比 32-42% */
/* 视频号 1080×1440: 主标题 76-108px，标题视觉占比 30-40% */
/* 抖音/故事 1080×1920: 主标题 76-104px，标题视觉占比 28-34% */

/* 格式族 B — 图文内容卡 1080×1440 */
/* 主标题: 64-96px, 承接句: 26-34px, 正文块: 24-30px, 元信息: 16-20px */

/* 格式族 C — 社交分享卡 1080×1080 */
/* 主标题: 48-72px, 正文: 18-24px */

/* 格式族 D — 长文编辑排版 800px 以下 */
/* 主标题: 32-40px, 正文: 17px, 副文本: 13px */
```
```

- [ ] **Step 3: Replace family A/B table descriptions**

In `SKILL.md`, replace the existing family A and B tables with:

```markdown
### 格式族 A — 平台封面

平台封面是「点击前承诺」，不是文章摘要。只允许三层信息：主判断标题、一句承接承诺、一个证据点。

| 格式 | 尺寸 px | 比例 | 平台场景 | 构图逻辑 |
|---|---|---|---|---|
| 公众号首图 | 900 × 383 | 2.35:1 | 微信公众号题图 | 横向秒读：左标题，右证据/装饰 |
| 视频号竖封面 | 1080 × 1440 | 3:4 | 微信视频号封面 | 竖版海报：中心标题，上下节奏 |
| B站/YouTube 横封面 | 1280 × 720 | 16:9 | B站/YouTube 封面 | 缩略图路牌：大关键词 + 单视觉钩子 |
| 抖音全屏竖版 | 1080 × 1920 | 9:16 | 抖音/快手/故事 | 全屏停顿：安全区内一个判断 |

### 格式族 B — 图文内容卡

图文内容卡是「可保存的知识物件」，不是摘要 PPT。首图负责停留，内页负责理解，工具页负责收藏。

| 格式 | 尺寸 px | 比例 | 场景 | 默认美学模式 |
|---|---|---|---|---|
| 小红书图文笔记 | 1080 × 1440 | 3:4 | 小红书主图/轮播 | Editorial Artifact + Dark Magazine Cover |
| 步骤教程卡 | 1080 × 1440 | 3:4 | 教程类内容 | Practical Toolkit |
| 对比分析卡 | 1080 × 1440 | 3:4 | 对比/竞品分析 | Editorial Artifact |
```

- [ ] **Step 4: Add an A/B generation contract after the format selection section**

After "风格建议格式", add:

```markdown
## A/B 族生成契约

### A 族平台封面

生成 A 族时，先把内容压缩为：

```text
主判断标题：一个结论 / 冲突 / 反差 / 收益
承接承诺：点进去能获得什么
证据点：数字 / 来源 / 对象 / 场景 / 对比（只能一个）
```

禁止把 4-6 个要点放在封面上。封面负责点击，不负责讲完。

#### 抖音 / 故事安全区

抖音 / 故事不是竖版海报，而是全屏停顿设计：

- 顶部 14%：弱信息区，只放品牌、栏目、轻 kicker。
- 中部 44-52%：主阅读区，放标题和承接承诺。
- 底部 20%：弱信息区，不放关键信息。
- 右侧：避让互动按钮，不放主标题和证据点。

### B 族内容卡

B 族必须先选择美学模式：

| 模式 | 用途 | 视觉语言 |
|---|---|---|
| Editorial Artifact | 默认主模式 | 网格、编号、规则线、边注、留白，像高级编辑手册 |
| Dark Magazine Cover | 强传播首图 | 深色 surface、大标题、单个 coral 关键词、少量几何编辑标记 |
| Practical Toolkit | 教程/清单内页 | 动作标题、2-4 个步骤块、强间距、弱装饰 |

小红书轮播建议角色顺序：封面 → 背景/问题 → 框架 → 示例 → 清单 → 收束。
```

- [ ] **Step 5: Replace or extend title rules**

In the "标题规则" section, append:

```markdown
### 封面标题规则（A/B 族优先）

- 标题必须先给判断，不给主题名。
- 优先使用：旧/新、错/对、失效/有效、隐藏/显性、为什么/怎么做。
- A 族标题只服务点击承诺；B 族首图标题服务停留和收藏。
- 标题过长时先改写，不要一味缩小字号。
- 如果标题只有 2-4 个汉字，可以放大；如果超过 14 个汉字，必须拆分或重写。
```

- [ ] **Step 6: Extend quality gate**

Replace the existing 8 quality checks with:

```markdown
## 质量门槛

生成前过以下检查：

1. 内容是否忠实原文。
2. 标题是否真的是结论、冲突或收益，而不是主题名。
3. A 族封面是否只保留「主判断 + 承接承诺 + 一个证据点」。
4. B 族是否选择了明确美学模式（Editorial Artifact / Dark Magazine Cover / Practical Toolkit）。
5. 是否有清晰的第一眼、第二眼、第三眼。
6. 平台裁切和安全区是否正确，尤其是抖音/故事顶部、底部、右侧避让。
7. 颜色是否全部使用 Claude 设计 token（无外来色）。
8. 手机屏幕上是否可读（A/B 族不得用 16-18px 作为核心正文块）。
9. 是否过度装饰（SVG 元素超过 3 种 / 视觉权重超过 15%）。
10. 每个 SVG 元素是否都能说清楚「它的工作是什么」。
11. 是否在大屏和手机上都能直接截图（没有外部资源依赖）。
12. 是否避免了 AI 味模板：同权圆角网格、摘要幻灯片、无意义标签、所有平台只换尺寸。
```

- [ ] **Step 7: Validate skill instructions**

Run:

```bash
rg "点击前承诺|A/B 族生成契约|抖音 / 故事安全区|Editorial Artifact|AI 味模板" SKILL.md
```

Expected: each phrase appears at least once.

- [ ] **Step 8: Commit skill update**

Run:

```bash
git add SKILL.md
git commit -m "docs: update card generation rules for social covers" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

Expected: commit succeeds and includes only `SKILL.md`.

---

### Task 3: Add a compact social-card extension to DESIGN.md

**Files:**
- Modify: `DESIGN.md`

- [ ] **Step 1: Inspect the end of DESIGN.md**

Run:

```bash
tail -n 80 DESIGN.md
```

Expected: final design-system sections are visible.

- [ ] **Step 2: Append the social-card extension**

At the end of `DESIGN.md`, add:

```markdown
---

## Social Card Extension

Claude social cards extend the base Claude design system into platform-native publishing formats.

### Principle

The base Claude system is warm, editorial, and restrained. Social cards must keep that tone while respecting the reader's platform behavior:

- Platform covers create a click or pause.
- Content cards create understanding and saving.
- Long-form editorial layouts create reading depth.

### Family A — Platform Covers

Family A covers are attention contracts. They do not summarize the article.

```text
Primary judgment headline
+ supporting promise
+ one evidence cue
+ intentional whitespace
```

Use platform-specific proportions:

| Platform | Headline share | Headline size |
|---|---:|---:|
| WeChat cover | 28-36% | 44-64px |
| Bilibili / YouTube | 32-42% | 64-92px |
| WeChat Channels | 30-40% | 76-108px |
| Douyin / Stories | 28-34% | 76-104px |

Douyin / Stories are full-screen pause designs, not ordinary vertical posters. Keep primary content in the safe center, avoid top and bottom UI zones, and keep the right side free of critical text.

### Family B — Content Cards

Family B cards are saveable knowledge objects.

- `Editorial Artifact`: default premium knowledge-card mode.
- `Dark Magazine Cover`: strong first-card mode for conflict or contrast.
- `Practical Toolkit`: tutorial and checklist mode.

For 1080×1440 cards, use:

| Layer | Size |
|---|---:|
| Primary headline | 64-96px |
| Supporting promise | 26-34px |
| Body block | 24-30px |
| Metadata / labels | 16-20px |

### Anti-patterns

- Summary slide composition.
- Equal-weight rounded card grids.
- Decorative labels that do not add information.
- Shrinking long titles until unreadable.
- Oversized shouting headlines that destroy the premium editorial tone.
```

- [ ] **Step 3: Validate DESIGN.md extension**

Run:

```bash
rg "Social Card Extension|Family A covers are attention contracts|Family B cards are saveable knowledge objects|Douyin / Stories are full-screen pause designs" DESIGN.md
```

Expected: all phrases appear.

- [ ] **Step 4: Commit DESIGN.md update only**

Run:

```bash
git add DESIGN.md
git diff --cached --name-only
git commit -m "docs: add social card extension to design system" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

Expected: cached files list only `DESIGN.md`; commit succeeds.

---

### Task 4: Update public README format descriptions

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Inspect current README format section**

Run:

```bash
sed -n '95,130p' README.md && sed -n '137,162p' README.md
```

Expected: current family A/B tables and design system summary are visible.

- [ ] **Step 2: Update family A/B descriptions**

In `README.md`, replace the family A/B table rows with:

```markdown
### 格式族 A — 平台封面

平台封面现在按「点击前承诺」设计：一个强判断标题、一句承接、一个证据点，而不是正文摘要。

| 格式 | 尺寸 | 用途 | 设计重点 |
|------|------|------|------|
| 公众号首图 | 900 × 383 px | 微信公众号文章封面 | 横向秒读，左标题右证据 |
| 视频号竖封面 | 1080 × 1440 px | 微信视频号封面 | 竖版海报，中部标题锚点 |
| B站/YouTube 横封面 | 1280 × 720 px | B站、YouTube 缩略图 | 缩略图路牌，关键词清晰 |
| 抖音全屏竖版 | 1080 × 1920 px | 抖音、TikTok 封面 | 全屏停顿，安全区内一个判断 |

### 格式族 B — 图文内容卡

图文内容卡现在按「可保存的知识物件」设计：首图停留，内页理解，工具页收藏。

| 格式 | 尺寸 | 用途 | 美学模式 |
|------|------|------|------|
| 小红书图文笔记 | 1080 × 1440 px | 小红书主图 / 轮播 | Editorial Artifact + Dark Magazine Cover |
| 步骤教程卡 | 1080 × 1440 px | 教程类内容 | Practical Toolkit |
| 对比分析卡 | 1080 × 1440 px | 对比 / 竞品分析 | Editorial Artifact |
```

- [ ] **Step 3: Update the design system summary**

After the color/font summary, add:

```markdown
新增 A/B 族社交设计原则：

- **A 族平台封面**：封面负责点击，不替代正文。
- **B 族内容卡**：内容卡负责停留、理解和收藏。
- **抖音/故事**：按全屏停顿设计处理，避开顶部、底部和右侧平台 UI。
- **小红书/图文**：首图像封面，内页像高级编辑手册或实用工具卡。
```

- [ ] **Step 4: Validate README update**

Run:

```bash
rg "点击前承诺|可保存的知识物件|全屏停顿|Editorial Artifact|Practical Toolkit" README.md
```

Expected: each phrase appears at least once.

- [ ] **Step 5: Commit README update**

Run:

```bash
git add README.md
git commit -m "docs: describe redesigned social card families" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

Expected: commit succeeds and includes only `README.md`.

---

### Task 5: Cross-document consistency validation

**Files:**
- Validate: `DESIGN.md`
- Validate: `SKILL.md`
- Validate: `README.md`
- Validate: `references/design-spec.md`
- Validate: `docs/superpowers/specs/2026-05-08-social-cover-card-redesign.md`

- [ ] **Step 1: Check required concepts appear in all operational docs**

Run:

```bash
for term in "点击前承诺" "可保存的知识物件" "Editorial Artifact" "Practical Toolkit"; do
  echo "--- $term ---"
  rg "$term" DESIGN.md SKILL.md README.md references/design-spec.md docs/superpowers/specs/2026-05-08-social-cover-card-redesign.md
done
```

Expected: each term appears in at least `SKILL.md`, `references/design-spec.md`, and the spec. README and DESIGN.md should include the public/compact variants.

- [ ] **Step 2: Check forbidden old weak phrasing is reduced**

Run:

```bash
rg "主标题: 48-56px|正文: 16-18px|分层标签 \\+ 图文混排|大标题居中，视觉冲击" SKILL.md references/design-spec.md README.md
```

Expected: no matches in `SKILL.md` or `references/design-spec.md`. If README still contains old wording, replace it with the new public descriptions from Task 4.

- [ ] **Step 3: Check docs do not introduce disallowed colors or bold serif rules**

Run:

```bash
rg "#64748b|#ffffff|font-weight: 700|font-weight:700" SKILL.md references/design-spec.md README.md
```

Expected: matches only in existing "forbidden" examples, not in recommended snippets. If a recommended snippet uses these, replace it with Claude tokens.

- [ ] **Step 4: Check git status for unrelated files**

Run:

```bash
git --no-pager status --short
```

Expected: no staged files. Unrelated unstaged changes may remain, especially `scripts/screenshot.ts`; do not include them unless they are explicitly part of a separate QR task.

- [ ] **Step 5: Commit any missed consistency fixes**

If Steps 1-3 required corrections, run:

```bash
git add DESIGN.md SKILL.md README.md references/design-spec.md
git commit -m "docs: align social card redesign guidance" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

Expected: commit succeeds only if corrections were made. If no corrections were needed, skip this commit.

---

### Task 6: Manual generation acceptance check

**Files:**
- Read: `SKILL.md`
- Read: `references/design-spec.md`
- Create only temporary files under `/tmp` during execution.

- [ ] **Step 1: Create a temporary A-family acceptance fixture**

Create `/tmp/claude-card-acceptance-douyin.html` manually during execution with a 1080×1920 card that follows the new Douyin/Stories guidance:

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <style>
    :root {
      --pg: #f5f4ed;
      --iv: #faf9f5;
      --nk: #141413;
      --tc: #c96442;
      --og: #5e5d59;
      --ws: #b0aea5;
    }
    * { box-sizing: border-box; }
    body { margin: 0; width: 1080px; height: 1920px; background: var(--pg); color: var(--nk); }
    .card { position: relative; width: 1080px; height: 1920px; padding: 150px 96px; overflow: hidden; }
    .safe { position: absolute; inset: 14% 8% 20% 8%; border: 1px dashed rgba(201,100,66,.35); border-radius: 32px; }
    .kicker { position: absolute; top: 18%; left: 96px; font: 500 22px/1 -apple-system, system-ui, sans-serif; letter-spacing: .14em; color: var(--tc); text-transform: uppercase; }
    h1 { position: absolute; top: 35%; left: 96px; right: 180px; margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 96px; font-weight: 500; line-height: .98; letter-spacing: -.035em; }
    h1 em { color: var(--tc); font-style: normal; }
    .promise { position: absolute; top: 56%; left: 96px; right: 220px; font: 500 34px/1.45 -apple-system, system-ui, sans-serif; color: var(--og); }
  </style>
</head>
<body>
  <main class="card">
    <div class="safe" aria-hidden="true"></div>
    <div class="kicker">Full Screen Cover</div>
    <h1>1 秒内<br><em>停住</em></h1>
    <p class="promise">一个判断，而不是一页说明。</p>
  </main>
</body>
</html>
```

- [ ] **Step 2: Render the A-family fixture**

Run:

```bash
bun scripts/screenshot.ts /tmp/claude-card-acceptance-douyin.html /tmp/claude-card-acceptance-douyin.png 1080 1920
```

Expected: command succeeds and writes `/tmp/claude-card-acceptance-douyin.png`.

- [ ] **Step 3: Create a temporary B-family acceptance fixture**

Create `/tmp/claude-card-acceptance-xhs.html` manually during execution with a 1080×1440 card that follows Editorial Artifact:

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <style>
    :root {
      --pg: #f5f4ed;
      --iv: #faf9f5;
      --nk: #141413;
      --tc: #c96442;
      --og: #5e5d59;
      --bw: #e8e6dc;
    }
    * { box-sizing: border-box; }
    body { margin: 0; width: 1080px; height: 1440px; background: var(--pg); color: var(--nk); }
    .card {
      position: relative;
      width: 1080px;
      height: 1440px;
      padding: 84px 86px;
      background:
        linear-gradient(90deg, rgba(20,20,19,.055) 1px, transparent 1px) 0 0 / 72px 72px,
        linear-gradient(rgba(20,20,19,.045) 1px, transparent 1px) 0 0 / 72px 72px,
        var(--pg);
    }
    .num { position: absolute; top: 76px; right: 90px; font: 500 160px/.8 Georgia, serif; color: rgba(201,100,66,.22); }
    .kicker { font: 500 20px/1 -apple-system, system-ui, sans-serif; letter-spacing: .14em; text-transform: uppercase; color: var(--tc); }
    h1 { margin: 250px 0 0; max-width: 760px; font-family: Georgia, 'Times New Roman', serif; font-size: 86px; font-weight: 500; line-height: .98; letter-spacing: -.04em; }
    .promise { margin-top: 34px; max-width: 640px; font: 500 34px/1.45 -apple-system, system-ui, sans-serif; color: var(--og); }
    .rule { position: absolute; left: 86px; right: 86px; bottom: 110px; height: 1px; background: var(--nk); }
    .rule::after { content: ""; position: absolute; left: 50%; top: -7px; width: 14px; height: 14px; transform: rotate(45deg); background: var(--tc); }
  </style>
</head>
<body>
  <main class="card">
    <div class="num">01</div>
    <div class="kicker">Editorial Artifact</div>
    <h1>排版不是<br>装饰</h1>
    <p class="promise">像一本高级编辑手册的单页，安静但有收藏价值。</p>
    <div class="rule" aria-hidden="true"></div>
  </main>
</body>
</html>
```

- [ ] **Step 4: Render the B-family fixture**

Run:

```bash
bun scripts/screenshot.ts /tmp/claude-card-acceptance-xhs.html /tmp/claude-card-acceptance-xhs.png 1080 1440
```

Expected: command succeeds and writes `/tmp/claude-card-acceptance-xhs.png`.

- [ ] **Step 5: Review generated PNGs**

Open or inspect:

```bash
open /tmp/claude-card-acceptance-douyin.png
open /tmp/claude-card-acceptance-xhs.png
```

Expected:

- Douyin fixture keeps the main message in the middle safe zone, not top/bottom/right UI zones.
- Xiaohongshu fixture feels like an Editorial Artifact, not a summary slide.
- Both use Claude tokens and readable type.

Do not commit `/tmp` files.

---

### Task 7: Final status and handoff

**Files:**
- No file changes unless previous validation found issues.

- [ ] **Step 1: Check final git state**

Run:

```bash
git --no-pager status --short
git --no-pager log --oneline -5
```

Expected: recent commits include the social cover redesign docs commits. No staged files remain. Unrelated unstaged files may remain only if they pre-existed and are out of scope.

- [ ] **Step 2: Summarize implementation**

Prepare a concise handoff:

```text
Implemented social cover/card redesign guidance across:
- references/design-spec.md
- SKILL.md
- DESIGN.md
- README.md

Validated required concepts with rg and rendered temporary A/B acceptance fixtures via scripts/screenshot.ts.
Unrelated files not included: scripts/screenshot.ts QR changes.
```

- [ ] **Step 3: If committing plan updates, force-add ignored docs path**

Only if the plan itself needs to be committed:

```bash
git add -f docs/superpowers/plans/2026-05-08-social-cover-card-redesign-implementation.md
git commit -m "docs: add social cover card implementation plan" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

Expected: commit succeeds and includes only this plan file.
