# Social Cover & Content Card Redesign Spec

## Problem

User feedback: format family A (platform covers) and format family B (visual content cards) currently feel low-level: weak hierarchy, poor layout, small type, insufficient beauty, and inadequate platform-specific cover logic.

The current `DESIGN.md` and `SKILL.md` define dimensions, palette, typography, and broad format names, but A/B families lack the design grammar that makes a social cover worth clicking or a content card worth saving. The result is too close to an AI-generated summary slide: generic card grids, safe rounded modules, low emotional pull, and too much content packed into the cover.

## Current Assessment

Based on the existing spec structure, not on a single sample image:

| Dimension | Family A: Platform Covers | Family B: Content Cards | Gap |
|---|---:|---:|---|
| Platform fit | 4/10 | 4/10 | Dimensions exist, but safe zones, crop behavior, thumbnail distance, and first-screen reading behavior are underdefined. |
| Click / stop power | 3/10 | 4/10 | Title rules say "conclusion/conflict/contrast", but layouts do not visually amplify that hook. |
| Visual hierarchy | 3/10 | 3/10 | No fixed 1st/2nd/3rd-eye hierarchy; body content often competes with the headline. |
| Type scale | 4/10 | 4/10 | Existing 48-56px hero guidance is too small for many 1080px social covers and too broad for platform-specific use. |
| Spacing and rhythm | 4/10 | 3/10 | 8px grid exists, but cover-scale whitespace, focus zones, and breathing areas are missing. |
| Brand aesthetic | 6/10 | 6/10 | Claude warmth and serif tone are valuable, but not yet translated into social-native formats. |
| Information compression | 3/10 | 4/10 | Covers still tend to replace the content instead of promising the content. |

Overall: family A is about 3.8/10; family B is about 4.0/10.

## External Research Synthesis

Social platforms differ in dimensions, but the useful design principles converge:

1. Platform specs are only the upload baseline. YouTube, Instagram/Reels, Stories, TikTok-like formats, and feed images all have recommended dimensions, but dimensions alone do not make a clickable cover.
2. Mobile-first vertical formats often outperform square images because they occupy more screen real estate; however, they also impose stronger safe-zone constraints.
3. Visual hierarchy depends on contrast, scale, and grouping. If every element is similarly sized, similarly colored, or similarly enclosed, nothing becomes the first read.
4. Cognitive load must stay low. A cover should answer: "What is this?", "Why should I care?", and "What will I get if I click?" It should not summarize the whole article.
5. Story/Reels/TikTok-style vertical covers require top and bottom safe zones because profile, controls, captions, CTAs, and app chrome can obscure content.

## First Principles

### Covers are attention contracts

A platform cover is not a miniature article. It is a pre-click contract:

- The reader pays one click or one pause.
- The cover promises a specific intellectual, practical, or emotional payoff.
- The content must later fulfill that promise.

Good cover formula:

```text
One strong judgment
+ one supporting promise
+ one credibility cue
+ enough whitespace to feel intentional
```

### Content cards are saveable knowledge objects

Family B cards should not look like summary PPT slides. They should feel like objects worth saving:

- A first card stops the scroll.
- Inner cards explain or teach.
- Final cards help the reader retain, reuse, or share.

Good content-card formula:

```text
Cover card: one memorable promise
Inner card: one structured idea
Utility card: one reusable takeaway
```

## Design Direction

Adopt a **Claude Editorial Cover System**:

- Keep Claude's warm editorial palette, serif display typography, and restrained high-end tone.
- Add platform-native social cover logic: stronger title hierarchy, safe zones, thumbnail readability, and sharper content compression.
- Avoid generic AI card aesthetics: identical rounded card grids, equal-weight modules, decorative labels without purpose, and summary-slide composition.

## Family A: Platform Cover System

### Universal rules

1. A platform cover must contain no more than three information layers:
   - Primary judgment headline
   - One supporting promise line
   - One evidence cue: number, source, object, scene, or contrast marker
2. Do not place 4-6 article bullet points on covers.
3. Main title must be readable when the image is scaled down in a feed or thumbnail grid.
4. Accent color (`--tc` / Claude coral) should mark the key contrast word, not decorate every element.
5. The title should be strong but not noisy. Oversized type that consumes the whole canvas undermines Claude's premium editorial tone.

