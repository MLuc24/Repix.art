
# R2.15 — Auto Album Pro (Role 2) Guidelines

**Version:** 1.0
**Parent Guideline:** `FRONTEND_GUIDELINES.md`
**Focus:** Intelligent Photo Organization & AI Clustering.

---

## 1. Objectives
*   **Smart Organization:** Move beyond simple date/folder grouping to AI-driven clustering (Face, Location, Concept).
*   **High Visibility:** Large 2x2 grid previews on album covers.
*   **Efficiency:** Quick actions (Merge, Rename, Delete) directly on cards.
*   **Monetization:** "AI Refine" feature to upsell credit usage for cleaning up albums.

## 2. Clustering Logic
1.  **Face Cluster:** Groups photos by recognized faces.
2.  **Location Cluster:** Groups by GPS data or visual landmark detection.
3.  **Concept Cluster:** Groups by aesthetic (e.g., "Food", "Architecture", "Low Light").

## 3. Screen Layouts

### 3.1 Auto Album List (Pro)
*   **Header:** Tab Switcher (All / Faces / Locations / Concepts).
*   **Face Panel:** (Visible only on 'Faces' tab) Horizontal scroll of circular avatars.
*   **Grid:** Responsive grid of `AlbumCardPro`.

### 3.2 Album Card Pro
*   **Visual:** Aspect Ratio 4:5 or 1:1.
*   **Cover:** 4-image collage (2x2 grid).
*   **Badges:** Location Pin, Face Icons, "PRO" badge (if refined).
*   **Hover:** Reveals "Quick Actions" (Merge, Edit).

### 3.3 Album Detail View
*   **Layout:**
    *   **Left:** Album Meta (Name, Date, Map/Face preview).
    *   **Center:** Masonry grid of photos.
    *   **Right (Sidebar):** Inspector (Selection details).
*   **Primary Action:** "Refine Album (AI)" button (Monetization trigger).

## 4. Monetization Strategy
*   **Upsell Point:** "Refine Album".
*   **Value Proposition:**
    *   Auto-delete blurry photos.
    *   Pick "Best Shot" from bursts.
    *   Enhance thumbnails.
    *   **Cost:** 1-2 Credits per album.

## 5. Component Structure
*   `features/auto-album/`
    *   `types.ts`
    *   `components/AlbumCardPro.tsx`
    *   `components/FaceClusterPanel.tsx`
    *   `components/AlbumDetailPro.tsx`
    *   `components/ProRefineModal.tsx`
*   `roles/pro/pages/AutoAlbumProPage.tsx`
