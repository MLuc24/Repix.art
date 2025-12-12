
# R2.22 — Credit Usage Log Pro Guidelines

**Version:** 1.0
**Parent Guideline:** `FRONTEND_GUIDELINES.md`
**Focus:** Transparency, Insight, and Re-engagement for Power Users.

---

## 1. Data Structure (Mock)

We need specialized types for analytics, distinct from the simple transaction list.

### Types (`features/billing/types.ts`)
*   `UsageStat`: { tool: string, cost: number, percentage: number, color: string }
*   `DailyUsage`: { date: string, amount: number }
*   `InsightTip`: { title: string, message: string, actionLabel: string, actionTarget: string }

## 2. Component Specifications

### 2.1 Overview Card
*   **Layout:** 3 Columns (Balance, Usage 30d, Daily Avg).
*   **Visual:** Glassmorphism panel with a prominent "Top Up" NeonButton.

### 2.2 Timeline Chart (CSS Only)
*   **Tech:** Flexbox with `items-end`.
*   **Bars:** `div` with dynamic `height: ${percent}%`.
*   **Interaction:** Hover to see exact value tooltip.

### 2.3 Breakdown List
*   **Style:** Horizontal progress bars.
*   **Sorting:** Descending by cost.
*   **Colors:** Consistent mapping (Generator=Violet, Export=Amber, etc.).

### 2.4 Insight Card
*   **Logic:** Mock rule-based.
    *   If `Export 4K` > 30% usage -> Suggest "Batch Export".
    *   If `Generator` > 50% usage -> Suggest "Pro Models".

## 3. Page Layout (`CreditUsageLogProPage.tsx`)
*   **Header:** Title + Date Range Picker (Mock).
*   **Row 1:** Overview Card (2/3) + Insight Card (1/3).
*   **Row 2:** Timeline (Full Width).
*   **Row 3:** Breakdown (1/3) + Transaction Table (2/3).
