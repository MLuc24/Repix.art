# Role 2 (Pro Lite) Generator Specification

**Version:** 1.0
**Parent Guideline:** `FRONTEND_GUIDELINES.md`
**Philosophy:** "Role 1++". Minimal UI expansion, maximum value perception.

---

## 1. UI/UX Objectives
*   **Zero Layout Shift:** Maintain the existing 2-column layout (Controls Left, Results Right).
*   **No Tabs/Panels:** Avoid complex navigation. All controls must fit in the existing sidebar.
*   **Upsell Driven:** Visually distinguish Pro features (Batch output, Pro Models) without hiding them completely.

## 2. Feature Requirements

### A. Model List Upgrade
*   **New Models:**
    1.  `RealPhoto V3` (Pro, 3 credits)
    2.  `HyperDetail Pro` (Pro, 3 credits)
*   **UI:** Add "PRO" badge to dropdown items. Add generic tooltip capability for "High-end quality".

### B. Output Selector Lite
*   **Location:** Immediately below Aspect Ratio selector.
*   **Options:**
    *   1 Image (Default)
    *   2 Images (Free)
    *   4 Images (Pro, Lock Icon)
*   **Interaction:** Simple radio/button group.

### C. Advanced Settings Lite
*   **Location:** Bottom of sidebar, above Generate button.
*   **Components:** 3 Sliders (Range 0-100).
    1.  Detail Boost
    2.  Creativity
    3.  Sharpness
*   **Visuals:** Clean, compact neon sliders.

### D. Prompt Enhance Pro
*   **Location:** Inside/Near Prompt Input area.
*   **Function:** Simulates rewriting the prompt for better AI understanding.

---

## 3. Technical Implementation Strategy

### Component Pattern
Follow the **Base Component** pattern from `FRONTEND_GUIDELINES`.
*   `features/generator/components/BaseGeneratorUI.tsx` will house the new "Lite" atoms.

### State Management
*   Local state in `CasualGenerator.tsx` is sufficient.
*   `batchSize`: number (1 | 2 | 4)
*   `settings`: object ({ detail, creativity, sharpness })

### Mock Data
*   Update `services/mock/generator.ts` to include new models.

---

## 4. Monetization Logic (Mock)
*   **Pro Model:** Cost = 3 credits.
*   **Batch (4 imgs):** Cost += 2 credits.
*   **Upscale:** Cost = 1 credit (Existing).
