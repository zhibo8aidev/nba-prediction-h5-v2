# Handoff

- Project: `nba-prediction-h5-v2`
- Current stage: `tech_design_tasks`
- From owner: `leader`
- To owner: `architect`
- Owner agent/session: `codex ACP session`
- Approved inputs:
  - `artifacts/proposal.md`
  - `artifacts/specs/product-spec.md`
  - `artifacts/specs/technical-notes.md`
  - `artifacts/design.md`
  - `artifacts/react_native_mockups/index.html`
  - `artifacts/source-prd/prd.md`
  - `artifacts/source-design/design-spec.md`
  - `artifacts/source-design/hero-kv.md`
  - `artifacts/source-design/assets/hero-kv.jpg`
- New artifacts:
  - `artifacts/technical-design.md`
  - `artifacts/tasks.md`
  - `handoffs/2026-05-11-architect-to-leader-tech-design.md`
  - `runs/2026-05-11-architect-tech-design.md`
  - `runs/20260511-tech-design-progress.md`

## Artifact origin assertion
- technical-design.md 与 tasks.md 必须严格基于已批准 PRD、设计规范、design.md 与 HTML mockup 拆解，面向 H5 / mobile-web 实现，禁止擅自扩 scope。

## Must keep aligned
- 严格按照需求文档和设计规范执行，不得再引入文档中没有的新文案、新标签或新展示元素。
- 必须保留 10 场测试、每场 1000 吧币、随机抽取 20% 用户均分的运营规则口径。
- 必须覆盖 AB 实验分组、提交防重、意愿弹窗、已提交态、数据记录、派奖与通知依赖边界。

## Blocked Items
- 比赛/盘口数据源、登录回流、吧币发放、短信与站内信通知仍待外部系统确认，技术方案中必须显式标注依赖边界。

## Exit Criteria
- 输出 `artifacts/technical-design.md`
- 输出 `artifacts/tasks.md`
- 任务按前端 / 后端 / 数据与接口 / 埋点 / 联调与验收分组清晰
- 标明依赖关系、风险项、待外部系统确认项
- 准备进入 `tech_review`

## Summary
设计已批准，现进入技术方案与任务拆解阶段，请基于已批准产物生成可直接进入实现阶段的技术基线。
