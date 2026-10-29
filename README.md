# @orochibraru/ui

Svelte 5 components and the theme shared by OpenCount, LocalAssistant, Homerun,
Sergio's, Nuvio Web and Penombre: the shadcn-svelte primitives (vega style) as
these apps customised them, a handful of app-level blocks, and the oklch theme
they all draw from. One package instead of six drifting copies.

Built for SvelteKit 3, Svelte 5 runes and Tailwind CSS v4.

## Install

```bash
bun add -d @orochibraru/ui
```

It goes in `devDependencies`: the app bundles it, so nothing from it is needed
at runtime next to the compiled server.

## Set up the stylesheet

Import the theme right after Tailwind in the app's root stylesheet:

```css
@import "tailwindcss";
@import "@orochibraru/ui/theme.css";
```

The theme brings the design tokens, the `data-*` state variants the primitives
style with, `tw-animate-css`, and an `@source` that makes Tailwind scan the
package, so no other configuration is needed.

## Use

Every primitive is a subpath, with the same exports shadcn-svelte generates:

```svelte
<script lang="ts">
  import EmptyState from "@orochibraru/ui/blocks/empty-state";
  import { Button } from "@orochibraru/ui/button";
  import * as Dialog from "@orochibraru/ui/dialog";
  import { cn } from "@orochibraru/ui/utils";
</script>
```

Moving an app over is a rewrite of its imports:
`#lib/components/ui/button/index.js` becomes `@orochibraru/ui/button`.

Primitives: accordion, alert, alert-dialog, avatar, badge, breadcrumb, button,
button-group, calendar, card, checkbox, command, context-menu, dialog, drawer,
dropdown-menu, empty, field, input, input-group, input-otp, label, menubar,
pagination, popover, progress, radio-group, range-calendar, resizable,
scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner,
spinner, switch, table, tabs, textarea, toggle, toggle-group, tooltip.

`input` turns password managers off on fields that don't set `autocomplete`, so
a search box never gets a login suggestion.

## Blocks

Under `@orochibraru/ui/blocks/<name>`:

| Block              | What it does                                                                |
| ------------------ | --------------------------------------------------------------------------- |
| `auth-shell`       | Centered sign-in layout: heading, optional `brand` and `footer` snippets.   |
| `copy-field`       | Monospace value with a copy button and a promise toast.                     |
| `document-title`   | `<title>` from the page title, suffixed with `appName`.                     |
| `empty-state`      | Icon, title, subtitle and an action slot for an empty list.                 |
| `error-page`       | Status, message and error id from `page`, with a link to `homeHref`.        |
| `fab`              | Floating action button above the phone tab bar, with a haptic tap.          |
| `icon-button`      | Round icon button with a tooltip that doubles as its accessible name.       |
| `install-prompt`   | One-time PWA install sheet: native prompt, iOS steps or browser menu steps. |
| `nav-cards`        | Phone-only list of a section's tabs as cards: icon, label, description.     |
| `option-group`     | Radio cards for a settings choice, with an icon or a `swatch` snippet each. |
| `responsive-sheet` | A dialog on desktop, a bottom drawer under 768px.                           |
| `setting-switch`   | Labelled switch row for settings forms, posting `name=true` when on.        |
| `stat-card`        | Glass card with an icon, a value and a hint, optionally a link.             |
| `tab-nav`          | Pill tab bar of links, the current page's tab highlighted.                  |
| `tab-section`      | Layout for a tabbed section: tabs on desktop, nav cards on phones.          |
| `theme-picker`     | System, light and dark as radio cards, for an appearance page.              |
| `theme-toggle`     | System, light and dark as a compact icon toggle, for an app bar or menu.    |
| `top-loading-bar`  | Progress bar during SvelteKit navigations, safe-area aware.                 |

Blocks with built-in copy (`copy-field`, `error-page`, `install-prompt`,
`theme-picker`, `theme-toggle`) take a `messages` prop. Its keys override the
English defaults one by one, which is how a French or translated app uses them.
Blocks never set the page title, except `tab-section`, which owns its section's
title: the app calls `setPageTitle` itself.

### Tabbed sections

A tabbed page is one real route per tab, each tab with a description, under a
`tab-section` layout. On phones the index route renders `nav-cards` and each tab
is a page titled by its label, its back button returning to the cards. On
desktop the index replaces itself with the first tab and `tab-nav` shows them
all. The tabs live in one list (`SectionTab[]`, exported by `nav-cards`) that
the layout and the index page share.

### Theme

`theme-picker` and `theme-toggle` call `mode-watcher`'s `setMode`, so the app
mounts `<ModeWatcher />` in its root layout. Both take the saved theme as
`value`, so the server-rendered page checks the right one, and call `onchange`
with the new theme for the app to persist. `theme-picker` also posts as a
`theme` radio field (`name` changes it) inside a form.

`icon-button`, and `copy-field` through it, need a `Tooltip.Provider` above
them, which apps put in their root layout.

## Modules

- `@orochibraru/ui/utils`: `cn` and the shadcn-svelte prop helper types.
- `@orochibraru/ui/toast`: `enhanceToast` and `saveToast` narrate a form action
  through one promise toast, `toastError` turns anything thrown into a message.
  Form updates keep `reset: false` by default so `bind:value` fields survive a
  submit.
- `@orochibraru/ui/page-title`: `providePageTitle` once in the root layout,
  `setPageTitle` in pages, `usePageTitle` in app bars.
- `@orochibraru/ui/appearance`: `applyAppearance` and `appearanceBootScript`
  apply a saved accent, theme, dark variant, font and corner style to `<html>`,
  the boot script before first paint.
- `@orochibraru/ui/haptics`: `haptic("tap" | "success" | "error")`, a no-op
  where vibration isn't supported.

## Theming

Colours derive from two variables, so an app usually overrides only these after
importing the theme:

```css
:root {
  --hue: 8;
  --primary-chroma: 0.15;
}
```

On `<html>`:

- `class="dark"` switches to the dark palette, `data-dark-variant="amoled"`
  makes it pure black.
- `data-accent` picks a preset: `bordeaux`, `green`, `blue`, `violet`, `rose`,
  `orange`, `amber`, `cyan` or `neutral`.
- `data-font` (`system`, `serif`, `mono`) and `data-corners="square"` change the
  type and the radius.

`class="aurora"` on `<body>` adds the drifting gradient background. It is opt-in
so apps with a flat look don't get it.

The theme also defines the `glass`, `glow`, `no-scrollbar` and `tabular`
utilities, the `standalone` variant for installed PWAs, `safe-*` spacing for
notches, the toast styling and the page transitions on phones. Fonts are left to
each app: set `--app-font` and `--display-font`.

## Develop

```bash
bun install
bun run dev
```

The dev server shows every primitive and block on one page, with an accent and
dark mode switch. `bun run check`, `bun run test` and `bun run build` are the
gates; `build` packages `dist/` and runs publint.

New upstream components come from the shadcn-svelte CLI (`components.json` is
set up), followed by `node_modules/.bin/tailwint --fix` on the new files. The
CLI overwrites any customised primitive a new one depends on (drawer, input and
sonner carry the apps' changes): copy those aside before `add --overwrite` and
put them back after.

Dependencies use caret ranges, unlike the apps' exact pins, so a consuming app
dedupes `bits-ui` and friends with its own copy instead of bundling two.
