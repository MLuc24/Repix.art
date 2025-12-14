
# PROFILE SPECIFICATION (R1.x / R2.x — SHARED CORE)

**Philosophy:** Profile is an Account Summary, not a complex Settings page. It is identical for both Casual and Pro roles.

## 1. Architecture
*   **Path:** `features/profile/`
*   **Role Agnostic:** Logic checks `user.role` only for string display (e.g., "Pro Plan"), not for UI structure changes.
*   **Mobile-First:** Layout is a vertical stack of cards.

## 2. UI Components

### A. ProfileHeader
*   **Visual:** Centered layout.
*   **Elements:** Large Avatar (circular), Display Name (H2), Email (text-sm text-slate-500).
*   **Action:** "Logout" button (Top Right or inline).

### B. CreditsSnapshotCard
*   **Visual:** High contrast, possibly gradient background or border to emphasize value.
*   **Data:**
    *   Current Balance (Large Font).
    *   "Used Today" (Mock data).
    *   "Used 7 Days" (Mock data).
*   **Actions:**
    *   [Primary] "Buy Credits" -> Navigates to `credits`.
    *   [Secondary] "History" -> Navigates to `credits-log`.

### C. AccountInfoCard
*   **Visual:** Standard `GlassPanel`.
*   **Data:**
    *   Role Badge (Casual / Pro).
    *   Member Since (Mock Date).
    *   Email (Read-only).
*   **Action:** "View Plans" -> Navigates to `subscription`.

### D. BasicPreferencesPanel
*   **Visual:** Simple list of Toggles.
*   **Options:**
    1.  Dark Mode (Theme toggle).
    2.  Confirm before spending (Mock toggle).
    3.  Auto-save edits (Mock toggle).

### E. ProfileQuickLinks
*   **Visual:** List of chevron links.
*   **Items:**
    *   My Images
    *   Billing & Usage
    *   Support / Help
    *   Terms & Privacy

## 3. Interaction Rules
*   **No Editing:** Profile details (Name, Email, Bio) are read-only in this MVP version to reduce complexity.
*   **Navigation:** All internal links use the `onNavigate` prop.
*   **Logout:** Calls `onLogout` prop immediately.
