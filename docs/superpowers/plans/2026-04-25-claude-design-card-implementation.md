# claude-design-card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the `any2card` fork into `claude-design-card` — a unified Claude/Anthropic design language card system with 16 platform-specific formats, SVG editorial design, and TypeScript Playwright screenshot generation.

**Architecture:** Single AI skill definition (`SKILL.md`) instructs the agent to generate self-contained HTML cards using the Claude design language (parchment/terracotta/near-black tokens). Cards are rendered via TypeScript Playwright (`scripts/screenshot.ts`, bun runtime) to PNG in `/tmp/`. A design reference document (`references/design-spec.md`) is the single source of visual truth.

**Tech Stack:** HTML/CSS inline card templates, TypeScript, Bun, Playwright (chromium), Claude design tokens (from `DESIGN.md`)

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `SKILL.md` | Full rewrite | AI skill definition: Claude design language, 16 formats, SVG system, interaction model |
| `skills-lock.json` | Edit | Rename key `any2card` → `claude-design-card` |
| `skills/any2card/` | Rename → `skills/claude-design-card/` | Skill package directory |
| `skills/claude-design-card/SKILL.md` | Edit | Sync name field |
| `skills/claude-design-card/README.md` | Edit | Update project name and description |
| `references/design-spec.md` | Full rewrite | Claude design token reference + format catalog |
| `scripts/screenshot.ts` | Create | TypeScript Playwright screenshot, bun runtime |
| `README.md` | Full rewrite | Project docs: installation, usage, format catalog |

---

## Task 1: Git Init + Identity Rename

**Files:**
- Modify: `SKILL.md` (line 2 — name field)
- Modify: `skills-lock.json` (key rename)
- Rename: `skills/any2card/` → `skills/claude-design-card/`
- Modify: `skills/claude-design-card/SKILL.md` (line 2 — name field)

- [ ] **Step 1: Initialize git repository**

```bash
cd /Users/geekjourney/Workspace/web/claude-design-card
git init
git add .
git commit -m "chore: initial commit — any2card fork baseline

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

Expected: `Initialized empty Git repository`, then `master` branch with first commit.

- [ ] **Step 2: Update root SKILL.md name field**

Change line 2 of `SKILL.md` from:
```yaml
name: any2card
```
To:
```yaml
name: claude-design-card
```

- [ ] **Step 3: Update skills-lock.json**

Replace the entire content of `skills-lock.json` with:

```json
{
  "version": 1,
  "skills": {
    "claude-design-card": {
      "source": "geekjourneyx/claude-design-card",
      "sourceType": "github",
      "computedHash": "9dff7c3192e59ba6dfb8102b07740239e674a748143b0d9f3bc1bc65fe74cbb9"
    }
  }
}
```

- [ ] **Step 4: Rename skills directory**

```bash
mv skills/any2card skills/claude-design-card
```

- [ ] **Step 5: Update inner SKILL.md name field**

Change line 2 of `skills/claude-design-card/SKILL.md` from `name: any2card` to `name: claude-design-card`.

- [ ] **Step 6: Commit rename**

```bash
git add -A
git commit -m "chore: rename project from any2card to claude-design-card

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

Expected: `3 files changed` (SKILL.md × 2, skills-lock.json), `1 directory renamed`.

---

## Task 2: Root SKILL.md Full Rewrite

**Files:**
- Modify: `SKILL.md` — replace 12-theme system with Claude design language + 16 format catalog + updated interaction model

The current root `SKILL.md` has a good interaction model (先问再做, canvas strategy, content extraction rules) — these are preserved. What changes: name/description, theme system → format catalog, file output path, screenshot instructions. The SVG design system (added in brainstorming) is already present — merge it in.

- [ ] **Step 1: Replace SKILL.md with new version**

Replace the entire content of `SKILL.md` with:

````markdown
---
name: claude-design-card
description: |
  将任意文本、网页或 URL 生成符合 Claude/Anthropic 设计语言的 HTML 信息卡片，通过 Playwright 截图为 PNG。
  支持 16 种格式：平台封面（公众号、视频号、B站、抖音）、图文内容卡（小红书、教程、对比分析）、
  社交分享卡（金句、数据、方形）、长文编辑排版（Broadsheet、Feature、Reader、Digest）。
  当用户提到「信息卡、卡片、封面、图文笔记、排版、截图、生成图、内容卡」时使用本技能。
---

# claude-design-card

将内容转成符合 Claude/Anthropic 设计语言的 HTML 卡片，并通过 Playwright 截图为 PNG。
核心目标：用统一的设计系统让每种格式都有专属的排版气质，而不是换色皮肤。

## Claude 设计语言

所有卡片必须**只使用**以下 token，不引入任何外部颜色：

### 颜色 Token

| Token | 值 | 用途 |
|---|---|---|
| `--pg` Parchment | `#f5f4ed` | 主背景色 |
| `--iv` Ivory | `#faf9f5` | 卡面/次背景 |
| `--nk` Near-Black | `#141413` | 正文、标题 |
| `--ds` Dark-Surface | `#30302e` | 深色区块背景 |
| `--tc` Terracotta | `#c96442` | 强调色、CTA、装饰 |
| `--og` Olive-Gray | `#5e5d59` | 副文本、说明 |
| `--sg` Stone-Gray | `#87867f` | 元信息、占位 |
| `--bc` Border-Cream | `#f0eee6` | 细分隔线 |
| `--bw` Border-Warm | `#e8e6dc` | 暖色分隔 |
| `--ws` Warm-Silver | `#b0aea5` | 深色背景上的副文本 |

