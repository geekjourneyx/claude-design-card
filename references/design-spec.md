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

### 本地字体（优先使用，保证截图不失效）

```css
@font-face {
  font-family: 'TsangerJinKai';
  src: url('file:///[PROJECT_ROOT]/assets/TsangerJinKai02-W04.ttf') format('truetype');
  font-weight: 400;
}
@font-face {
  font-family: 'NotoSerifSC';
  src: url('file:///[PROJECT_ROOT]/assets/NotoSerifSC-Regular.ttf') format('truetype');
  font-weight: 400;
}
```

> ⚠️ `[PROJECT_ROOT]` 替换为实际绝对路径，Agent 生成时应填入真实路径如 `/Users/xxx/Workspace/web/claude-design-card`

### 字体分工

| 场景 | 字体 | 说明 |
|---|---|---|
| 编辑排版标题/正文 | `Georgia, 'Times New Roman', serif` | 20 世纪编辑字体感 |
| UI / kicker / 标签 | `-apple-system, system-ui, sans-serif` | 清晰、现代 |
| 中文标题（可选） | `TsangerJinKai, Georgia, serif` | 强调中文排版美感 |
| 中文正文（可选） | `NotoSerifSC, Georgia, serif` | 中文衬线，长文舒适 |

### 字号基准

| 用途 | 字号 | 行高 |
|---|---|---|
| 大标题（hero，1080px 卡） | 48–56px | 1.05–1.15 |
| 大标题（hero，900px 卡） | 40–48px | 1.10–1.20 |
| 大标题（长文排版，≤800px） | 32–36px | 1.15–1.25 |
| 章节标题 | 22–28px | 1.25 |
| 正文（1080px 卡） | 16–18px | 1.58–1.68 |
| 正文（长文排版） | 17px | 1.60–1.65 |
| 副文本 / 说明 | 11–13px | 1.45–1.55 |
| Kicker / 标签 | 9–10px | 1.0，letter-spacing: 1px |

**规则**：标题 `font-weight: 500`，绝不使用 700。

（Claude 品牌规范：保持衬线字体的统一优雅语调，bold 过重会破坏整体气质）

---

## 3. 间距系统

```css
/* 卡片内边距 */
.card-sm  { padding: 20px 24px; }   /* 小卡片、紧凑 */
.card-md  { padding: 32px 40px; }   /* 标准 */
.card-lg  { padding: 44px 56px; }   /* 编辑排版、大卡片 */

/* 元素间距遵循 8px 网格 */
/* 合法值：8, 16, 24, 32, 48, 64px */
```

---

## 4. 格式目录与截图参数

### 格式族 A — 平台封面

| 格式 | 画布尺寸 | 截图命令参数 | 主色方案 |
|---|---|---|---|
| 公众号首图 | 900 × 383 px | `900 383` | 深色（`--nk` 背景）或暖色（`--pg` 背景） |
| 视频号竖封面 | 1080 × 1440 px | `1080 1440` | 深色大标题居中 |
| B站/YouTube 横封面 | 1280 × 720 px | `1280 720` | 电影海报感，terracotta 强调 |
| 抖音全屏竖版 | 1080 × 1920 px | `1080 1920` | 全屏沉浸，极简居中 |

截图示例：
```bash
bun scripts/screenshot.ts /tmp/claude-card-cover.html /tmp/cover.png 1280 720
```

### 格式族 B — 图文内容卡

| 格式 | 画布尺寸 | 截图命令参数 | 特征 |
|---|---|---|---|
| 小红书图文笔记 | 1080 × 1440 px | `1080 1440` | 分层标签 + 图文混排 |
| 步骤教程卡 | 1080 × 1440 px | `1080 1440` | 编号步骤 + 进度条（类型 D SVG） |
| 对比分析卡 | 1080 × 1440 px | `1080 1440` | 双列对比，胜出方 terracotta 高亮 |

### 格式族 C — 社交分享卡

| 格式 | 画布尺寸 | 截图命令参数 | 特征 |
|---|---|---|---|
| 金句分享卡 | 1080 × 1080 px | `1080 1080` | 大号引言符（类型 B SVG），极简单栏 |
| 数据大字卡 | 1080 × 1080 px | `1080 1080` | 超大数字主导，类型 D 进度条辅助 |
| 方形通用卡 | 1080 × 1080 px | `1080 1080` | 标准单栏，灵活适配各类内容 |

### 格式族 D — 长文编辑排版

| 格式 | 卡片宽度 | 截图模式 | 气质 |
|---|---|---|---|
| The Broadsheet | 800 px | `800 --full-page` | 三栏报纸，版刻装饰 |
| The Feature | 760 px | `760 --full-page` | 杂志深度，暗头双栏 |
| The Reader | 720 px | `720 --full-page` | 文学期刊，边注 Marginalia |
| The Digest | 760 px | `760 --full-page` | 分析报告，摘要框 + 数据列 |

截图示例：
```bash
bun scripts/screenshot.ts /tmp/claude-card-broadsheet.html /tmp/broadsheet.png 800 --full-page
```

---

## 5. 编辑排版结构详解

### The Broadsheet（三栏报纸）

