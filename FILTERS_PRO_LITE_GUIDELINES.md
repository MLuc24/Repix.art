
# R2.7 — Filters Pro Lite (Role 2) Guidelines

**Version:** 1.0
**Parent Guideline:** `FRONTEND_GUIDELINES.md`
**Focus:** Advanced Filtering & Quick Adjustments for Pro Lite Users.

---

## 1. Objectives
*   **Expand Capabilities:** Introduce 12 advanced "Pro Lite" filters on top of the existing Role 1 set.
*   **Maintain Simplicity:** Keep the existing layout (Right Panel). Do not introduce complex node-graphs or new windows.
*   **Performance:** All previews must be lightweight (CSS/Canvas), no heavy backend calls.
*   **Visual Hierarchy:** Distinctly mark these as "Pro" features without clutter.

## 2. Tone & Design Principles
*   **Tone:** Professional, Dark, sleek. Matches the "Pro" aesthetic.
*   **Visuals:** Minimalist. Focus on the image preview. No excessive glows.
*   **Interaction:**
    *   **Hover:** Temporary "Peek" preview on the main canvas.
    *   **Click:** Apply the filter (client-side state).
    *   **Latency:** Snappy interactions (<200ms).

## 3. Changes from Role 1
*   **Role 1 (Casual):** ~6 Basic filters, small previews.
*   **Role 2 (Pro Lite):** Adds a new section below Basic Filters containing 12 Pro Filters with larger previews and quick-adjust capabilities.

## 4. Filters Pro Lite List (12 Presets)
Designed for creator workflows.

1.  **Leica Film:** Soft contrast + warm tone.
2.  **Kodak Gold:** Subtle film grain.
3.  **Fuji Classic:** Vintage color curve.
4.  **Cine Punch:** High contrast + teal shadows.
5.  **Clean Portrait:** Light skin smoothing.
6.  **HDR Micro:** Detail boost + local contrast.
7.  **Matte Soft:** Low contrast matte finish.
8.  **Ultra Sharp:** High frequency detail enhancement.
9.  **Soft Skin Pro:** Advanced portrait smoothing.
10. **Film Noir:** High contrast B&W.
11. **Pastel Mood:** Muted saturation + lift.
12. **Product Pop:** Vibrance + shadow control.

## 5. UI/UX Specifications

### 5.1 Pro Filters Panel Section
*   **Location:** Right Panel, below Basic Filters.
*   **Layout:** Responsive Grid (3x4 or adaptable).
*   **Card Components:**
    *   Small thumbnail preview.
    *   Filter Name.
    *   "PRO" Badge (Amber/Gold).
    *   Short 1-line info/tooltip.
*   **Behavior:**
    *   **Hover:** Triggers a reversible preview on the main canvas.
    *   **Click:** Applies the filter state.

### 5.2 Filter Details Popover (Lite)
*   **Trigger:** Click "..." on a Pro Filter Card.
*   **UI:** Small, lightweight popover.
*   **Contents:**
    *   Larger mini-preview.
    *   **Quick Sliders:** 0-2 parameters max (e.g., Intensity, Warmth).
    *   **Actions:** Apply / Cancel.

### 5.3 Quick-Compare
*   **Location:** Right Panel Header.
*   **UI:** Small toggle/icon button (Thumb-sized).
*   **Action:** Press and hold to see "Before", release for "After".

### 5.4 Saved Filter Slots (Local)
*   **Function:** Save current settings as a "Quick Preset".
*   **Storage:** `localStorage` (Client-side only).
*   **Limit:** 3 Slots.

## 6. Rules & Constraints
1.  **Complexity Cap:** Maximum 2 sliders per filter.
2.  **Destructive Actions:** None. "Peek" must revert on mouse leave if not clicked.
3.  **Responsive:** Grid becomes a horizontal carousel on mobile.
4.  **Tooltips:** Mandatory 1-line usage hint for every Pro filter.
5.  **Monetization:** Do not put paywalls *inside* the panel interaction. Use the marketplace for upselling packs.
6.  **Tech:** Previews must be CSS-based or pre-rendered thumbnails.

## 7. Required Components (UI-Only)
Create these in `roles/pro/components/filters/`:

1.  `ProFiltersPanel.tsx` (Wrapper)
2.  `ProFilterCard.tsx` (The grid item)
3.  `FilterDetailPopover.tsx` (The slider popup)
4.  `QuickPresetSlots.tsx` (The 3 save slots)
5.  `FilterCompareToggle.tsx` (The header switch)