### 字体规则

```css
/* 标题：衬线，中等粗细，绝不使用 font-weight: 700 */
font-family: Georgia, 'Times New Roman', serif;
font-weight: 500;

/* 正文/UI：系统无衬线 */
font-family: -apple-system, system-ui, sans-serif;

/* 正文行高：书籍级 */
line-height: 1.60;

/* Kicker/标签：全大写，小字号，字间距 */
font-size: 9px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase;
```

### 阴影规则

```css
/* 只用环形阴影，不用传统投影 */
box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.08);

/* 卡片外容器 */
box-shadow: rgba(0,0,0,0.08) 0 4px 24px;
```

**禁止**：任何冷色调蓝灰（如 `#64748b`）、纯白背景（用 `#faf9f5`）、`font-weight: 700`。

---

## 格式族与尺寸

选格式的逻辑是：**内容类型 → 平台 → 尺寸**，不是「好看不好看」。

### 格式族 A — 平台封面

| 格式 | 尺寸 px | 比例 | 平台场景 | 气质关键词 |
|---|---|---|---|---|
| 公众号首图 | 900 × 383 | 2.35:1 | 微信公众号题图 | 横版大字，暗色或暖色 |
| 视频号竖封面 | 1080 × 1440 | 3:4 | 微信视频号封面 | 大标题居中，视觉冲击 |
| B站/YouTube 横封面 | 1280 × 720 | 16:9 | B站/YouTube 封面 | 电影海报感 |
| 抖音全屏竖版 | 1080 × 1920 | 9:16 | 抖音/快手/故事 | 全屏沉浸，极简 |

### 格式族 B — 图文内容卡

| 格式 | 尺寸 px | 比例 | 场景 | 气质关键词 |
|---|---|---|---|---|
| 小红书图文笔记 | 1080 × 1440 | 3:4 | 小红书主图 | 分层标签 + 图文混排 |
| 步骤教程卡 | 1080 × 1440 | 3:4 | 教程类内容 | 编号步骤 + 进度感 |
| 对比分析卡 | 1080 × 1440 | 3:4 | 对比/竞品分析 | 双列对比 + 胜出高亮 |

### 格式族 C — 社交分享卡

| 格式 | 尺寸 px | 比例 | 场景 | 气质关键词 |
|---|---|---|---|---|
| 金句分享卡 | 1080 × 1080 | 1:1 | 语录/引文传播 | 大号引言符 + 极简 |
| 数据大字卡 | 1080 × 1080 | 1:1 | 数字/统计突出 | 超大数字 + 说明 |
| 方形通用卡 | 1080 × 1080 | 1:1 | 通用社交分享 | 标准单栏，灵活 |

### 格式族 D — 长文编辑排版

| 格式 | 宽度 px | 高度 | 气质 | 适合内容 |
|---|---|---|---|---|
| The Broadsheet | 800 | auto | 三栏报纸 + 版刻装饰 | 时事评论、周报 |
| The Feature | 760 | auto | 暗头 + 非对称双栏 | 深度报道、特稿 |
| The Reader | 720 | auto | 单栏 + 边注 Marginalia | 随笔、书评、文化评论 |
| The Digest | 760 | auto | 摘要框 + 数据列 | 研究报告、行业分析 |

长文编辑排版截图时使用自动高度模式（`--full-page`）。

---

## 格式选择决策表

| 内容类型 | 首选格式 | 备选格式 | 关键确认点 |
|---|---|---|---|
| 金句 / 语录 | 金句分享卡 | 方形通用卡 | 有没有来源要标注 |
| 教程 / 步骤 | 步骤教程卡 | 小红书图文笔记 | 几个步骤，是否要截图 |
| 数据 / 统计突出 | 数据大字卡 | The Digest | 数字多还是文字多 |
| 对比 / 竞品 | 对比分析卡 | The Feature | 几组对比，单双列 |
| 长文摘要 / 观点 | The Feature | 小红书图文笔记 | 读者还是传播 |
| 新闻 / 评论 | The Broadsheet | The Feature | 字数多不多 |
| 随笔 / 散文 | The Reader | The Feature | 有没有注释需要 |
| 研究 / 分析报告 | The Digest | 对比分析卡 | 数据量 |
| 视频内容 | 视频号竖封面 / B站横封面 | — | 平台 |
| 公众号配图 | 公众号首图 | 视频号竖封面 | 是否作为题图 |
| 抖音/故事 | 抖音全屏竖版 | — | 是否要保留品牌 |

---

## 先问再做

先分析内容，再给用户 **1 个主推荐 + 2 个备选格式建议**，不要一上来就生成 HTML。

### 触发问答的规则

- 只要存在明显不确定性，就先问，不要猜。
- 只要用户偏好会改变格式、构图或节奏，就先问。
- 只要输入信息不足以稳定选主推荐，就先问。
- 不要把问答理解成阻塞，而要理解成降低试错成本。

### 默认交互顺序

1. 判断内容类型、信息密度和目标平台。
2. 给出 1 个主推荐 + 2 个备选，说明每个适合的原因。
3. 问 1-2 个会改变结果的关键问题（最多 3 个）：
   - 目标平台（微信 / 小红书 / B站 / 通用）
   - 希望阅读型还是传播型
   - 是否有品牌色要求
