# NBA预测 H5 技术方案

- Project: `nba-prediction-h5-v2`
- Stage: `tech_design_tasks`
- Scope: H5 / mobile-web 单页活动与配套接口，不扩展到客户端原生能力、CMS 后台重建、抽奖/吧币/通知系统重做
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

## 1. 技术目标

本期实现一个嵌入直播吧场景的 NBA 单场预测 H5 活动页，支持未登录预览、登录拦截、AB 分组内容展示、大小分预测提交、意愿弹窗、提交成功弹窗、已提交态恢复、预测记录沉淀与结算/派奖结果字段沉淀。

实现边界保持在 H5 / mobile-web：
- 前端负责页面渲染、状态管理、登录拦截触发、弹窗链路、提交防重、已提交态展示和埋点上报。
- 后端负责初始化数据聚合、AB 分组分配与稳定化、预测提交写入、防重复提交、记录查询、赛果与派奖字段沉淀。
- 外部系统负责比赛/盘口数据供给、宿主登录与回流、吧币实际发放、短信和站内信实际发送。

## 2. 总体架构

### 2.1 前端 H5

- 形态：单页 mobile-web H5。
- 入口：文字直播或运营链接进入活动页，链接携带 `match_id`。
- 主宽度：按 `390px` 视觉基线适配移动端，最大移动容器可按设计规范控制。
- 静态资源：顶部头图使用 `artifacts/source-design/assets/hero-kv.jpg`，页面底色与头图底部浅蓝色 `#e0f2fe` 融合。
- 运行时数据：页面初始化接口一次性返回比赛、盘口、AB 分组、内容配置、用户提交状态、活动规则所需数据。

### 2.2 后端活动服务

后端活动服务提供 H5 所需的最小接口能力：
- 聚合比赛与盘口信息。
- 获取或生成用户在当前比赛下的 AB 分组。
- 返回当前分组对应的专家 / AI / 球迷内容。
- 查询用户是否已提交。
- 写入预测提交记录并做幂等防重。
- 回写赛果、命中、派奖、通知状态字段。

### 2.3 外部依赖边界

| 依赖 | 本期使用方式 | 边界说明 |
| --- | --- | --- |
| 比赛/盘口数据源 | 提供 `match_id`、主客队、球队 icon、截止时间、竞彩篮球-大小分盘口值 | 数据源未在已批准文档中最终确定；本期只消费数据，不建设赛事或盘口源系统 |
| 登录系统 | 未登录用户点击参与活动时跳转登录，登录完成后回流原 H5 链接 | 登录页、UID 获取、登录态刷新由宿主或统一登录能力提供 |
| 吧币发放系统 | 根据结算后的 `reward_eligible`、`reward_amount` 执行实际发放 | 本期仅沉淀派奖结果字段，不重做吧币发放系统 |
| 短信通知系统 | 中奖后短信通知 | 本期仅记录 `notify_status`，实际发送由外部通知系统承接 |
| 站内信通知系统 | 中奖后站内信通知 | 本期仅记录 `notify_status`，实际发送由外部通知系统承接 |
| 内容配置来源 | 提供 AB 分组表中的专家 / AI / 球迷展示字段与分析正文 | 本期可由后端配置或静态配置承接，不建设 CMS 后台 |

## 3. 前端技术方案

### 3.1 页面模块

前端只实现已批准页面模块：
- 顶部头图区：页面标题、活动标语、头图、悬浮返回按钮。
- 对阵与盘口区：截止时间、主客队 icon 与队名、`VS`、大小分盘口与两个互斥选项。
- 分析内容区：按 AB 分组展示专家预测、AI 观点或球迷观点；`control` 组不展示分析模块。
- 提交交互区：未选中置灰，选中后可提交；提交链路先意愿弹窗，再提交成功弹窗；用户每次活动仅允许成功提交一次。
- 活动规则区：保留 PRD 原始规则语义，不新增展示文案或标签。

### 3.2 页面状态

| 状态 | 触发条件 | 前端行为 |
| --- | --- | --- |
| 初始化加载 | 进入页面 | 调用初始化接口，渲染骨架或加载态 |
| 未登录预览 | 初始化接口返回未登录 | 允许浏览比赛、盘口和当前预览分组内容；点击提交链路前触发登录 |
| 无比赛数据 | `match_id` 无效或比赛数据缺失 | 展示不可用兜底提示，不允许提交 |
| 盘口缺失 | `line_value` 缺失 | 禁止选项进入可提交态 |
| 未选择 | 有比赛和盘口但未选大小 | 提交按钮置灰不可点击 |
| 已选择 | 用户选择“大”或“小” | 选中项高亮，提交按钮点亮 |
| 意愿弹窗 | 登录用户点击提交 | 弹出意愿询问弹窗，名称取当前分组展示的专家昵称或 AI 名称 |
| 提交中 | 用户点击“愿意”或“不愿意” | 按钮 loading，禁止重复点击，调用提交接口 |
| 提交成功 | 提交接口成功 | 弹出提交成功弹窗，页面进入已提交锁定态 |
| 已提交 | 初始化发现已提交或提交成功 | 恢复用户已选项，选项锁定，按钮显示 `已提交` |
| 异常 | 网络失败、登录失败、接口失败 | 展示重试引导，不写入重复脏数据 |

