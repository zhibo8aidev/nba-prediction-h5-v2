# Handoff

- Project: `nba-prediction-h5-v2`
- Current stage: `tech_design_tasks`
- From owner: `architect`
- To owner: `leader`
- Owner agent/session: `Codex ACP session`
- Date: 2026-05-11

## Completed Artifacts

- `artifacts/technical-design.md`
- `artifacts/tasks.md`
- `runs/2026-05-11-architect-tech-design.md`
- `runs/20260511-tech-design-progress.md`

## Basis

本次 tech-design 产物严格基于以下已批准输入：
- `artifacts/proposal.md`
- `artifacts/specs/product-spec.md`
- `artifacts/specs/technical-notes.md`
- `artifacts/design.md`
- `artifacts/react_native_mockups/index.html`
- `artifacts/source-prd/prd.md`
- `artifacts/source-design/design-spec.md`
- `artifacts/source-design/hero-kv.md`
- `artifacts/source-design/assets/hero-kv.jpg`

## Scope Confirmation

- 仅面向 H5 / mobile-web 单页活动与配套接口。
- 未扩展到客户端原生能力、CMS 后台重建、多场赛事聚合列表页、抽奖系统重做、吧币系统重做、短信或站内信系统重做。
- 未推进审批，未进入实现阶段。
- 未新增需求文档和设计规范之外的新展示文案或标签。

## Key Technical Decisions

- 前端 H5 通过初始化接口获取比赛、盘口、AB 分组、内容、提交状态和规则数据。
- AB 分组由服务端完成，登录用户按 `uid + match_id` 稳定分组；未登录可预览，登录回流后以 UID 重新获取正式分组。
- 单用户每次活动提交一次，前端 loading 锁和后端“当前活动实例唯一键 + uid”唯一约束共同防重，当前一期活动可按 `match_id + uid` 落地。
- 已提交态以后端记录为准，初始化时恢复历史选择并锁定 UI。
- 提交链路保持 PRD 顺序：先意愿弹窗，再提交成功弹窗。
- 赛果、命中、派奖和通知字段只做沉淀，实际吧币发放、短信和站内信通知由外部系统承接。

## External Dependencies To Confirm

- 比赛/盘口数据源：需明确 `match_id`、主客队、球队 icon、截止时间、竞彩篮球-大小分盘口值来源。
- 登录回流：需明确登录跳转、回流参数、UID 获取方式。
- 吧币发放：需明确外部吧币系统的发放输入、回写字段和失败处理。
- 短信/站内信通知：需明确通知触发输入和 `notify_status` 回写口径。
- 赛果来源：需明确最终总分回写来源和结算触发方式。

## Operational Rule Preserved

- 暂定测试 10 场比赛。
- 每场比赛发放 1000 吧币。
- 每场从参与预测用户中随机抽取 20% 用户。
- 被抽中的用户均分该场 1000 吧币。

## Ready For

- leader 检查 tech-design 产物完整性。
- 后续进入 tech review 或实现排期前的外部依赖确认。