4. 用户确认后，进入 HTML 生成。
5. 如果用户说「按你判断」或场景已足够明确，直接生成。

### 风格建议格式

每次先给：
- 推荐格式 + 尺寸
- 适用理由
- 备选一 + 适用理由
- 备选二 + 适用理由
- 默认分支：如不选则按主推荐

---

## 内容提炼规则

### 只保留「删掉就会损失信息」的内容

- 找核心判断，不找表面描述。
- 找具体数字、倍率、年份、金额、对比关系。
- 找因果链：A 导致 B，B 导致 C。
- 找反转点：最意外、最反直觉、最能转述的一句话。
- 控制在 4-6 个要点，超过就压缩。

### 标题规则

- 标题必须是结论，不是背景介绍。
- 标题优先用动词、数字、冲突、反差。
- 避免日记式、主题式、名词堆砌式标题。

### 金句规则

- 金句必须来自原文事实或原文句子。
- 不允许为了排版好看而捏造。

### 数据规则

- 所有数字必须忠实原文。
- 不混淆 ARR、月收入、估值、样本数等不同量纲。

---

## 图表规则

只有当图比纯文本能多传递信息时才加图。

| 内容特征 | 建议图形 |
|---|---|
| 因果链 | Mermaid 流程图 |
| 步骤流程 | Mermaid 流程图 |
| 概念关系 | Mermaid 关系图 |
| 数据、趋势、比例 | 内联 SVG（见 SVG 设计系统） |
| 排版装饰、节奏分割 | 内联 SVG（见 SVG 设计系统） |
| 纯观点或纯列表 | 不加图 |

图表放在标题之后、要点之前，作为结构总览，不要抢正文。

## SVG 设计系统

SVG 不是装饰工具，是**印刷工艺的数字实现**。每个 SVG 元素必须对应一种具体的排版传统或信息功能，能清楚回答「它在这里的工作是什么」。

### 核心原则：CSS 优先

**只有当 SVG 能做 CSS 做不到的事，才使用 SVG。**

| CSS 能做到的（用 CSS） | SVG 应该做的 |
|---|---|
| 直线分隔线（border） | 带节点/菱形/圆的装饰规则线 |
| 颜色填充背景 | 网点/交叉线图案（`<pattern>`） |
| Unicode 引号（"…"） | 70px+ 的精确大引号（字体渲染在大尺寸时失真） |
| 箭头文字（→） | 有收笔的印刷风格指示符 |
| 纯色矩形 | 有数据意义的进度条 / 折线图 / 柱状图 |

### SVG 元素分类

按**功能**分类，不是固定清单。可在每类中自由发挥构图，但须遵守设计约束。

#### 类型 A — 排版装饰器（Typographic Ornament）

**功能**：分割视觉节奏，替代平庸的 CSS 分隔线  
**传统来源**：活字印刷版刻装饰规则（column rule, ornamental rule）

设计约束：
- 构图必须轴对称
- 中心元素颜色：`#c96442`；规则线：`#b0aea5`，线宽 ≤ 0.8px
- 中心元素形状限：菱形、圆、双圆、花边节点
- 整体尺寸：宽 ≤ 240px，高 ≤ 20px

禁止：箭头、星形、爆炸形、自由曲线形状

#### 类型 B — 大号引言符（Display Quote Mark）

**功能**：在 Pull Quote 下层置入半透明大引号，增加排版层次  
**传统来源**：出版社排版，19 世纪对开印刷传统

设计约束：
- 用 SVG `<text>` + Georgia 字体（不用手绘路径）
- 字号 70–100px，透明度 0.07–0.12
- 颜色：terracotta（内容型）或 near-black（文学型）
- `position: absolute`，`z-index: 0`，不遮挡正文

#### 类型 C — 编辑插图（Editorial Illustration）

**功能**：替代空白占位图，用几何构成传达文章核心隐喻  
**传统来源**：Bauhaus、De Stijl、20 世纪杂志封面插图

设计约束：
- 只用基本几何形：`circle`、`rect`、`line`、`polygon`、`polyline`
- 只用 Claude 设计 token 颜色
- 透明度梯度：最深 0.6，最浅 0.06
- 必须有叙事意图：构图能解释文章核心隐喻
- 尺寸：宽 280–480px

禁止：文字标签嵌入插图、写实风格、icon 库拼合

#### 类型 D — 数据可视化（Embedded Data Viz）

**功能**：用视觉语言替代纯数字，让量级和趋势感直觉化

设计约束：
- 折线图：`<polyline>` + `stroke-dasharray` 动画
- 进度条：`<line>` + `stroke-dasharray` 动画
- 柱状图：`<rect>` + `rx="1"`
- 正向数据：terracotta；负向数据：stone-gray
- 动画延迟 0.5–1.5s

禁止：饼图、3D 效果、渐变填充

#### 类型 E — 图案底纹（Pattern Texture）

**功能**：用 `<pattern>` 在区块背景制造印刷质感

设计约束：
- 只用网点（`<circle>`）或交叉线（两条正交 `<line>`）
- 颜色只用 terracotta `#c96442`，透明度 0.05–0.08
- `pattern` 单元格：6–10px 正方形

### 约束总表

