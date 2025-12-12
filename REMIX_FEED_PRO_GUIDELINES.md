
# R2.13 — Remix Feed Pro (Role 2) Guidelines

**Version:** 1.0
**Parent Guideline:** `FRONTEND_GUIDELINES.md`
**Focus:** Action-first inspiration feed for Pro users.

---

## 1. Objectives
*   **Discovery:** Surface hidden Pro models and styles (e.g., "Batch Product", "Cinematic Portrait").
*   **Speed:** reduce "time-to-create" by offering pre-configured starting points.
*   **Conversion:** Increase usage of credit-heavy features (Batch, HD) via context-aware suggestions.

## 2. Design Principles
*   **Tone:** Dark, sleek, high-density.
*   **Visuals:** Card-based. High-quality thumbnail collages.
*   **Interaction:** "Click-to-Load". Primary action immediately navigates to Generator/Editor with preset params.

## 3. Feed Item Types
1.  **Suggested Remix:** Based on user activity (e.g., "Remix your last portrait").
2.  **Trending Style:** Popular Style Packs.
3.  **Model Highlight:** Showcase specific capabilities (e.g., "Veo 3.1 Video").
4.  **Batch Idea:** Suggestions for bulk processing.
5.  **Daily Prompt:** Copy-paste ready text prompts.

## 4. Components

### 4.1 `RemixFeedProContainer` (`roles/pro/feed/RemixFeedPro.tsx`)
*   **Layout:** Two columns on Desktop, One on Mobile.
*   **Sidebar:** Contains `SavedCollectionsWidget`.
*   **Top Bar:** `FeedFilterChips`.

### 4.2 `RemixFeedCard` (`roles/pro/feed/components/FeedUI.tsx`)
*   **Header:** User info or "Trending" badge.
*   **Media:**
    *   *Type A (Collage):* 1 Main + 2 Small thumbs.
    *   *Type B (Hero):* 1 Large aspect-ratio video/image.
*   **Footer:** Title, Description, Credit Cost.
*   **Actions:**
    *   **Primary:** "Use This Style" / "Remix" (Navigates to Generator).
    *   **Secondary:** "Preview" (Opens Modal) or "Save".

### 4.3 `RemixPreviewModal`
*   Simple overlay showing larger variants of the style.

## 5. Navigation Logic
*   **Router:** No complex routing.
*   **Parameter Passing:** Use `sessionStorage` to pass `prompt`, `modelId`, `styleId` to the `CasualGenerator` / `ProGenerator` pages.

## 6. Mock Data Structure
Located in `services/mock/feed.ts`.
