# Project file index (generated 2026-01-14)

This file lists project files and a one-line description for each. Use this as a reference when navigating the repository.

---

## Top-level files

- `package.json` — npm metadata, scripts (`start`, `build`, `serve`, `lint`) and dependencies.
- `README.md` — project overview and quick start instructions (CoreUI template documentation).
- `vite.config.mjs` — Vite configuration (alias `src/`, build outDir `build`, autoprefixer).
- `index.html` — HTML entry template; loads `/src/index.js`.
- `LICENSE` — MIT license for the project.
- `eslint.config.mjs` — ESLint configuration (React + Prettier rules).
- `.prettierrc.js` — Prettier config.
- `.prettierignore` — files ignored by Prettier.
- `.gitignore` — files ignored by git.
- `.editorconfig` — editor settings.
- `.browserslistrc` — supported browsers list.

## Public

- `public/manifest.json` — web app manifest.
- `public/favicon.ico` — favicon.

## src (app source)

- `src/index.js` — React entry point; sets up store and renders `<App />`.
- `src/App.js` — top-level routing and Suspense boundaries (Login/Register/Error pages + DefaultLayout).
- `src/routes.js` — lazily loads many view components and defines route metadata.
- `src/_nav.js` — (template) navigation config (if present in template).

### src/app

- `src/app/store.js` — simple Redux store using `legacy_createStore` and a generic `{ type: 'set' }` reducer.
- `src/app/rootReducer.js` — empty placeholder (exists but currently empty).
- `src/app/constants.js` — app-level constants (small set of constants used by app).

### src/layout

- `src/layout/DefaultLayout.js` — main app layout composing sidebar, header, content, and footer.
- `src/layout/AppHeader.js` — header component with hamburger, actions, color/theme controls and breadcrumb.
- `src/layout/AppSidebar.js` — sidebar component with logo, search, navigation, docking behavior.
- `src/layout/AppBreadcrumb.js` — breadcrumb component used in header.

### src/components

- `src/components/index.js` — re-exports commonly used components (AppHeader, AppFooter, AppSidebar, etc.).
- `src/components/AppContent.js` — renders application `Routes` from `src/routes/routes.arp` (wrapper with Suspense).
- `src/components/AppFooter.js` — footer component.
- `src/components/AppSidebarNav.js` — sidebar navigation renderer (wraps CoreUI nav with SimpleBar).
- `src/components/AppSidebarNav.js` — (same as above) navigation rendering utility.
- `src/components/Docs*` — `DocsComponents.js`, `DocsExample.js`, `DocsIcons.js`, `DocsLink.js` — documentation helpers / examples for template.
- `src/components/header/AppHeaderDropdown.js` — user dropdown used in header.

### src/components/common

- `ArpButton.jsx` — custom button wrapper component.
- `ArpIconButton.jsx` — icon button wrapper.
- `CardShell.jsx` — small card wrapper component.
- `ConfirmDialog.jsx` — confirmation dialog component.
- `DataTable.jsx` — data table wrapper component.
- `FormRow.jsx` — form layout row helper.
- `IconCircleButton.jsx` — circular icon button.
- `Loading.jsx` — loading spinner component.
- `PageHeader.jsx` — page header component used in views.

### src/navigation

- `src/navigation/nav.arp.js` — ARP-specific navigation tree (major feature groups, many CNavGroup items).
- `src/navigation/nav.coreui.js` — example CoreUI demo navigation configuration.

### src/routes

- `src/routes/routes.arp.js` — ARP-specific route definitions (the routes used by `AppContent`).
- `src/routes/routes.public.js` — public route definitions (if any).

### src/views

- `src/views/dashboard/Dashboard.js` — dashboard view with charts, widgets, sample table.
- `src/views/dashboard/MainChart.js` — main chart used on dashboard.

- `src/views/widgets/*` — widgets (e.g., `Widgets.js`, `WidgetsBrand.js`, `WidgetsDropdown.js`) used in dashboard.

- `src/views/*` (many CoreUI example views) — typical template views including base components (`accordion`, `breadcrumbs`, `cards`, `tables`, ...), forms (`checks-radios`, `floating-labels`, `form-control`, `input-group`, ...), buttons, icons, charts, notifications (alerts, badges, modals, toasts), theme (colors, typography), and pages (`login`, `register`, `page404`, `page500`).

- `src/views/setup/Institution.js` — Setup view for institution (template page present).
- `src/views/setup/Department.js` — Setup view for department.
- `src/views/setup/Programmes.js` — Setup view for programmes.
- `src/views/setup/AcademicYearConfiguration.js` — Academic year configuration UI.

### src/features/setup

- `src/features/setup/pages/InstitutionPage.jsx` — page for institution setup (currently **empty placeholder**).
- `src/features/setup/pages/TestCommonComponents.jsx` — test page for components (example).
- `src/features/setup/components/InstitutionForm.jsx` — institution form component (**empty placeholder**).
- `src/features/setup/services/SetupApi.js` — service wrapper for setup APIs (**empty placeholder**).
- `src/features/setup/services/SetupSlice.js` — redux slice for setup feature (**empty placeholder**).

### src/services

- `src/services/https.js` — intended http/axios wrapper (**empty placeholder**).
- `src/services/endpoints.js` — API endpoints module (**empty placeholder**).

### src/assets

- `src/assets/brand/logo.js` and `sygnet.js` — brand SVGs used in header/sidebar.
- `src/assets/brand/company-logo.png`, `company-sygnet.png` — brand images.
- `src/assets/images/*` — images used by template (avatars, angular/react/vue icons, etc.).

### src/scss

- `src/scss/style.scss` — main styling.
- `src/scss/examples.scss` — sample styling for examples (remove in production if desired).
- `src/scss/_arp_sidebar.scss` — custom sidebar styles.
- `src/scss/vendors/simplebar.scss` — vendor styles for SimpleBar.

## .github

- `.github/` — CI workflows and contributor docs (workflows `npm.yml`, `stale.yml`, and templates for issues/PRs).

## Observations & notes

- Several files are empty placeholders that appear ready for implementation: `src/app/rootReducer.js`, `src/services/https.js`, `src/services/endpoints.js`, many `src/features/setup/*` files.
- Routing and navigation are configured; many UI views are present and will render using CoreUI components.
- Store is small and works with a simple "set" action pattern; can be extended or replaced with Redux Toolkit if desired.

---

If you'd like, I can:

- produce a full flat list of every file (one-per-line) as a separate file, or
- open and add short comments inside empty placeholders such as `https.js` and `rootReducer.js`, or
- generate a prioritized task list for filling in the empty modules.

Tell me which of the follow-ups you want (or provide another task number).