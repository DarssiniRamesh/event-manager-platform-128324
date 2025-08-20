# UI Audit and Integration Plan

This document captures the audit of the current React codebase against the Figma-extracted assets and lists the issues, risks, and the remediation plan to consolidate all screens into a single, coherent application.

## Scope
- Home
- Sign In
- Sign Up
- Select Interests

## Summary of Issues
- Duplicate component files (.js wrappers and .jsx) leading to overwrite risks.
- Fixed-width (1920px) and absolute-positioned sections; non-responsive layouts.
- Parallel common CSS definitions (assets/common.css vs src/styles/common.css). Only `src/styles/common.css` is used by the app; `assets/` are references.
- App test asserts "learn react" (boilerplate) which doesn't exist.
- Theme toggle in App.css not aligned with page tokens (potential conflicts).
- Header tabs and many anchors are non-functional (#) while App.js has a separate dev nav; inconsistent navigation experience.
- Footer duplicated across pages instead of shared component.
- Icons (Google/Facebook/password eye) have inconsistent implementations between Sign In and Sign Up.
- Visual drift from Figma on any viewport != 1920 due to rigid layout.

## File Overwrites and Redundancies
- Each page directory has:
  - Component.jsx
  - Component.js (simple re-export)
  - index.js (re-export)
- This increases the chance of overwriting the wrong file during updates.

## Visual Drift from Figma
- Pixel-approximate at 1920px but drifts due to fixed canvas assumptions and absolute positioning.
- Headers and footers are visually close but do not provide real navigation.
- Icon implementations differ from asset examples.

## Remediation Plan (Prioritized)
1. Shared Layout
   - Create `src/components/Header/Header.jsx` and `src/components/Footer/Footer.jsx` with CSS Modules.
   - Replace per-page header/footer with shared components rendered from `App.js`. All pages MUST NOT render their own header/footer.

2. Responsive Layout
   - Replace `width: 1920px`/absolute blocks with:
     - a centered container `.container { max-width: 1200-1440-1920px; margin: 0 auto; padding: 0 24px; }`
     - stacked sections (flow layout) and CSS grid for cards.
   - Maintain Figma spacing for desktop; add fallbacks for smaller screens.

3. Navigation
   - Use `react-router-dom` Links in Header to navigate to:
     - `/` Home
     - `/events` (placeholder)
     - `/about` (placeholder)
     - `/contact` (placeholder)
     - `/sign-in`
     - `/sign-up`
     - `/create-event` (placeholder)
   - Highlight active tab via `NavLink` and `aria-current="page"`.

4. Consolidate Tokens
   - Keep `src/styles/common.css` as single source.
   - Map any missing tokens from assets into this file if needed.
   - Align icon styles across Sign In/Up.

5. Remove Duplicates
   - Remove Component.js wrappers and keep `Component.jsx` + `index.js` only.

6. Testing
   - Update `src/App.test.js` to test for a consistent element (e.g., "Eventify" header brand or navigation links).

7. Theming
   - Temporarily hide or constrain theme toggle to avoid token conflicts.
   - Future: Integrate tokens with theme variables.

8. Accessibility
   - Ensure semantic tags and aria-* attributes are consistent.
   - Avoid dead `href="#"` anchors; use `<button>` or `<Link>` as appropriate.

## Next Steps (Implementation)
- Implement Header/Footer components and integrate across pages.
- Refactor HomePage.module.css and others to responsive layout.
- Replace dead anchors with Links and NavLinks.
- Remove duplicate entry files.
- Update tests.

This report is intended to guide the next implementation PR to unify and fix all UI issues for a single-application experience.