| 约束维度 | 规则 |
|---|---|
| **数量上限** | 每张卡片最多 3 种 SVG 类型 |
| **颜色** | 只用 Claude 设计 token |
| **视觉权重** | 装饰性 SVG 不超过内容区 15% 视觉面积 |
| **动画** | 只允许 `stroke-dasharray` 和 `opacity` 动画 |
| **无障碍** | 装饰性 SVG 必须加 `aria-hidden="true"` |
| **叙事性** | 每个 SVG 必须能回答「它在这里的工作是什么」 |

### 使用决策流程

```
有数据/比例/趋势？       → 类型 D（数据可视化）
有 Pull Quote？          → 类型 B（大号引言符）
需要视觉节奏分割？        → 类型 A（排版装饰器）
需要区块背景区分？        → 类型 E（图案底纹）
Feature 风格需要头图？   → 类型 C（编辑插图）
以上都不是               → 不加 SVG
```

---

## 生成流程

### Step 1：内容提炼

输出：主标题、副标题、4-6 个要点、1 句金句、来源信息。

### Step 2：选格式

根据内容类型和目标平台，选定格式族和具体格式，确认尺寸。

### Step 3：决定 SVG 元素

按 SVG 决策流程逐项判断，记录每个 SVG 元素「在这里的工作是什么」。

### Step 4：生成 HTML

生成**完整自包含** HTML 文件：
- 所有样式内联，不依赖外部 CSS / JS
- 使用本地字体（`TsangerJinKai02-W04.ttf`、`NotoSerifSC-Regular.ttf`），通过 `@font-face` 加载
- 卡片宽度与格式尺寸匹配
- 底部包含一键保存 PNG 按钮（使用 `html2canvas` 或浏览器原生 API）
- SVG 动画在截图前已完成（通过 waitForTimeout 保证）

### Step 5：保存 HTML

```bash
# 默认路径：
/tmp/claude-card-[关键词].html
```

### Step 6：截图生成 PNG

```bash
# 固定尺寸格式（封面类、分享卡类）：
bun scripts/screenshot.ts /tmp/claude-card-[关键词].html [output.png] [width] [height]

# 长文编辑排版（自动高度）：
bun scripts/screenshot.ts /tmp/claude-card-[关键词].html [output.png] [width] --full-page
```

默认输出：`/tmp/claude-card-[关键词].png`

---

## 质量门槛

生成前过以下 8 个检查：

1. 内容是否忠实原文。
2. 标题是否真的是结论。
3. 颜色是否全部使用 Claude 设计 token（无外来色）。
4. 手机屏幕上是否可读（字号 ≥ 13px，行高 ≥ 1.55）。
5. 是否过度装饰（SVG 元素超过 3 种 / 视觉权重超过 15%）。
6. 每个 SVG 元素是否都能说清楚「它的工作是什么」。
7. 是否在大屏和手机上都能直接截图（没有外部资源依赖）。
8. 是否看起来像独立设计系统，而不是任何其他风格的 fork。
````

- [ ] **Step 2: Verify SKILL.md saved correctly**

```bash
head -5 SKILL.md && echo "---" && grep -c "claude-design-card" SKILL.md
```

Expected: name field shows `claude-design-card`, count ≥ 3.

- [ ] **Step 3: Commit**

```bash
git add SKILL.md
git commit -m "feat: rewrite SKILL.md with Claude design language and 16-format catalog

- Replace 12-theme system with unified Claude design language
- Add format catalog: platform covers, content cards, share cards, editorial
- Add SVG design system with 5 functional categories
- Update format selection decision table
- Update file output to /tmp/claude-card-*.png
- Update screenshot generation instructions

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

## Task 3: Rewrite references/design-spec.md

**Files:**
- Modify: `references/design-spec.md` — replace any2card spec with Claude design token reference + format catalog

- [ ] **Step 1: Replace design-spec.md**

Replace the entire content of `references/design-spec.md` with:

```markdown
# claude-design-card 设计规范

这份文档是卡片生成的唯一视觉真相源（Single Source of Truth）。
DESIGN.md 定义了 Claude/Anthropic 的完整设计系统；本文件定义其在卡片生成中的具体应用规则。

---

## 1. 颜色 Token

所有卡片**只使用**以下 token，不引入任何外部颜色。生成 HTML 时用 CSS 变量绑定。

```css
:root {
  --pg: #f5f4ed;   /* Parchment — 主背景 */
  --iv: #faf9f5;   /* Ivory — 卡面/次背景 */
  --nk: #141413;   /* Near-Black — 正文、标题 */
  --ds: #30302e;   /* Dark-Surface — 深色区块 */
  --tc: #c96442;   /* Terracotta — 强调、装饰 */
  --og: #5e5d59;   /* Olive-Gray — 副文本 */
  --sg: #87867f;   /* Stone-Gray — 元信息 */
  --bc: #f0eee6;   /* Border-Cream — 细分隔 */
  --bw: #e8e6dc;   /* Border-Warm — 暖色分隔 */
  --ws: #b0aea5;   /* Warm-Silver — 深背景副文本 */
}
```

**禁止**：任何冷色调蓝灰（如 `#64748b`）、纯白 `#ffffff`（改用 `--iv`）、`font-weight: 700`。

---

## 2. 字体系统

### 本地字体（优先使用）

