
# R2.5 — Template Packs & Marketplace Pro Guidelines

**Context:** Expansion of the Template Marketplace for **Role 2 (Pro Lite)**.
**Goal:** Enhance discovery, preview, and selection speed without backend integration.

---

## 1. Feature Scope & Permissions

| Feature | Role 1 (Casual) | Role 2 (Pro Lite) | Implementation Note |
| :--- | :--- | :--- | :--- |
| **Grid Layout** | 3 columns | 4-6 columns (Responsive) | Use Tailwind `grid-cols-` modifiers. |
| **Template Source** | Individual Templates | **Template Packs** (Collections) | New Data Model required. |
| **Access** | ~5 Free Templates | **10 Unlocked Packs** + "Pro+" Locked | Check `pack.tier` property. |
| **Search** | Basic Title Match | **Realtime Filter** (Tags + Title) | Local state filtering. |
| **Preview** | Thumbnail Only | **Quick Popup Modal** | `TemplatePreviewModal`. |
| **Action** | "Use" -> Editor | "Use" -> Editor (Pre-filled) | Mock preset loading. |

---

## 2. Data Structure (Mock)

We need a new concept of **Packs** to group templates.

### Types (`features/templates/types.ts`)

```typescript
export type PackTier = 'Free' | 'Pro' | 'Pro+'; // Pro+ is locked for Role 2

export interface TemplatePack {
  id: string;
  title: string;
  description: string;
  thumbnail: string; // Cover image for the pack card
  category: string; // e.g., 'Social Media', 'Product'
  tags: string[]; // ['neon', 'dark', 'portrait']
  tier: PackTier;
  items: Template[]; // Array of existing Template objects
}
```

### Mock Data (`services/mock/template_packs.ts`)

Create `MOCK_TEMPLATE_PACKS` containing 10-12 items.
*   **Pro Packs:** ~8 items (Unlocked for Role 2).
*   **Pro+ Packs:** ~2 items (Locked visual state).

---

## 3. Screen Specifications

### 3.1 Template Marketplace Screen (`features/templates/pages/ProMarketplace.tsx`)

**Header Area:**
*   **Title:** "Pro Templates" or "Marketplace".
*   **Search Bar:** Large, prominent. Filters packs by title or tag.
*   **Tag Filter Row:** Horizontal scrollable pill list (e.g., "Portrait", "Product", "Cyberpunk", "Minimal").

**The Grid:**
*   **Container:** `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6`.
*   **Item:** `TemplatePackCard`.

### 3.2 Pack Card Component (`features/templates/components/TemplatePackCard.tsx`)

*   **Visual:** Vertical aspect ratio (3:4 or 4:5).
*   **Content:**
    *   Large Cover Image.
    *   Title (Truncated 1 line).
    *   Count Badge (e.g., "12 items").
    *   **Tier Badge:**
        *   *Pro:* Violet/Gold gradient badge.
        *   *Pro+:* Grey/Lock icon badge (Opacity 0.8 on card).
*   **Hover Interaction:**
    *   Scale up slightly (`scale-105`).
    *   Show "View Pack" button overlay.

### 3.3 Pack Detail View (`features/templates/components/TemplatePackDetail.tsx`)

*   **State:** This is a view state, not a separate route.
*   **Header:**
    *   "Back to Marketplace" button.
    *   Pack Title & Description.
    *   "Add to Favorites" (Mock button).
*   **Grid:**
    *   Display `pack.items` (Individual Templates).
    *   Clicking an item opens **Preview Modal**.

### 3.4 Preview Modal (`features/templates/components/TemplatePreviewModal.tsx`)

*   **Overlay:** `GlassModal` or Fullscreen overlay.
*   **Layout:**
    *   **Left:** Large Image Preview (Fit contain).
    *   **Right (Sidebar):** Template Details + "Use Template" button.
*   **Logic:**
    *   Clicking "Use Template" -> `onNavigate('editor')`.

---

## 4. Technical Rules

1.  **No Backend:** Do not attempt to fetch data. Import from `services/mock`.
2.  **Performance:** Memoize the filtered list in the Marketplace to ensure smooth typing in the search bar.
3.  **Reusability:**
    *   Reuse `GlassPanel`, `NeonButton`, `Icons`.
    *   Ensure the `TemplatePackCard` handles its own "Locked" visual state based on the `tier` prop.
4.  **Navigation:**
    *   The Marketplace is a single "Page" component.
    *   Drilling down into a Pack should ideally be a local state switch (e.g., `view: 'gallery' | 'pack_detail'`) within that page to maintain instant UI response.

---

## 5. Implementation Checklist

1.  [ ] Define `TemplatePack` interfaces.
2.  [ ] Create `services/mock/template_packs.ts`.
3.  [ ] Create `TemplatePackCard` component.
4.  [ ] Create `TemplatePreviewModal` component.
5.  [ ] Create `ProMarketplace` page (combines Grid + Search + Detail View logic).
6.  [ ] Route `ProDashboard` "Templates" link to this new page.