### A1. WeChat cover

| Attribute | Rule |
|---|---|
| Canvas | 900 x 383 |
| Role | Horizontal seconds-read banner |
| Title visual share | 28-36% |
| Suggested title size | 44-64px |
| Layout | Left-side headline, right-side evidence or editorial ornament |
| Content limit | Headline + evidence cue; subtitle optional |

Guidance:

- Height is limited; do not treat it like a normal article card.
- Title should usually fit in two lines.
- Right side should stay sparse: one source, number, scene, or quiet geometric ornament.
- Avoid small subtitles unless the headline alone is too ambiguous.

### A2. Bilibili / YouTube thumbnail

| Attribute | Rule |
|---|---|
| Canvas | 1280 x 720 |
| Role | Thumbnail signboard |
| Title visual share | 32-42% |
| Suggested title size | 64-92px |
| Layout | Large left/center headline, one visual hook, one compact proof |
| Content limit | Headline + one-line promise + number/symbol |

Guidance:

- Must pass the squint test at list-page size.
- Use 2-6 first-read keywords.
- Avoid dense body text and multi-card grids.
- Good covers feel like refined signboards, not presentation slides.

### A3. WeChat Channels vertical cover

| Attribute | Rule |
|---|---|
| Canvas | 1080 x 1440 |
| Role | Vertical poster |
| Title visual share | 30-40% |
| Suggested title size | 76-108px |
| Layout | Top light brand/kicker, central headline, bottom evidence/source |
| Content limit | Headline + one promise + source/evidence |

Guidance:

- Use the vertical space for rhythm, not more text.
- Title anchors the center; top and bottom provide pacing.
- Dark surfaces are allowed, but must stay warm and editorial.

### A4. Douyin / Stories full-screen cover

| Attribute | Rule |
|---|---|
| Canvas | 1080 x 1920 |
| Role | Full-screen pause design |
| Title visual share | 28-34% |
| Suggested title size | 76-104px |
| Layout | Safe-zone-centered headline; top, bottom, and right-side UI-aware |
| Content limit | One judgment + one supporting promise |

First-principles model:

Douyin / Stories covers are not vertical posters. They are full-screen pause designs in a UI-constrained environment. The viewer is not reading; they are deciding whether to stop scrolling.

Safe-zone guidance:

- Top 14%: weak information zone. Use only brand, series, or light kicker.
- Middle 44-52%: primary reading zone. Place headline and promise here.
- Bottom 20%: weak information zone because captions, CTAs, or app controls may cover content.
- Right side: avoid primary content because interaction buttons commonly occupy this region.

## Family B: Content Card System

### Universal rules

Family B should be redesigned as a system of saveable knowledge objects.

1. First card acts like a cover: one promise, strong hierarchy, no full summary.
2. Inner cards act like an editorial manual: structured, spacious, and useful.
3. Utility cards act like reusable checklists or frameworks.
4. Avoid same-looking card grids across all formats.
5. Give each card one dominant idea; a card is not a page of notes.

### B aesthetic modes

#### B1. Editorial Artifact (default)

Use for most high-quality content cards.

Visual language:

- Warm parchment/canvas surface.
- Editorial grid, numbering, hairline rules, marginal notes.
- Serif display headline with controlled negative tracking.
- Spacious composition with designed asymmetry.
- Texture via subtle grid, rule lines, or typographic ornaments.

Best for:

- Concept explanation
- Opinion compression
- Deep insight cards
- First card in a carousel when premium credibility matters

#### B2. Dark Magazine Cover

Use for strong-spread first cards when the content has conflict, contrast, or a sharp opinion.

Visual language:

- Dark Claude surface.
- Large but controlled serif headline.
- Coral on a single contrast word.
- One quiet geometric editorial mark.
- Minimal body copy.

Best for:

- Controversial thesis
- Contrarian insight
- "Old way vs new way" narratives
- High-click carousel first image

Constraint:

Do not use this mode for every card. It becomes monotonous and too dramatic if overused.

