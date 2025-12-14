
# Image Generator Guidelines

## 1. Casual Experience
**Goal:** Simplicity and Upsell.
*   **sidebar:** Minimal. Only show Model, Prompt, and Aspect Ratio.
*   **Models:** List all models. If `model.isPro === true`, selecting it **must** trigger the `GlassModal` upsell immediately. Do not allow selection.
*   **Hidden Features:** 
    *   `Output Count` must not be rendered.
    *   `Advanced Settings` must not be rendered.
    *   **Pro Enhance:** The "Pro Enhance" button inside the prompt input must be removed/hidden.
*   **Defaults:** Batch size = 1. Settings = Default.

## 2. Pro Experience
**Goal:** Control and Power.
*   **sidebar:** Dense. Include Output Count and Advanced Sliders.
*   **Models:** Allow selection of any model without interruption.
*   **Features:**
    *   Batch Size: Allow 1, 2, or 4.
    *   Advanced Settings: Full slider control.
    *   Pro Enhance: Visible and functional in the Prompt Input.
    *   Results: Actions like "Upscale" are unlocked.

## 3. Shared Components
Use `features/generator/components/BaseGeneratorUI.tsx` for all atoms (PromptInput, AspectRatio, etc.) to ensure visual consistency between roles.
