
# REPIX.art — Frontend Development Guidelines (v2.0)

**Stack:** React 18+, TypeScript, Tailwind CSS
**Architecture:** Feature-Sliced Design (Modified for Role-Based Separation)
**Visual Style:** Dark Mode, Glassmorphism, Neon Accents, Cyberpunk/Modern Aesthetics.

---

## 1. Core Philosophy: Multi-Role Architecture

The application serves two distinct user personas within a single codebase. All features must be designed with this separation in mind.

### Role 1: Casual (Lite)
*   **Target:** Everyday users, social media creators.
*   **UX Pattern:** Wizard-style flows, large preview cards, simple "Magic" buttons.
*   **Complexity:** Hides parameters (e.g., "Enhance" button instead of sliders).
*   **Navigation:** Simplified sidebar (`dashboard`, `my-images`, `remix`).
*   **Monetization:** Frequent "Show & Lock" upsell triggers on specific items.

### Role 2: Pro (Creator/Studio)
*   **Target:** Designers, power users, agencies.
*   **UX Pattern:** Dense toolbars, comprehensive sidebars, batch operations, file details.
*   **Complexity:** Exposes all parameters (Curves, Levels, Masking, Batch Controls).
*   **Navigation:** Advanced sidebar (`generator`, `editor`, `credits-log`).
*   **Monetization:** Credit consumption for high-compute tasks (4K Export, Batch Generation).

---

## 2. Directory Structure

**Rule:** Do NOT create a `src/` folder. Treat the project root as the source.

```text
/
├── features/                 # DOMAIN LOGIC & SHARED UI (Role Agnostic)
│   ├── [feature-name]/       # e.g., editor, generator, templates
│   │   ├── components/       # "Dumb" Base Components (e.g., Sliders, Inputs)
│   │   ├── types.ts          # Feature-specific Interfaces
│   │   └── pages/            # (Optional) If logic is identical across roles
│
├── roles/                    # ROLE-SPECIFIC COMPOSITION & LOGIC
│   ├── casual/
│   │   ├── pages/            # e.g., CasualDashboard.tsx, CasualEditor.tsx
│   │   └── components/       # Simplified UI wrappers
│   ├── pro/
│   │   ├── pages/            # e.g., ProDashboard.tsx, EditorProLite.tsx
│   │   └── components/       # Advanced tools (e.g., ProMaskPanel, BatchAction)
│
├── shared/                   # GLOBAL UTILITIES
│   ├── components/           # Design System (Icons.tsx, GlassUI.tsx)
│
└── services/                 # DATA LAYER
    └── mock/                 # Static data & simulated async calls
```

---

## 3. Design System & Styling Rules

### 3.1 Colors & Theme
*   **Mode:** Dark Mode is the default.
*   **Backgrounds:**
    *   App Background: `bg-[#020617]` (Deepest Dark)
    *   Panels/Sidebars: `bg-[#0e0f13]` or `bg-[#0e0f14]`
    *   Cards/Inputs: `bg-[#1a1b26]`
*   **Accents:**
    *   **Casual:** `violet-600` to `fuchsia-600` gradients.
    *   **Pro:** `teal-500` (Tools), `amber-500` (Premium/Gold), `blue-500` (Sync).
*   **Text:**
    *   Primary: `text-white` or `text-slate-900` (in light mode overrides).
    *   Secondary: `text-slate-400` or `text-slate-500`.

### 3.2 Glassmorphism Components
Always import from `shared/components/GlassUI.tsx`:
*   `GlassPanel`: For containers requiring blur.
*   `GlassModal`: For all dialogs/popups.
*   `NeonButton`: Primary call-to-action buttons.
*   `AuthInput`: Standard styled input fields.

### 3.3 Icons
*   **Rule:** NEVER import external icon libraries (like Lucide/FontAwesome) directly in feature files.
*   **Usage:** Import `Icons` from `../../../shared/components/Icons`.
*   **Adding Icons:** Add new SVGs to `shared/components/Icons.tsx` to maintain a single source of truth.

### 3.4 Animations
Use Tailwind's `animate-` utilities defined in `index.html`:
*   `animate-fade-in-up`: Standard entry animation for cards/sections.
*   `animate-pulse`: For loading states or highlighting "New" features.
*   `animate-spin`: For loading spinners.

---

## 4. Coding Patterns

### 4.1 Component Composition
*   **Functional Components:** Use React Hooks (`useState`, `useEffect`, `useMemo`).
*   **Props:** Define explicit interfaces in `types.ts` or directly above the component.
*   **Avoid:** Large monolithic files. Break down UIs into smaller "dumb" components in `features/[feature]/components`.

### 4.2 State Management
*   **Local State:** Use `useState` for UI toggles (modals, tabs).
*   **Navigation:** Use the passed `onNavigate` prop.
*   **Session Data:** Use `sessionStorage` for passing transient data between pages (e.g., passing a prompt from Dashboard to Generator).
    *   *Example:* `sessionStorage.setItem('gen_prompt', '...')` -> `onNavigate('generator')`.

### 4.3 Mocking Data
*   **Location:** `services/mock/[feature].ts`.
*   **Images:** Use Unsplash source URLs with specific parameters (e.g., `&w=400&q=80`) for performant mock images.
*   **Async Simulation:** Use `setTimeout` (500ms - 2500ms) to simulate network operations (Uploads, Generation, Export).

---

## 5. The "Show & Lock" Upsell Pattern

**Rule:** Never hide a Pro feature from a Casual user if it can serve as an advertisement.

1.  **Render:** Show the Pro feature (button, model, preset) in the Casual UI.
2.  **Badge:** Overlay a Lock Icon or "PRO" badge (Amber color).
3.  **Interaction:**
    *   *Clicking* triggers a `GlassModal` upsell dialog.
    *   Do NOT allow the action to proceed.
    *   Use `features/[feature]/components/[Feature]Modals.tsx` for these paywalls.

---

## 6. Development Checklist for New Features

1.  **Types:** Define interfaces in `features/[feature]/types.ts`.
2.  **Mock Data:** Create static data in `services/mock/[feature].ts`.
3.  **Shared UI:** Build reusable atoms in `features/[feature]/components/`.
4.  **Casual Page:**
    *   Create `roles/casual/pages/Casual[Feature].tsx`.
    *   Implement simplified layout & upsell triggers.
5.  **Pro Page:**
    *   Create `roles/pro/pages/Pro[Feature].tsx`.
    *   Implement advanced layout, batch actions, and granular controls.
6.  **Route:** Register the new view in `index.tsx` (`ViewState` and `renderView`).

---

## 7. Responsive Design
*   **Mobile First:** Ensure layouts stack vertically on mobile (`flex-col`).
*   **Desktop:** Expand to sidebars/grids (`lg:flex-row`, `lg:grid-cols-4`).
*   **Hiding Elements:** Use `hidden lg:block` for complex sidebars that shouldn't appear on mobile.
*   **Scrollbars:** Use `.custom-scrollbar` or `.no-scrollbar` classes for cleaner UI within panels.