### 3.3 登录拦截与回流

- 未登录用户可以进入 H5 预览。
- 未登录用户选择选项后点击提交时，前端调用宿主登录能力或跳转统一登录页。
- 登录跳转需携带当前页面完整回流地址，包括 `match_id` 和来源参数。
- 登录回流后重新调用初始化接口，以 UID 为准恢复稳定 AB 分组和已提交状态。
- 若未登录预览阶段存在本地选择，登录回流后仅可作为 UI 临时选择恢复；最终提交必须使用后端初始化返回的比赛、盘口、分组和登录 UID。

### 3.4 提交防重

前端防重：
- 提交接口 pending 时禁用意愿弹窗按钮。
- 同一次页面会话只允许一个提交请求处于 pending。
- 接口返回已提交时，直接进入已提交锁定态。

后端防重：
- 以“当前活动实例唯一键 + uid”建唯一约束，当前一期活动可按 `match_id + uid` 落库实现。
- 提交接口使用幂等写入；重复请求返回当前已提交记录，不重复插入。
- 以后端记录为最终状态源，前端不得仅依赖本地状态判定成功。

### 3.5 已提交态

初始化接口返回 `user_submit_status` 和 `user_previous_selection` 时：
- 选项恢复为用户已提交的“大”或“小”。
- 两个选项均不可修改。
- 提交按钮显示 `已提交`。
- 不再触发意愿弹窗和提交接口。

### 3.6 设计落地约束

- 严格按 `artifacts/source-design/design-spec.md` 和 `artifacts/design.md` 执行。
- 顶部 KV 使用 `hero-kv.jpg`，按比例缩放，不裁切核心标题与篮球场主体。
- `body` 与主容器底色使用与 KV 底部融合的浅蓝色。
- 第一张对阵卡片使用 `margin-top: -48px` 覆盖头图下半部。
- 卡片使用微毛玻璃材质、圆角、轻阴影。
- 长分析文案按 14px、1.6 行高稳定折行，不裁切关键文案。
- 不新增需求文档和设计规范之外的新文案、新标签或新展示元素。

## 4. AB 分组方案

### 4.1 分组原则

- 分组由服务端完成，前端只消费分组结果。
- 登录用户按“当前活动实例唯一键 + uid”维度稳定分组，当前一期活动可按 `uid + match_id` 落地。
- 同一用户同一活动保持组别稳定。
- 不同活动可重新分组。
- `control` 组必须参与曝光、点击、提交埋点，作为真实对照样本。

### 4.2 未登录预览处理

- 未登录时可基于匿名会话标识和 `match_id` 返回预览分组。
- 登录回流后必须重新以“当前活动实例唯一键 + uid”获取正式分组，当前一期活动可按 `uid + match_id` 获取。
- 如预览分组与正式分组不同，以正式分组为准重新渲染内容，提交记录只写正式分组。

### 4.3 分组内容字段

后端按 PRD AB 实验分组表返回：
- `experiment_group`
- `experiment_code`
- 专家昵称
- 专家性别
- 准确度标签
- 专家建议
- 辅助角色类型
- 球迷昵称 / 性别
- 辅助建议
- 弹窗名称字段

`control` 组不返回分析模块内容或返回空内容，前端隐藏分析模块。

## 5. 后端技术方案

### 5.1 初始化接口

用途：进入页面时聚合 H5 首屏所需全部数据。

建议路径：`GET /api/nba-prediction/init`

请求参数：
- `match_id`
- `source`
- `client_env`

登录态：
- 通过宿主登录态或统一鉴权获取 UID。
- 未登录时 UID 为空，仍返回可预览数据。

响应字段：
- `match_id`
- `home_team`
- `away_team`
- `home_team_icon_url`
- `away_team_icon_url`
- `cutoff_time`
- `line_value`
- `submit_enabled`
- `experiment_group`
- `experiment_code`
- `content_payload`
- `popup_name`
- `user_submit_status`
- `user_previous_selection`
- `activity_rules`

异常处理：
- 比赛不存在：返回不可用状态。
- 截止时间已过：返回不可提交状态。
- 盘口缺失：返回不可提交状态。
- 已提交：返回已提交状态和历史选择。

### 5.2 提交接口

用途：写入用户单场预测、意愿字段和当前展示内容快照字段。

建议路径：`POST /api/nba-prediction/submit`

请求字段：
- `match_id`
- `selected_option`
- `line_value`
- `experiment_group`
- `experiment_code`
- `continue_receive_analysis`
- `displayed_primary_role_name`
- `displayed_assistant_role_name`
- `client_env`

服务端补充：
- `uid`
- `submit_time`

响应字段：
- `submit_success`
- `locked_status`
- `selected_option`
- `message`