#### B3. Practical Toolkit

Use for tutorials, checklists, and reusable methods.

Visual language:

- Warm light surface.
- Large action headline.
- 2-4 clear action blocks.
- Numbered steps with strong spacing.
- Less ornament, more functional clarity.

Best for:

- Step-by-step tutorials
- Checklists
- Frameworks
- "Save this" utility cards

### B format rules

#### Xiaohongshu visual note

| Attribute | Rule |
|---|---|
| Canvas | 1080 x 1440 |
| Role | Stop-scroll first card and saveable carousel |
| Main title | 64-96px |
| Promise line | 26-34px |
| Body blocks | 24-30px |
| Metadata | 16-20px |

Rules:

- First image: one title, one promise, two or three meaningful labels.
- Do not put the full article summary on the first image.
- Inner images may carry frameworks, steps, or comparisons.
- Each carousel card should have a distinct role: cover, context, framework, example, checklist, close.

#### Tutorial steps card

Rules:

- Steps must be action-first.
- Each step should fit 8-14 Chinese characters when possible.
- The step number is a navigation device, not decoration.
- Use 3-5 steps; more than five should become a carousel, not a single dense card.
- Body text should be large enough to read on a phone without zooming.

#### Comparison analysis card

Rules:

- Comparison must serve one conclusion.
- Two columns should not be visually equal if one side is the recommended direction.
- The winning or preferred side gets stronger color, scale, or spatial priority.
- Avoid dumping two lists side by side. Use contrast labels, short claims, and one evidence cue.

## Typography and Proportion Updates

For 1080 x 1440 Family B cards:

| Layer | Suggested size | Purpose |
|---|---:|---|
| Primary headline | 64-96px | Judgment, conflict, or benefit |
| Supporting promise | 26-34px | Why to continue |
| Body block | 24-30px | Steps, comparison, framework |
| Metadata / labels | 16-20px | Source, category, page marker |

For Family A:

| Platform | Suggested headline size | Visual share |
|---|---:|---:|
| WeChat cover | 44-64px | 28-36% |
| Bilibili / YouTube | 64-92px | 32-42% |
| WeChat Channels | 76-108px | 30-40% |
| Douyin / Stories | 76-104px | 28-34% |

These are starting ranges, not rigid constants. If a title has only 2-4 Chinese characters, it may be larger. If a title has 14+ characters, it must be compressed or split rather than simply shrinking until unreadable.

## Content Compression Rules

### Title

- Must express a judgment, tension, or benefit.
- Avoid pure topic labels.
- Prefer contrast: old/new, before/after, hidden/obvious, mistake/fix.
- Use numbers only when they are meaningful.

### Supporting promise

- One sentence.
- Answers: "What will I understand or gain after clicking?"
- Does not explain the full argument.

### Evidence cue

Use exactly one of:

- Number: "5 changes", "3 rules"
- Source: "from the original report"
- Object: "for creators", "for founders"
- Scene: "before publishing", "in the feed"
- Contrast marker: "old way / new way"

## Anti-Patterns to Avoid

1. Summary slide: headline + 4 bullet points + footer.
2. Equal card grid: three or four same-size rounded boxes with similar weight.
3. Decorative labels without information value.
4. Tiny text on 1080px canvases.
5. Over-large shouting title that erases whitespace and premium tone.
6. Pure template reuse across all platforms.
7. Platform covers that try to teach the whole article.
8. B-family cards that all use the same "title + module blocks" layout.

## Quality Gate

Before generating an A/B card, check:

1. Can the main message be understood in one second?
2. Is there a clear first, second, and third read?
3. Does the cover promise the content instead of replacing it?
4. Is the platform crop and safe zone respected?
5. Is the typography large enough for mobile?
6. Is the design recognizably Claude: warm, editorial, restrained, premium?
7. Does the design avoid generic AI card patterns?
8. Would a reader click, pause, or save for a reason that is visible in the image?

## Scope

This spec defines the design direction and generation rules for A/B family redesign. It does not implement code changes. Implementation should update the relevant generation guidance in `SKILL.md`, `references/design-spec.md`, and `DESIGN.md` only after this spec is reviewed and approved.