```css
@font-face {
  font-family: 'TsangerJinKai';
  src: url('../skills/claude-design-card/assets/TsangerJinKai02-W04.ttf') format('truetype');
  font-weight: 400;
}
@font-face {
  font-family: 'NotoSerifSC';
  src: url('../skills/claude-design-card/assets/NotoSerifSC-Regular.ttf') format('truetype');
  font-weight: 400;
}
```

### 字体分工

| 场景 | 字体 | 说明 |
|---|---|---|
| 编辑排版标题/正文 | `Georgia, 'Times New Roman', serif` | 20 世纪编辑字体 |
| UI / kicker / 标签 | `-apple-system, system-ui, sans-serif` | 清晰、现代 |
| 中文标题（可选） | `TsangerJinKai, Georgia, serif` | 强调中文排版美感 |
| 中文正文（可选） | `NotoSerifSC, Georgia, serif` | 中文衬线，长文舒适 |

### 字号基准

| 用途 | 字号 | 行高 |
|---|---|---|
| 大标题（hero） | 40–56px | 1.05–1.15 |
| 章节标题 | 22–32px | 1.25 |
| 正文 | 13.5–16px | 1.58–1.68 |
| 副文本 / 说明 | 11–13px | 1.45–1.55 |
| Kicker / 标签 | 9–10px | 1.0，letter-spacing: 1px |

**规则**：标题 `font-weight: 500`，绝不使用 700。

---

## 3. 间距系统

```css
/* 卡片内边距 */
.card-padding-sm  { padding: 20px 24px; }  /* 小卡片 */
.card-padding-md  { padding: 32px 40px; }  /* 标准 */
.card-padding-lg  { padding: 44px 56px; }  /* 编辑排版 */

/* 元素间距遵循 8px 网格：8, 16, 24, 32, 48, 64 */
```

---

## 4. 格式目录与尺寸

### 格式族 A — 平台封面

| 格式 | 画布尺寸 | 截图参数 | 主色方案 |
|---|---|---|---|
| 公众号首图 | 900 × 383 px | `-w 900 -h 383` | 深色（`--nk` 背景）或暖色（`--pg` 背景） |
| 视频号竖封面 | 1080 × 1440 px | `-w 1080 -h 1440` | 深色大标题居中 |
| B站/YouTube 横封面 | 1280 × 720 px | `-w 1280 -h 720` | 电影海报感，terracotta 强调 |
| 抖音全屏竖版 | 1080 × 1920 px | `-w 1080 -h 1920` | 全屏沉浸，极简居中 |

### 格式族 B — 图文内容卡

| 格式 | 画布尺寸 | 截图参数 | 特征 |
|---|---|---|---|
| 小红书图文笔记 | 1080 × 1440 px | `-w 1080 -h 1440` | 分层标签 + 图文混排 |
| 步骤教程卡 | 1080 × 1440 px | `-w 1080 -h 1440` | 编号步骤 + 进度条 |
| 对比分析卡 | 1080 × 1440 px | `-w 1080 -h 1440` | 双列对比，胜出高亮 |

### 格式族 C — 社交分享卡

| 格式 | 画布尺寸 | 截图参数 | 特征 |
|---|---|---|---|
| 金句分享卡 | 1080 × 1080 px | `-w 1080 -h 1080` | 大号引言符，极简 |
| 数据大字卡 | 1080 × 1080 px | `-w 1080 -h 1080` | 超大数字主导 |
| 方形通用卡 | 1080 × 1080 px | `-w 1080 -h 1080` | 标准单栏，灵活 |

### 格式族 D — 长文编辑排版

| 格式 | 卡片宽度 | 截图模式 | 气质 |
|---|---|---|---|
| The Broadsheet | 800 px | `--full-page` | 三栏报纸，版刻装饰 |
| The Feature | 760 px | `--full-page` | 杂志深度，暗头双栏 |
| The Reader | 720 px | `--full-page` | 文学期刊，边注 Marginalia |
| The Digest | 760 px | `--full-page` | 分析报告，摘要框 + 数据列 |

---

## 5. 编辑排版模式详解

### The Broadsheet（三栏报纸）

```
┌─────────────────────────────────────────┐
│  Masthead: 刊名  |  日期  |  栏目信息   │  ← 厚实下划线
├─────────────────────────────────────────┤
│  Lead Headline（大字，3-4 行）          │
│  Standfirst（引言斜体）                 │
├──────────┬──────────┬───────────────────┤
│  Byline  │          │                   │  ← column-count: 3
│  正文第一 │ Pull Q   │  正文第三栏       │     column-rule: 1px solid --bw
│  栏，有   │ 破栏引言 │                   │
│  Drop Cap│（span all│                   │
├──────────┴──────────┴───────────────────┤
│  SVG 三菱分割线（类型 A）               │
│  正文继续                               │
└─────────────────────────────────────────┘
```

**Drop Cap**：`font-size: 3.8em; float: left; color: var(--tc)`  
**Pull Quote**：`column-span: all; border-top: 2px solid --nk`  
**SVG 分割线**：类型 A，宽 210px，三菱构型

### The Feature（杂志深度）