校验规则：
- 必须登录。
- `match_id` 有效。
- 未超过竞猜截止时间。
- `line_value` 与后端当前盘口一致。
- `selected_option` 只能是“大”或“小”的内部枚举。
- 当前活动实例未提交；已提交时返回锁定态，当前一期活动可按 `match_id + uid` 判定。

### 5.3 结算与奖励字段

本期后端沉淀字段，实际抽奖、吧币发放、短信和站内信发送由外部系统承接。

结算输入：
- 比赛最终总分 `final_total_score`
- 用户预测选项
- 盘口值 `line_value`

结算字段：
- `final_total_score`
- `hit_result`
- `settle_time`

奖励字段：
- `reward_eligible`
- `reward_amount`
- `notify_status`

运营规则口径必须保持：
- 暂定测试 10 场比赛。
- 每场比赛发放 1000 吧币。
- 每场从参与预测用户中随机抽取 20% 用户。
- 被抽中的用户均分该场 1000 吧币。

## 6. 数据记录设计

### 6.1 match_config

比赛与盘口配置或数据源映射表。

| 字段 | 说明 |
| --- | --- |
| `match_id` | 比赛 ID |
| `home_team` | 主队队名 |
| `away_team` | 客队队名 |
| `home_team_icon_url` | 主队 icon |
| `away_team_icon_url` | 客队 icon |
| `cutoff_time` | 竞猜截止时间 |
| `line_value` | 竞彩篮球-大小分盘口值 |
| `match_status` | 比赛状态 |
| `data_source` | 比赛/盘口来源标识 |

### 6.2 experiment_assignment

AB 分组稳定记录。

| 字段 | 说明 |
| --- | --- |
| `match_id` | 比赛 ID |
| `uid` | 用户 ID |
| `experiment_group` | 分组类别 |
| `experiment_code` | 实验序号 |
| `assigned_at` | 分配时间 |

唯一约束：当前活动实例唯一键 + `uid`（当前一期活动可按 `match_id + uid` 实现）。

### 6.3 prediction_record

预测提交记录。

| 字段 | 说明 |
| --- | --- |
| `match_id` | 比赛 ID |
| `uid` | 用户 ID |
| `experiment_group` | 分组类别 |
| `experiment_code` | 实验序号 |
| `selected_option` | 用户选择 |
| `line_value` | 提交时盘口值 |
| `submit_time` | 提交时间 |
| `continue_receive_analysis` | 是否愿意继续收到分析 |
| `displayed_primary_role_name` | 当前展示核心角色名称 |
| `displayed_assistant_role_name` | 当前展示辅助角色名称 |
| `client_env` | 客户端环境 |

唯一约束：当前活动实例唯一键 + `uid`（当前一期活动可按 `match_id + uid` 实现）。

### 6.4 prediction_settlement

赛果与派奖字段。

| 字段 | 说明 |
| --- | --- |
| `match_id` | 比赛 ID |
| `uid` | 用户 ID |
| `final_total_score` | 最终总分 |
| `hit_result` | 是否命中 |
| `settle_time` | 结算时间 |
| `reward_eligible` | 是否获得派奖资格 |
| `reward_amount` | 吧币金额 |
| `notify_status` | 通知状态 |

## 7. 埋点方案

所有事件必须携带：
- `match_id`
- `uid_status`
- `experiment_group`
- `experiment_code`
- `submit_status`
- `source`

至少上报：
- 页面曝光
- 盘口选择
- 专家模块曝光
- AI 模块曝光
- 球迷模块曝光
- 提交按钮点击
- 意愿弹窗曝光
- 意愿选择结果
- 提交成功弹窗曝光
- 已提交态曝光

`control` 组不展示分析模块，因此不上报分析模块曝光，但必须上报页面曝光、选择、提交和已提交态事件。

## 8. 异常与风控

- 比赛数据缺失：页面展示不可用兜底，禁止提交。
- 盘口缺失：选项和提交不可用。
- 截止时间已过：禁止提交。
- 登录失败：停留当前页，保留可预览内容，允许用户重试登录。
- 网络失败：提交按钮恢复可点击，但不得自动重试写入。
- 重复提交：以后端唯一约束为准，返回已提交态。
- 弱网多次点击：前端 loading 锁 + 后端幂等双重保护。

## 9. 联调与验收口径

- H5 只实现单页活动，不新增列表页、原生能力或后台系统。
- 22 个 AB 实验序号可被稳定分配并正确渲染。
- `control` 组正确隐藏分析模块。
- 未登录可预览，提交前必须登录，登录后可回流原比赛页。
- 单用户每次活动只能提交一次，重复提交返回已提交态。
- 意愿弹窗在提交前出现，任一选择后写入 `continue_receive_analysis` 并展示提交成功弹窗。
- 初始化已提交用户时恢复已提交态。
- 赛果、命中、派奖、通知字段可被记录。
- 运营规则口径保持 10 场测试、每场 1000 吧币、随机抽取 20% 用户均分。
- 外部系统依赖清晰标注，不在本期实现范围内重做。
