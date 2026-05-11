# Handoff

- Project: `nba-prediction-h5-v2`
- Current stage: `design`
- From owner: `leader`
- To owner: `designer`
- Owner agent/session: `gemini ACP session`
- Approved inputs:
  - `artifacts/proposal.md`
  - `artifacts/specs/product-spec.md`
  - `artifacts/specs/technical-notes.md`
  - `artifacts/source-prd/prd.md`
  - `artifacts/source-design/design-spec.md`
  - `artifacts/source-design/hero-kv.md`
  - `artifacts/source-design/assets/hero-kv.jpg`
  - Approved copy decision: `副标题统一为“玩竞猜，送吧币”`

## New artifacts
- `artifacts/design.md`
- `artifacts/react_native_mockups/index.html`
- `artifacts/react_native_mockups/styles.css`
- `artifacts/react_native_mockups/script.js`（如需要）
- `handoffs/2026-05-11-designer-to-leader-design.md`
- `runs/20260511-design-execution-progress.md`
- `runs/2026-05-11-designer-design-execution.md`

## Artifact origin assertion
- 设计产物必须严格基于已批准 PRD/specs 与用户提供头图生成，面向 H5 / mobile-web 输出，不得擅自扩 scope。

## Design focus
- 顶部 KV 必须承接 `hero-kv.jpg` 的主视觉语言与文案口径，页面主宽度按 `390px` 设计。
- 全局保持高亮、通透、浅蓝底色连续性，第一张卡片需覆盖头图下半部。
- 必须严格落实用户给出的返回按钮、对阵卡片、选项、分析模块、活动规则与弹窗尺寸规范。
- 重点校验专家分析、AI 观点、活动规则区的长文案承载能力。
- 设计输出应覆盖落地页默认态、选中态、意愿弹窗、提交成功弹窗、已提交态与关键异常态。

## Blocked items
- 比赛与盘口真实数据源、登录桥接、吧币发放与通知链路仍待后续技术确认，但不阻塞本轮设计输出。

## Exit criteria
- 输出 `artifacts/design.md`
- 输出 HTML 高保真 mockups，`artifacts/react_native_mockups/index.html` 为评审入口
- 明确头图承接、卡片层叠、390px 宽度、长文案排版与弹窗质感
- 准备进入 `design_review`

## Summary
PRD/specs 已批准，现进入设计阶段，请基于当前头图与设计规范正式产出 NBA 预测 H5 高保真设计稿。
