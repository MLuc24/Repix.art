
# R2.10 — History Pro (Role 2) Guidelines

**Version:** 2.10
**Parent Guideline:** `FRONTEND_GUIDELINES.md`
**Focus:** Advanced History & Time Travel for Pro Users.

---

## 1. Primary Objectives
*   **Upgrade:** Transition from Lite History (Role 1) to History Pro.
*   **Visibility:** Display 10–20 recent steps with a clear thumbnail timeline.
*   **Productivity:** Enable quick-jump, snapshot/save, and fast comparison.
*   **Performance:** Keep UI lightweight, linear, and non-blocking. Re-use `EditorBase` history API.

## 2. Style & Principles
*   **Tone:** Dark Pro (Consistent with Role 2).
*   **Visual:** Compact, high-density information, minimal text.
*   **Interaction:** Instant feedback (<200ms), hover-first UX, keyboard friendly.
*   **Priority:** Speed & Clarity > Animation.

## 3. Feature Overview

### 3.1 Horizontal Timeline
*   Display thumbnails in a horizontal scrollable strip.
*   **Dimensions:**
    *   Desktop: 40–56px
    *   Tablet: 36–44px
    *   Mobile: 28–36px
*   **Labels:** Short token below thumbnail (e.g., "Enhance", "Crop").

### 3.2 Quick-Jump Navigation
*   **Click:** Instant preview (non-destructive).
*   **Double-Click:** Commit change (revert to step).
*   **Keyboard:** `Left`/`Right` to navigate, `Enter` to commit.

### 3.3 Thumbnail Preview
*   **Desktop Hover:** Shows large preview (120–160px) + timestamp + diff badge.
*   **Mobile:** Long-press to preview.

### 3.4 Compare Mode
*   Select start point -> Select end point -> Opens comparison.
*   **UI:** Side-by-side or Split view overlay with slider.

### 3.5 Snapshots
*   **Action:** "Save Snapshot" on any step.
*   **Display:** Saved snapshots appear pinned at the start of the timeline with a Star badge.
*   **Storage:** Local project state.

### 3.6 Filtering
*   **Chips:** All, Auto, Manual, AI, Export.
*   **Search:** Filter steps by action name.

## 4. UX Rules
*   **Linearity:** No complex branching; keep history linear.
*   **Efficiency:** Max 2 clicks for any action.
*   **Feedback:** Immediate visual response on hover.
*   **Accessibility:** Full keyboard support.

## 5. Component Specifications

### `HistoryBarPro`
*   Main container.
*   Contains: Filter Chips (Top), Thumbnail Strip (Middle), Action Bar (Right).

### `HistoryThumbnailItem`
*   Individual step component.
*   Props: `step`, `isActive`, `isPreviewing`, `onHover`, `onClick`.

### `HistoryPreviewPopup`
*   Floating tooltip.
*   Shows: Large Image, Timestamp, "Revert" button.

### `CompareOverlay`
*   Modal/Overlay for A/B comparison.

### `SnapshotManagerMini`
*   Dropdown menu for managing saved states.

## 6. Implementation Notes
*   **Virtualization:** Use windowing for the thumbnail list if steps > 50.
*   **Assets:** Reuse cached thumbnails from `HistoryStep`.
*   **API:**
    *   `revertToStep(id)`
    *   `saveSnapshot(id)`
    *   `compareSteps(idA, idB)`
