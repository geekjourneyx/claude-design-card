# claude-design-card

> Claude 设计语言驱动的卡片生成技能 — 14 种格式，一套审美标准。

将任意文本、网页或 URL 转化为精致的可发布卡片，涵盖平台封面、社交分享卡、长文编辑排版。所有卡片严格遵循 [Claude/Anthropic 设计系统](DESIGN.md)：Parchment 暖色基调、Georgia 衬线字体、Terracotta 强调色。

---

## 快速开始

### 安装依赖

```bash
bun install
bunx playwright install chromium
```

### 截图生成

```bash
# 固定尺寸（平台封面、内容卡）
bun scripts/screenshot.ts <input.html> [output.png] [width] [height]

# 自动高度（长文编辑排版）
bun scripts/screenshot.ts <input.html> [output.png] [width] --full-page
```

**示例：**
```bash
# 公众号首图 900×383
bun scripts/screenshot.ts /tmp/card.html /tmp/cover.png 900 383

# 小红书图文笔记 1080×1440
bun scripts/screenshot.ts /tmp/card.html /tmp/xiaohongshu.png 1080 1440

# The Broadsheet 长文排版（自动高度）
bun scripts/screenshot.ts /tmp/broadsheet.html /tmp/broadsheet.png 800 --full-page

# 默认输出路径（/tmp/claude-card-<basename>.png）
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
| 步骤教程卡 | 1080 × 1440 px | 编号步骤 + 进度条 SVG |
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

所有卡片使用统一的 Claude 设计 Token：

| Token | 色值 | 用途 |
|---|---|---|
| `--pg` Parchment | `#f5f4ed` | 主背景 |
| `--iv` Ivory | `#faf9f5` | 卡面/次背景 |
| `--nk` Near-Black | `#141413` | 正文、标题 |
| `--tc` Terracotta | `#c96442` | 强调、装饰 |
| `--ds` Dark-Surface | `#30302e` | 深色区块 |
| `--og` Olive-Gray | `#5e5d59` | 副文本 |
| `--sg` Stone-Gray | `#87867f` | 元信息 |

**字体**：Georgia（衬线，标题/正文）+ system-ui（UI/标签）  
**禁止**：冷色调蓝灰、纯白 `#ffffff`、`font-weight: 700`

详见 [DESIGN.md](DESIGN.md) 和 [references/design-spec.md](references/design-spec.md)。

---

## SVG 设计系统

卡片可包含最多 3 种 SVG 类型：

| 类型 | 功能 |
|---|---|
| A 排版装饰器 | 含节点的分割线 |
| B 大号引言符 | Georgia 大引号，opacity 0.07-0.12 |
| C 编辑插图 | 纯几何，传达文章隐喻 |
| D 数据可视化 | 折线/进度条 + stroke-dasharray 动画 |
| E 图案底纹 | `<pattern>` 网点，opacity 0.05-0.08 |

---

## 项目结构

```
claude-design-card/
├── SKILL.md                    # 主技能定义（AI Agent 读取）
├── DESIGN.md                   # Claude 设计系统规范（权威，禁止修改）
├── scripts/
│   └── screenshot.ts           # Playwright 截图脚本（Bun 运行）
├── references/
│   └── design-spec.md          # 设计规范详细参考
└── skills/claude-design-card/
    ├── SKILL.md                # 内层技能文件
    └── assets/
        ├── TsangerJinKai02-W04.ttf
        └── NotoSerifSC-Regular.ttf
```

---

## 作为 AI Skill 使用

在 Claude Code 中安装后，通过自然语言描述触发：

```
帮我把这篇文章做成小红书图文笔记卡片
把这个数据做成方形分享卡
帮我生成一张公众号首图封面
把这篇长文做成 The Broadsheet 编辑排版
```

技能会自动：
1. 分析内容，选择合适格式
2. 提炼关键信息（不编造）
3. 生成符合 Claude 设计语言的 HTML
4. 调用截图脚本输出 PNG 到 `/tmp/`

---

## License

MIT