```
┌────────────────────────────────────┐
│  深色头部（--nk 背景）             │
│  Kicker ── ──── ──── 分隔线       │
│  大标题（52px，--iv 色）           │
│  Standfirst（斜体，--ws 色）       │
├─────────────────┬──────────────────┤
│  Meta bar（--ds │ 背景，小字）     │
├──────────────┬──┴──────────────────┤
│  SVG 编辑插图│  侧边栏（网点底纹） │
│  （类型 C）  │  相关数据          │  ← 类型 E 网点
├──────────────┤  延伸阅读          │
│  主栏正文    │                    │
│  Drop Cap    │                    │
│  Pull Quote  │                    │  ← 类型 B 引言符
│  正文继续    │                    │
└──────────────┴────────────────────┘
```

### The Reader（文学期刊）

```
┌─────────────────────────────────┐
│  Running Head（小大写，左右对齐）│
│  Section Tag（kicker）          │
│  标题（40px）                   │
│  Byline                        │
│  Standfirst（斜体）             │
├───────────────────┬─────────────┤
│  正文 + Drop Cap  │  Marginalia │  ← 1fr 160px 网格
│  Pull Quote 居中   │  边注 1    │
│  SVG 三圆节点分割  │  边注 2    │  ← 类型 A
│  正文继续          │  边注 3    │
└───────────────────┴─────────────┘
```

### The Digest（分析报告）

```
┌───────────────────────────────────┐
│  深色头部                         │
│  Vol/期号 + 报告标题              │
│  副标题                           │
├───────────────────────────────────┤
│  摘要框（--pg 背景，--tc 左边框）  │
├───────────────────────────────────┤
│  SVG 圆徽章 I.  │ 章节标题        │  ← 类型 D 徽章
├────────────────┬──────────────────┤
│  正文 Georgia  │  数据列          │
│                │  进度条动画      │  ← 类型 D 进度条
│                │  大数字 + 说明   │
├────────────────┴──────────────────┤
│  关键发现框                       │
│  SVG 箭头列表项                   │  ← 类型 A 变体
└───────────────────────────────────┘
```

---

## 6. SVG Token 快查

```
类型 A  装饰分割线  →  中心色 #c96442 / 规则线 #b0aea5 / 线宽 ≤0.8px
类型 B  大引言符    →  <text> Georgia 70-100px / opacity 0.07-0.12
类型 C  编辑插图    →  几何基本形 / 最深 0.6 最浅 0.06
类型 D  数据可视化  →  stroke-dasharray 动画 / 延迟 0.5-1.5s
类型 E  图案底纹    →  <pattern> 6-10px 单元 / #c96442 opacity 0.05-0.08
```

---

## 7. 不可变规则

1. 内容必须忠实原文，不得编造。
2. 任何视觉装饰都不能损害可读性。
3. 卡片必须完全自包含（无外部依赖，可离线截图）。
4. 截图前 SVG 动画必须已完成（waitForTimeout ≥ 3000ms）。
5. 所有颜色必须在 Claude token 范围内。
6. 标题 `font-weight: 500`，绝不使用 700。
7. 每种格式必须有独立的排版结构，不能只是换色皮肤。
```

- [ ] **Step 2: Verify**

```bash
grep -c "Token\|格式\|SVG" references/design-spec.md
```

Expected: ≥ 10 matches.

- [ ] **Step 3: Commit**

```bash
git add references/design-spec.md
git commit -m "docs: rewrite design-spec.md with Claude design language

- Add complete color token system with CSS variables
- Add font system: local fonts + web fallbacks
- Add spacing system (8px grid)
- Add format catalog with exact dimensions for all 16 formats
- Add editorial layout ASCII diagrams
- Add SVG token quick-reference

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

## Task 4: Create scripts/screenshot.ts

**Files:**
- Create: `scripts/screenshot.ts`

TypeScript Playwright screenshot script, bun runtime. Supports:
- Fixed dimensions: `bun scripts/screenshot.ts input.html [output.png] [width] [height]`
- Auto-height (editorial): `bun scripts/screenshot.ts input.html [output.png] [width] --full-page`
- Default output: `/tmp/claude-card-<basename>.png`

- [ ] **Step 1: Install Playwright**

```bash
cd /Users/geekjourney/Workspace/web/claude-design-card
bun add playwright
bunx playwright install chromium
```

Expected: `playwright` in `node_modules`, chromium binary downloaded.

- [ ] **Step 2: Create scripts/screenshot.ts**

Create `scripts/screenshot.ts` with the following content:

```typescript
#!/usr/bin/env bun
/**
 * claude-design-card screenshot utility
 *
 * Usage (fixed dimensions):
 *   bun scripts/screenshot.ts <input.html> [output.png] [width] [height]
 *
 * Usage (auto-height — for editorial layouts):
 *   bun scripts/screenshot.ts <input.html> [output.png] [width] --full-page
 *
 * Examples:
 *   bun scripts/screenshot.ts /tmp/claude-card-quote.html
 *   bun scripts/screenshot.ts /tmp/claude-card-quote.html /tmp/quote.png 1080 1080
 *   bun scripts/screenshot.ts /tmp/claude-card-broadsheet.html /tmp/broadsheet.png 800 --full-page
 *
 * Defaults:
 *   output  → /tmp/claude-card-<basename>.png
 *   width   → 1080
 *   height  → 1080 (ignored in full-page mode)
 */

import { chromium } from "playwright";
import { resolve, basename, extname } from "path";
import { existsSync } from "fs";

// ── Parse args ─────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
  console.log(`
Usage:
  bun scripts/screenshot.ts <input.html> [output.png] [width] [height|--full-page]

