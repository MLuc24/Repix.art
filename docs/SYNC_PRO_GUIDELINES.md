
# R2.20 — Sync Pro (Role 2) Guidelines

**Version:** 1.0
**Parent Guideline:** `FRONTEND_GUIDELINES.md`
**Focus:** Professional File Synchronization & Session Management.

---

## 1. Objectives
*   **Workflow Continuity:** Allow Pro users to manage local-to-cloud asset pipelines without a full desktop bridge application.
*   **Granular Control:** "Selective Sync" (File types, sizes, date ranges).
*   **Transparency:** Clear visualization of sync status, errors, and conflicts.
*   **Lite Architecture:** UI-driven simulation of background processes. No heavy client-side workers.

## 2. Design Principles
*   **Tone:** Technical, Reliable, Dark.
*   **Visuals:**
    *   **Cards:** Dense information (Progress bars, file counts, transfer rates).
    *   **Status Indicators:** Color-coded (Green=Synced, Amber=Paused, Red=Error, Blue=Syncing).
*   **Interaction:** Explicit "Start/Stop" controls. No "magic" background tasks that the user can't kill.

## 3. Feature Specifications

### 3.1 Sync Sessions
*   **Concept:** A "Session" is a saved configuration of a Local Folder path + Filters.
*   **States:** `Idle`, `Syncing`, `Paused`, `Error`, `Completed`.
*   **Actions:**
    *   **Play/Pause:** Toggle sync state.
    *   **Retry:** Attempt to re-sync failed items.
    *   **Settings:** Edit filters.

### 3.2 Selective Sync Filters
*   **File Types:** RAW, JPG, PNG, WEBP.
*   **Size Threshold:** "Skip files > X MB".
*   **Date Range:** "Last 7 days", "This Month", "All Time".
*   **Ignore Screenshots:** Boolean toggle.

### 3.3 Conflict Resolution
*   **Trigger:** When a file with the same name exists in the destination.
*   **UI:** Modal showing side-by-side comparison (Local vs Cloud).
*   **Metadata:** Compare Date Modified, File Size, Dimensions.
*   **Actions:** "Keep Local", "Keep Cloud", "Keep Both (Rename)".

### 3.4 Monetization (Priority Sync)
*   **Feature:** "Priority Sync" puts the session in a faster queue.
*   **Cost:** 1 Credit per session activation (Mock).
*   **Visual:** "Lightning" icon badge on the session card.

## 4. Component Structure

### `SyncProDashboard` (`roles/pro/pages/SyncProDashboard.tsx`)
*   **Layout:**
    *   **Main:** Grid of `SyncSessionCard`.
    *   **Sidebar:** `QuickImportPanel` (Mobile hint), `SyncLogSummary`.
    *   **Header:** "New Session" button.

### `CreateSessionModal`
*   **Steps:**
    1.  **Source:** Mock folder picker input.
    2.  **Filters:** Checkboxes and Sliders.
    3.  **Confirm:** Summary + Priority Sync toggle.

### `SyncSessionCard`
*   **Visual:** Rectangular card.
*   **Content:** Folder Name, Path (truncated), Progress Bar, Stats (Synced/Total).
*   **Controls:** Icon buttons for Play/Pause/Settings.

### `ConflictResolveModal`
*   **Layout:** Split view.
*   **Left:** Local Image + Meta.
*   **Right:** Cloud Image + Meta.
*   **Bottom:** Action buttons.

## 5. Mock Data Model
*   `SyncSession`: ID, Name, Path, Status, Stats, Filters.
*   `SyncConflict`: ID, File Name, LocalMeta, CloudMeta.
