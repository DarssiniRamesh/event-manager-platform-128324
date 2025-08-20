# Modal (Sign In / Sign Up) UI Audit vs Figma

Scope: Only popup/modal UIs (Sign In and Sign Up), comparing React implementation under `src/components/Modal` and `src/pages/SignIn|SignUp` against Figma-extracted references:
- `assets/sign-in-page-271-36004.css` and `.html`
- `assets/sign-up-page-screen-2-1816.css` and `.html`
- Tokens/icon primitives from `src/styles/common.css`

## Findings

1) Modal Container Width and Layout
- Current: `.dialog { width: min(100%, 1200px) }`
- Figma intent: Two-pane composition corresponds to a wider layout (left ~766px visual + right form area), visually designed for a 1920 canvas. 
- Impact: The current 1200px cap leads to compressed layout and spacing drift from Figma proportions inside the modal.
- Plan:
  - Increase modal max width to ~1620px (approximately the content width used in other sections).
  - Use a responsive clamp `width: min(90vw, 1620px)` with `max-height: 92vh` to preserve room on smaller screens.

2) Transitions (Open/Close)
- Current: No explicit fade/scale animations.
- Figma: Not specified, but a polished modal should fade backdrop and scale/fade dialog.
- Plan:
  - Add CSS transitions:
    - Backdrop: opacity 0 -> 1
    - Dialog: transform: scale(0.98) -> 1 and opacity 0 -> 1
  - Use a mounted class or data attribute on open to enable transitions.

3) Overlay Opacity
- Current: `background: rgba(0,0,0,0.55)`
- Figma: Not explicit; typical is 0.6. 
- Plan:
  - Validate visually against Figma refs; adjust to `rgba(0,0,0,0.6)` if closer.

4) Close Icon Consistency
- Current:
  - Sign In: Custom module icon (`.iconClose`) with circular ring and cross.
  - Sign Up: Uses shared `.icon-close` icon (from `src/styles/common.css`) in markup, but module CSS for the button sets numeric font size fallback.
- Plan:
  - Standardize on shared `.icon-close` primitive for both Sign In and Sign Up.
  - Remove per-module icon drawing to ensure consistent look and single source of truth.

5) Password Eye Icon Consistency
- Current:
  - Sign In: Custom per-module `.iconEye` drawing; pressed state lacks explicit slash overlay, only changes pupil color.
  - Sign Up: Uses shared `.icon-eye` from `common.css` and toggles `icon-eye-slash` on visible.
- Plan:
  - Use shared `.icon-eye` in both.
  - Toggle `icon-eye-slash` when password is visible for a consistent visual per Figma.

6) Accessibility/Behavior
- Focus trapping, ESC close, scroll lock, restore focus on close are present (good).
- `aria-labelledby`/`aria-describedby` provided by App-level modal (good).
- Backdrop click closes (configurable). Good.

## Implementation Plan (Next PR)

- Update `src/components/Modal/Modal.module.css`:
  - `.dialog { width: min(90vw, 1620px); max-height: 92vh; }`
  - Add `opacity` and `transform` transitions for dialog.
  - Add `opacity` transition for `.backdrop`.
- Update `src/components/Modal/Modal.jsx`:
  - Add mounted/open state CSS class or `data-open="true"` to control transitions.
- Update `src/pages/SignIn/SignInPage.jsx` and `.module.css`:
  - Replace per-module eye icon with shared `.icon-eye` + conditional `.icon-eye-slash`.
  - Replace close button inner span with shared `.icon-close` and remove duplicate vector CSS from module.
- Update `src/pages/SignUp/SignUpPage.jsx` and `.module.css`:
  - Ensure close icon uses shared `.icon-close` and remove any fallback text visuals.
  - Ensure password eye uses the same shared icon toggle pattern as Sign In.
- Validate overlay opacity visually and adjust to match Figma screenshot darkness (0.55 vs 0.6).
- Re-test responsiveness and keyboard/a11y.

## Acceptance Criteria

- At desktop widths (≥1440px), the modal’s two-pane layout matches the Figma spacing:
  - Left visual width and right form block spacing (top padding 101px, left 142px) render identically to reference.
- Both Sign In and Sign Up share identical close icon visuals and password-eye toggle visuals.
- Smooth fade/scale transitions present on open/close.
- Overlay darkness matches reference perception.
- Focus trap, ESC and backdrop click behaviors unaffected.

## Notes

- No changes are required to tokens in `src/styles/common.css` at this time (icons present and consistent).
- Routes remain modal-only (no full-page /sign-in or /sign-up), per App-level implementation.
