# NBA Prediction H5 Design Specification (High-Fidelity)

## 1. Visual Language
*   **Tone & Style**: High-key, bright, transparent, and sporty but light. Avoids heavy dark themes typical of traditional sports apps.
*   **Primary Palette**: 
    *   Background: `#E0F2FE` (Light dynamic blue, synced with KV bottom).
    *   Primary Action: Blue-Purple Gradient (e.g., `linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)`).
    *   Expert Accents: Blue (`#3B82F6`).
    *   AI Accents: Tech Purple (`#A855F7`).
    *   Text: Primary `#0F172A`, Secondary `#475569`.
*   **Material**: Micro-glassmorphism. 
    *   Background: `rgba(255, 255, 255, 0.4)`
    *   Blur: `backdrop-filter: blur(20px)`
    *   Border: `1px solid rgba(255, 255, 255, 0.3)`

## 2. Core Components

### 2.1 Back Button
*   **Position**: Top: `env(safe-area-inset-top) + 12px`, Left: `16px`.
*   **Style**: 32x32px circle, glassmorphism, blur(10px).

### 2.2 Hero KV
*   **Implementation**: 100% width, seamless blend with `#E0F2FE` background.
*   **Title/Subtitle**: Subtitle "玩竞猜，送吧币" clearly visible.

### 2.3 Matchup Card
*   **Layout**: `margin-top: -48px`.
*   **Radius**: 28px.
*   **Logos**: 48x48px circles with 2px white border and soft shadow.
*   **VS**: Large bold italic, muted color.

### 2.4 Analysis Modules
*   **Header**: 16px font, vertical line (Blue for Expert, Purple for AI).
*   **Content**: 14px font, 1.6 line-height, inside a `rgba(0, 0, 0, 0.04)` bubble.
*   **Tags**: Orange tactical tags (e.g., "近10中8").

### 2.5 Action Buttons
*   **Options**: Large hit area, toggle state (Blue background when selected).
*   **Submit**: Pill-shaped, gradient, full width.

## 3. UI States

### 3.1 Default Landing Page
*   Shows Header, Matchup (no selection), Expert/AI analysis, and the full approved activity rules copy from the PRD.

### 3.2 Option Selected
*   Selected option (e.g., "总分高于200.5") turns Blue with white text.
*   Submit button becomes active (Gradient state).

### 3.3 Intention Popup (Willingness)
*   Triggered after clicking "Submit".
*   Glassmorphism overlay.
*   Text: "您是否愿意在后续的竞猜活动中继续收到 [专家/AI名称] 的专家分析？"
*   Buttons: [愿意] (Primary), [不愿意] (Secondary/Ghost).

### 3.4 Success Popup
*   Triggered after Intention Popup selection.
*   Confirmation icon + Success message.
*   Button: [知道了].

### 3.5 Submitted State
*   Buttons are disabled/locked.
*   Submit button shows "已提交".

### 3.6 Error State
*   Network error or session timeout toast.

## 4. Layout Specifications
*   Target Width: 390px.
*   Margins: 16px lateral.
*   Vertical Spacing: 16px between cards.
*   Rules Section: must render the exact approved activity-rules copy, including participation, prize notice, Apple disclaimer, and all three disclaimer sub-items, without summary rewriting.
