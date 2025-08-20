# Modal (Sign In / Sign Up) UI Audit vs Figma

Scope: Only popup/modal UIs (Sign In and Sign Up), comparing React implementation under `src/components/Modal` and `src/pages/SignIn|SignUp` against Figma-extracted references:
- `assets/sign-in-page-271-36004.css` and `.html`
- `assets/sign-up-page-screen-2-1816.css` and `.html`
- Tokens/icon primitives from `src/styles/common.css`

Summary of current fix: We locked the modal subtree to Figma tokens and prevented any global theme drift. All backgrounds, typography, icon, button, divider, input, and border colors now map to the single source of truth: `src/styles/common.css`.

1) Theme Isolation for Modals
- Issue: The app’s global theme variables in `src/App.css` could influence modal internals.
- Fix: In `src/components/Modal/Modal.module.css` we:
  - Kept backdrop opacity at rgba(0,0,0,0.6) to match Figma perception.
  - Forced dialog surface to `var(--c-white)` (pure white).
  - Reset app-level theme vars (—bg-primary, etc.) to initial within `.dialog`.
  - Re-declared core design tokens inside the modal to ensure downstream components use Figma tokens (—c-primary #2b293d, —c-accent #ffe047, etc.)

2) Sign In and Sign Up Pane Colors
- Left Pane: Navy background — `var(--c-primary)` (#2b293d), logo ticket and brand text — `var(--c-accent)` (#ffe047), headline text — white.
- Right Pane: `var(--c-white)` background, rounded corners (12px), padding aligns with Figma (top 101px, left 142px).
- “Login” / “Create Account” title: Typography tokens `--typo-159-*` with color `--typo-159-color` (var(--c-text) = #2d2c3c).

3) Buttons and Controls
- Social buttons: White background, border `var(--c-muted-1)` (#a3a3a3), text color `--typo-160-color` (var(--c-text)).
- Primary CTA buttons (“Login”/“Create Account”): Background `var(--c-primary)`, text `var(--c-white)`, dimensions 750x74 with radius `var(--radius-10)`.

4) Inputs and Dividers
- Input wrappers follow shared `input-field` tokens:
  - Border `var(--c-muted-2)` (#828282)
  - Background `var(--c-white)` (#ffffff)
  - Input text matches `--typo-163-*`
- OR separator “OR” text uses `--typo-161-color` (`var(--c-muted-1)`), divider lines use `.hr-line` (`var(--c-gray-2)`).

5) Icons (Consistency)
- Close Icon: Uses shared `.icon-close` with strokes set by `var(--c-muted-4)` (#909090). Both Sign In and Sign Up use the same icon.
- Password Eye: Uses shared `.icon-eye` and `.icon-eye-slash` (pupil/outline and slash color `var(--c-gray-a4)`).
- Google/Facebook icons: Built with shared primitives in `common.css` using brand colors `--c-blue-600`, `--c-blue-400`, etc.

6) Transitions (Open/Close)
- Backdrop and dialog fade/scale already implemented to polish modal behavior.

Acceptance Checklist
- Two-pane modal at desktop widths ≥1440px matches spacing from Figma.
- Both modals share identical close and password-eye visuals.
- Overlay darkness matches 0.6 perceived darkness.
- Focus trap, ESC, backdrop behaviors intact.

Files touched:
- src/components/Modal/Modal.module.css (isolation, backdrop color, dialog background)
- src/pages/SignIn/SignInPage.module.css (token-only colors)
- src/pages/SignUp/SignUpPage.module.css (token-only colors)

Notes
- `src/styles/common.css` remains the source of truth for tokens and icon primitives. No token values changed in this pass.
- Any future theme work must avoid overriding modal subtree tokens to prevent visual drift from Figma.
