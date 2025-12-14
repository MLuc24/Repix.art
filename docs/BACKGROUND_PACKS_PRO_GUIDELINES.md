
# R2.16 — Background Packs Pro (Role 2) Guidelines

**Version:** 1.0
**Parent Guideline:** `FRONTEND_GUIDELINES.md`
**Focus:** Instant, context-aware background replacement for Pro users.

---

## 1. Objectives
*   **Speed:** Replace backgrounds without complex prompting.
*   **Context:** Curated packs for specific use cases (Studio, Product, Social).
*   **Monetization:** High-conversion feature using Credit Packs.
*   **Integration:** Works alongside "Remove BG".

## 2. Design Principles
*   **Visual:** "Preview-First". Users choose based on the visual result, not the name.
*   **Structure:** Preset-based (Packs) rather than loose images.
*   **Efficiency:** 1-Click Apply with smart default settings (Shadows/Lighting).

## 3. Feature Scope (Role 2)

| Feature | Description |
| :--- | :--- |
| **Categories** | Studio, Product, Environment, Creative. |
| **Packs** | 8-12 Curated Packs (6-12 BGs each). |
| **Custom BG** | Local upload support (No cloud sync). |
| **Refinement** | Toggle options for Shadows and Lighting Match. |

## 4. UI Specifications

### 4.1 Background Packs Panel
*   **Location:** Editor Right Panel (or specialized tool panel).
*   **Header:** Category Filter Tabs.
*   **Body:** Responsive Grid of Pack Cards.
*   **Footer:** Custom Background Uploader.

### 4.2 Background Pack Card
*   **Layout:** Aspect Ratio 4:5 (Vertical).
*   **Elements:** Large Cover Image, Title, Count Badge, "PRO" Badge.
*   **Interaction:**
    *   **Hover:** Reveal "Preview" and "Apply" buttons.
    *   **Click:** Opens Detail Overlay.

### 4.3 Preview Overlay
*   **Type:** `GlassModal` or non-fullscreen overlay.
*   **Content:** Grid of all backgrounds inside the pack.
*   **Action:** Clicking a thumbnail updates the main canvas preview temporarily.

### 4.4 Apply Modal
*   **Settings:**
    *   **Scope:** Current vs Batch.
    *   **Toggles:** "Keep Shadows", "Match Lighting".
*   **Cost:** Explicitly state credit cost (e.g., "Apply (1 Credit)").

## 5. Technical Constraints
*   **No Realtime Gen:** Use static assets/URLs for backgrounds.
*   **Mock Data:** Use Unsplash IDs for realistic previews.
*   **State:** Local state for Custom Backgrounds (do not persist).

## 6. Directory Structure
`roles/pro/components/backgrounds/`
*   `BackgroundPacksProPanel.tsx`
*   `BackgroundPackCard.tsx`
*   `BackgroundPreviewOverlay.tsx`
*   `ApplyBackgroundModal.tsx`
*   `CustomBackgroundUploader.tsx`
