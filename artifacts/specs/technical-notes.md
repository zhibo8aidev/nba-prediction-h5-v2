# Technical Notes - NBA预测 H5

## 1. 技术方向
- 前端：H5 / mobile-web
- 设计产物：HTML 高保真 mockups
- 后端职责：比赛与盘口读取、实验组分配、预测写入、赛果结算字段沉淀
- 页面主宽度以 `390px` 视觉基线适配移动端

## 2. 前端实现重点
### 2.1 页面状态管理
需要管理：
- 比赛数据加载状态
- 登录态
- 实验组信息
- 盘口选择状态
- 意愿弹窗状态
- 提交成功弹窗状态
- 已提交锁定态

### 2.2 提交与防重
- 单用户单场仅允许提交一次
- 前端需具备 loading、防重复点击、防重复写入
- 接口返回已提交时需恢复锁定 UI

### 2.3 动态内容渲染
- 根据实验组渲染专家 / AI / 球迷内容
- 长文案必须支持稳定折行与足够行高
- control 组需正确隐藏分析模块
- 弹窗名称需与当前组展示昵称一致

### 2.4 视觉落地点
- 顶部 KV 需按比例缩放展示，避免裁切主标题与主体球场
- `body` 与主容器底色应与头图底部浅蓝色保持一致
- 第一张卡片通过 `margin-top: -48px` 覆盖头图下半部
- 返回按钮、卡片、弹窗、选项与按钮都需遵守设计规范中定义的尺寸与材质

## 3. 推荐接口边界
### 3.1 页面初始化接口
建议返回：
- match_id
- home_team / away_team
- team_icon_urls
- cutoff_time
- line_value
- experiment_group
- experiment_code
- content_payload
- user_submit_status
- user_previous_selection

### 3.2 提交接口
建议入参：
- match_id
- uid
- experiment_group
- experiment_code
- selected_option
- line_value
- continue_receive_analysis
- displayed_primary_role_name
- displayed_assistant_role_name
- client_env

建议返回：
- submit_success
- locked_status
- message

### 3.3 结算与奖励字段接口
建议支持：
- 查询单用户单比赛提交记录
- 回写比赛赛果与命中结果
- 标记是否参与随机派奖
- 标记吧币金额与通知状态

## 4. AB 实验实现建议
- 分组建议服务端完成，粒度为 `uid + match_id`
- 页面曝光、点击、提交都要带 `experiment_group / experiment_code`
- control 组必须可追踪，以形成真实对照样本

## 5. 埋点建议
至少埋点：
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

## 6. 后端与业务依赖
### 6.1 待确认依赖
- 比赛与盘口数据源
- 登录 UID 获取方式
- 命中结算来源
- 吧币发放系统
- 短信 / 站内信通知系统

### 6.2 范围建议
- 本期 H5 与配套后端负责展示、分组、提交、记录与派奖结果字段沉淀
- 真正的抽奖执行、吧币发放、短信与站内信发送可由外部系统承接

## 7. 测试关注点
- 未登录与已登录链路是否正确
- 重复提交是否被准确拦截
- 各实验组内容是否符合配置
- 390px 宽度下长文案是否稳定展示
- control 组是否正确隐藏分析模块
- 弹窗流程与已提交态是否闭环
- 弱网场景下是否避免脏数据与重复写入

## 8. 设计执行输入
- `artifacts/source-prd/prd.md`
- `artifacts/source-design/design-spec.md`
- `artifacts/source-design/hero-kv.md`
- `artifacts/source-design/assets/hero-kv.jpg`

## 9. 当前结论
- proposal/specs 产出后可进入 `prd_review`
- 设计阶段需使用 Gemini 基于头图与设计规范输出 HTML 高保真 H5 mockups
- 设计阶段需重点验证头图承接、微毛玻璃卡片、长文案可读性与弹窗质感