```
┌─────────────────────────────────────────┐
│  Masthead ── 刊名 ── 日期 ── 栏目信息   │  ← 粗下划线 2px --nk
├─────────────────────────────────────────┤
│  Lead Headline（大字，32-36px）         │
│  Standfirst（引言，斜体，--og 色）      │
├──────────┬──────────┬───────────────────┤
│ Drop Cap │          │                   │  ← column-count: 3
│ 正文第   │ Pull Q   │  第三栏正文       │     column-rule: 1px solid --bw
│ 一栏     │ 破栏引言 │                   │
│          │(span all)│                   │
├──────────┴──────────┴───────────────────┤
│  SVG 装饰分割线（类型 A）               │
│  正文继续（多栏）                       │
└─────────────────────────────────────────┘
```

**Drop Cap**：`font-size: 3.8em; float: left; color: var(--tc); line-height: 0.85`
**Pull Quote**：`column-span: all; border-top: 2px solid var(--nk); padding: 16px 0; font-style: italic`
**SVG 分割线**：类型 A，宽 420-480px，居中放置，三菱构型

### The Feature（杂志深度）

```
┌──────────────────────────────────────────┐
│  深色头部（--nk 背景，--iv 文字）        │
│  Kicker ─────────────────────────────    │  ← 9px uppercase
│  大标题（48-52px，--iv 色）              │
│  Standfirst（--ws 色，斜体）             │
├──────────────────────────────────────────┤
│  Meta bar（--ds 背景，--sg 小字）        │
├──────────────┬───────────────────────────┤
│  SVG 编辑插图│  侧边栏                   │  ← 类型 C SVG
│  （类型 C）  │  类型 E 网点底纹          │  ← 1fr 200px 网格
├──────────────┤  相关数据                 │
│  主栏正文    │  延伸阅读                 │
│  Drop Cap    │                           │
│  Pull Quote  │                           │  ← 类型 B 引言符
│  正文继续    │                           │
└──────────────┴───────────────────────────┘
```

### The Reader（文学期刊）

```
┌───────────────────────────────────────┐
│  Running Head（小大写，左右对齐）     │  ← 9px uppercase, --sg 色
│  Section Tag（kicker）                │
│  标题（36-40px）                      │
│  Byline + 日期                        │
│  Standfirst（斜体）                   │
├──────────────────────┬────────────────┤
│  正文 + Drop Cap     │  Marginalia    │  ← 1fr 160px 网格
│  Pull Quote 居中      │  边注 1       │
│  SVG 三圆节点分割线   │  边注 2       │  ← 类型 A 变体
│  正文继续             │  边注 3       │
└──────────────────────┴────────────────┘
```

**Marginalia**：`font-size: 11px; color: var(--sg); border-left: 2px solid var(--bw); padding-left: 12px`

### The Digest（分析报告）

```
┌───────────────────────────────────────┐
│  深色头部（--nk 背景）                │
│  Vol/期号 + 报告标题（--iv 色）       │
│  副标题（--ws 色）                    │
├───────────────────────────────────────┤
│  摘要框（--pg 背景，--tc 3px 左边框） │
├────────────────┬──────────────────────┤
│  ① 章节标题   │  数据列               │  ← SVG 圆徽章（类型 A 变体）
│  正文 Georgia  │  进度条动画           │  ← 类型 D
│                │  大数字 + 单位        │
│                │  说明文字             │
├────────────────┴──────────────────────┤
│  关键发现框（--pg 背景，--tc 边框）   │
│  SVG 箭头列表项（类型 A 变体）        │
└───────────────────────────────────────┘
```

---

## 6. SVG Token 快查

| 类型 | 功能 | 颜色约束 | 尺寸约束 |
|---|---|---|---|
| A 排版装饰器 | 分割线，含中心节点 | 中心 `#c96442`，线 `#b0aea5` ≤0.8px | 宽 ≤240px，高 ≤20px |
| B 大号引言符 | `<text>` Georgia 大引号 | terracotta 或 near-black | 70-100px，opacity 0.07-0.12 |
| C 编辑插图 | 几何构成，传达文章隐喻 | Claude token，最深 0.6 最浅 0.06 | 宽 280-480px |
| D 数据可视化 | 折线/进度/柱状 + 动画 | 正向 terracotta，负向 stone-gray | stroke-dasharray 动画 0.5-1.5s |
| E 图案底纹 | `<pattern>` 网点或交叉线 | `#c96442` opacity 0.05-0.08 | 单元格 6-10px |

**使用原则**：仅在 CSS 无法实现时引入 SVG（如含中心节点的规则线、大号引言符、叙事性插图）；能用 border-top 实现的分隔线不要使用 SVG 类型 A。

每张卡片最多使用 3 种不同 SVG 类型（如 A+B+D 组合允许，A+B+C+D 四种同时出现则禁止）；同一类型可重复使用 2-3 次。

---

## 7. 不可变规则

1. 内容必须忠实原文，不得编造。
2. 任何视觉装饰都不能损害可读性。
3. 卡片必须完全自包含（无外部 CDN 依赖，可离线截图）。
4. 字体路径必须使用绝对 file:// URL（如 file:///绝对路径/assets/），确保离线截图时字体可用。
5. 截图前 SVG 动画必须完成（`waitForTimeout(3000)`）。
6. 所有颜色必须在 Claude token 范围内。
7. 标题 `font-weight: 500`，绝不使用 700。
8. 每种格式必须有独立的排版结构，不能只是换色皮肤。
9. 当提取内容少于 3 个核心点时，优先选择格式 C（方形通用卡）或格式 D（Reader/Digest），不强行拆分以凑数量。