Examples:
  bun scripts/screenshot.ts /tmp/claude-card-quote.html
  bun scripts/screenshot.ts /tmp/claude-card-quote.html /tmp/out.png 1080 1080
  bun scripts/screenshot.ts /tmp/claude-card-broadsheet.html /tmp/bs.png 800 --full-page
  `);
  process.exit(0);
}

const inputHtml = args[0];

// Determine if full-page mode (last arg is --full-page)
const fullPageMode = args.includes("--full-page");

// Parse width/height (after removing --full-page flag)
const positionalArgs = args.filter((a) => a !== "--full-page");
const [, outputArg, widthArg, heightArg] = positionalArgs;

const inputPath = resolve(inputHtml);
if (!existsSync(inputPath)) {
  console.error(`❌ Input file not found: ${inputPath}`);
  process.exit(1);
}

const name = basename(inputHtml, extname(inputHtml));
const outputPath = resolve(outputArg ?? `/tmp/claude-card-${name}.png`);
const viewportWidth = parseInt(widthArg ?? "1080", 10);
// height is only used in fixed mode; fullPage mode overrides
const viewportHeight = parseInt(heightArg ?? "1080", 10);

// ── Screenshot ──────────────────────────────────────────────────────────────

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  if (fullPageMode) {
    // For editorial layouts: set a tall initial viewport, then measure actual height
    await page.setViewportSize({ width: viewportWidth, height: 4000 });
    await page.goto(`file://${inputPath}`);

    // Wait for SVG animations to complete (3s covers stroke-dasharray delays)
    await page.waitForTimeout(3000);

    // Measure actual content height
    const contentHeight = await page.evaluate(
      () => document.documentElement.scrollHeight
    );

    // Resize viewport to exact content height before screenshotting
    await page.setViewportSize({ width: viewportWidth, height: contentHeight });

    await page.screenshot({
      path: outputPath,
      clip: { x: 0, y: 0, width: viewportWidth, height: contentHeight },
    });

    console.log(`✅ ${outputPath} (${viewportWidth}×${contentHeight} auto)`);
  } else {
    // Fixed dimension mode (social media covers, share cards, etc.)
    await page.setViewportSize({
      width: viewportWidth,
      height: viewportHeight,
    });
    await page.goto(`file://${inputPath}`);

    // Wait for SVG animations to complete
    await page.waitForTimeout(3000);

    await page.screenshot({
      path: outputPath,
      clip: { x: 0, y: 0, width: viewportWidth, height: viewportHeight },
    });

    console.log(`✅ ${outputPath} (${viewportWidth}×${viewportHeight})`);
  }

  await browser.close();
})();
```

- [ ] **Step 3: Make it executable**

```bash
chmod +x scripts/screenshot.ts
```

- [ ] **Step 4: Smoke test with a simple HTML file**

```bash
echo '<html><body style="background:#f5f4ed;display:flex;align-items:center;justify-content:center;height:100vh;font-family:Georgia;font-size:48px;color:#141413">claude-design-card ✓</body></html>' > /tmp/test-card.html

bun scripts/screenshot.ts /tmp/test-card.html /tmp/test-card.png 1080 1080
```

Expected output: `✅ /tmp/test-card.png (1080×1080)`

Verify the PNG exists and is non-empty:
```bash
ls -lh /tmp/test-card.png
```

Expected: file size > 10KB.

- [ ] **Step 5: Test full-page mode**

```bash
echo '<html><body style="background:#f5f4ed;padding:40px;font-family:Georgia"><h1 style="color:#c96442">Full Page Test</h1><p style="line-height:1.6;color:#141413">Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(20) + '</p></body></html>' > /tmp/test-editorial.html

bun scripts/screenshot.ts /tmp/test-editorial.html /tmp/test-editorial.png 800 --full-page
```

Expected: `✅ /tmp/test-editorial.png (800×NNNN auto)` where NNNN > 1080.

- [ ] **Step 6: Commit**

```bash
git add scripts/screenshot.ts package.json bun.lockb 2>/dev/null; git add scripts/screenshot.ts
git commit -m "feat: add TypeScript Playwright screenshot script

- Fixed dimension mode: for social covers and share cards
- Auto-height (--full-page) mode: for editorial layouts
- Default output: /tmp/claude-card-<basename>.png
- waitForTimeout(3000) ensures SVG animations complete before capture

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

## Task 5: Rewrite README.md

**Files:**
- Modify: `README.md` — full rewrite, new project name and description

- [ ] **Step 1: Replace README.md content**

Replace the entire content of `README.md` with:

```markdown
# claude-design-card

> 将任意内容转成符合 Claude/Anthropic 设计语言的 HTML 信息卡片，一键截图为 PNG。

## 设计理念

claude-design-card 使用统一的 Claude/Anthropic 设计语言：暖色调（羊皮纸底色 `#f5f4ed`）、赤陶强调色（`#c96442`）、精确的衬线排版。16 种格式各有专属排版结构，不是换色皮肤。

## 支持格式

### 平台封面

| 格式 | 尺寸 | 平台 |
|---|---|---|
| 公众号首图 | 900 × 383 | 微信公众号 |
| 视频号竖封面 | 1080 × 1440 | 微信视频号 |
| B站/YouTube 横封面 | 1280 × 720 | B站 / YouTube |
| 抖音全屏竖版 | 1080 × 1920 | 抖音 / 快手 |

### 图文内容卡

| 格式 | 尺寸 | 场景 |
|---|---|---|
| 小红书图文笔记 | 1080 × 1440 | 小红书主图 |
| 步骤教程卡 | 1080 × 1440 | 教程类内容 |
| 对比分析卡 | 1080 × 1440 | 对比 / 竞品分析 |

### 社交分享卡

| 格式 | 尺寸 | 场景 |
|---|---|---|
| 金句分享卡 | 1080 × 1080 | 语录 / 引文 |
| 数据大字卡 | 1080 × 1080 | 数字突出 |
| 方形通用卡 | 1080 × 1080 | 通用社交 |

### 长文编辑排版

| 格式 | 宽度 | 气质 |
|---|---|---|
| The Broadsheet | 800 px | 三栏报纸，版刻装饰 |
| The Feature | 760 px | 杂志深度，暗头双栏 |
| The Reader | 720 px | 文学期刊，边注 Marginalia |
| The Digest | 760 px | 分析报告，摘要框 + 数据列 |

## 安装

```bash
npx skills add geekjourneyx/claude-design-card
```

## 使用

在 Claude Code 中直接对话：

```
把这篇文章做成小红书图文笔记
把这条金句做成 1080×1080 分享卡
把这份报告做成 The Digest 排版
给这个视频做一个视频号封面
```

## 截图生成

卡片 HTML 生成后，通过内置 Playwright 脚本截图为 PNG：

```bash
# 固定尺寸（社交封面、分享卡）
bun scripts/screenshot.ts /tmp/claude-card-quote.html /tmp/quote.png 1080 1080

# 自动高度（长文编辑排版）
bun scripts/screenshot.ts /tmp/claude-card-broadsheet.html /tmp/broadsheet.png 800 --full-page
```

默认输出至 `/tmp/claude-card-<名称>.png`。

## 设计语言

本项目使用 Claude/Anthropic 设计系统，核心 token：

| Token | 颜色 | 用途 |
|---|---|---|
| Parchment | `#f5f4ed` | 主背景 |
| Terracotta | `#c96442` | 强调色 |
| Near-Black | `#141413` | 正文 |
| Ivory | `#faf9f5` | 卡面背景 |

详见 [DESIGN.md](./DESIGN.md) 和 [references/design-spec.md](./references/design-spec.md)。

## 依赖

- [Playwright](https://playwright.dev/) — Chromium 截图
- [Bun](https://bun.sh/) — TypeScript 运行时
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: rewrite README for claude-design-card

- Document all 16 supported formats with dimensions
- Add installation, usage, and screenshot generation instructions
- Add design language token reference

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

## Task 6: Update Inner Skill Files

**Files:**
- Modify: `skills/claude-design-card/SKILL.md` — sync description with root
- Modify: `skills/claude-design-card/README.md` — update project name throughout

- [ ] **Step 1: Sync inner SKILL.md description**

Replace the `description` block in `skills/claude-design-card/SKILL.md` (lines 3–6) with:

```yaml
description: |
  将任意文本、网页或 URL 生成符合 Claude/Anthropic 设计语言的 HTML 信息卡片，通过 Playwright 截图为 PNG。
  支持 16 种格式：平台封面（公众号、视频号、B站、抖音）、图文内容卡（小红书、教程、对比分析）、
  社交分享卡（金句、数据、方形）、长文编辑排版（Broadsheet、Feature、Reader、Digest）。
  当用户提到「信息卡、卡片、封面、图文笔记、排版、截图、生成图、内容卡」时使用本技能。
```

- [ ] **Step 2: Update inner README.md project name**

In `skills/claude-design-card/README.md`, replace all occurrences of `any2card` with `claude-design-card`:

```bash
sed -i '' 's/any2card/claude-design-card/g' skills/claude-design-card/README.md
```

- [ ] **Step 3: Commit**

```bash
git add skills/claude-design-card/
git commit -m "chore: sync inner skill files with new name and description

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

---

## Self-Review

### Spec Coverage Check

| Requirement from Brainstorming | Task |
|---|---|
| 项目名称 → claude-design-card | Task 1 |
| SKILL.md name → claude-design-card | Task 1 + Task 2 |
| 统一 Claude 设计语言，移除 12 主题 | Task 2 |
| 16 种格式 + 平台尺寸 | Task 2 + Task 3 |
| SVG 设计系统（5 种类型 + 约束） | Task 2（已在 SKILL.md 中）|
| 截图脚本 TypeScript + bun | Task 4 |
| 默认输出 /tmp/ | Task 4 |
| 自动高度支持（长文编辑排版） | Task 4 |
| references/design-spec.md 更新 | Task 3 |
| README.md 更新 | Task 5 |
| skills-lock.json 更名 | Task 1 |
| skills/ 目录重命名 | Task 1 |

### No Placeholder Check

- ✅ All SKILL.md content is complete (no "TBD" or "fill in later")
- ✅ All code in Task 4 is complete and runnable
- ✅ All bash commands include expected output
- ✅ No references to undefined functions or types

### Type Consistency

- `scripts/screenshot.ts` only uses Node.js builtins (`path`, `fs`) and `playwright` — no custom types that could drift.

---

**Plan complete. Saved to `docs/superpowers/plans/2026-04-25-claude-design-card-implementation.md`.**

Two execution options:

**1. Subagent-Driven (recommended)** — Fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session using executing-plans, with checkpoints.

Which approach?
