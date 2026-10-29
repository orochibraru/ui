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

## Components

Under `@orochibraru/ui/components/<name>`: one import, data in. Where a
primitive is assembled from parts, a component takes an array or an object and
renders the whole thing, phones included.

```svelte
<script lang="ts">
  import Input from "@orochibraru/ui/components/input";
</script>

<Input label="Email" name="email" type="email" required bind:value={email} />
```

Every form component takes the same field props: `name`, `label`, `description`,
`error` (a string or the array a form action returns), `required`, `disabled`,
`id` and a bindable `value` (`checked` for `checkbox` and `switch`, `files` for
`file-dropzone`). The label, the description or the error, and the ARIA wiring
between them come with it.

`form` renders them from an array and posts to a form action. A failed action
that returns `fail(400, { errors: { field: ["message"] } })` puts each message
under its field; a toast narrates the submit:

```svelte
<Form
  action="?/create"
  fields={[
    { name: "name", label: "Project name", required: true },
    { name: "role", type: "select", label: "Role", options: roles },
    { name: "notify", type: "switch", label: "Notify the team" },
  ]}
  messages={{ submit: "Create project", success: "Project created." }}
/>
```

| Component           | What it does                                                                                   |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| `accordion`         | Questions and answers from an array: plain text or a snippet per item.                         |
| `avatar-group`      | Overlapping avatars with initials, a +N count and names in tooltips.                           |
| `bar-list`          | A ranked list with proportional bars, links and a show-more toggle.                            |
| `breadcrumbs`       | A trail of pages from an array, collapsing the middle into a menu on phones.                   |
| `checkbox`          | One checkbox with its label and description, the whole row tappable.                           |
| `checkbox-list`     | Options in, a labelled group of checkboxes out, posting every checked value.                   |
| `confirm-dialog`    | Ask before acting: waits on an async confirm, a drawer on phones.                              |
| `data-table`        | Columns and rows in, a sortable table out: cards on phones, links per row.                     |
| `date-field`        | A date with its label: calendar in a popover, a drawer on phones, ISO value.                   |
| `file-dropzone`     | Drop or pick files, folders too: type and size limits, a list to review, posted with the form. |
| `form`              | Fields from an array, laid out and posted to a form action, with errors under each field.      |
| `input`             | A text field with its label, description and error in one: passwords get a reveal button.      |
| `menu`              | Actions from an array: a dropdown on desktop, a drawer of big rows on phones.                  |
| `pagination`        | Page numbers from a total and a page size, prev and next on phones.                            |
| `radio-list`        | Pick one option from a list or from cards, with a legend and errors.                           |
| `segmented-control` | A single choice as equal segments that fold to icons when space runs out.                      |
| `select`            | Options in, a labelled select out: searchable, and a drawer on phones.                         |
| `status-badge`      | A status pill with a tone, a dot and an optional pulse for live states.                        |
| `switch`            | A labelled switch row that posts true when on.                                                 |
| `tabs`              | Tabs from an array, scrolling sideways when they run out of room.                              |
| `textarea`          | A multi-line field with its label, error and an optional character counter.                    |

## Blocks

Under `@orochibraru/ui/blocks/<name>`:

| Block                 | What it does                                                                  |
| --------------------- | ----------------------------------------------------------------------------- |
| `accent-toggle`       | The accent presets: swatch strip on desktop, labelled rows on phones.         |
| `auth-shell`          | Centered sign-in layout: heading, optional `brand` and `footer` snippets.     |
| `bottom-nav`          | Phone tab bar of top-level destinations, the current one lit.                 |
| `command-palette`     | ⌘K search over pages and actions: dialog on desktop, tall drawer on phones.   |
| `copy-field`          | Monospace value with a copy button and a promise toast.                       |
| `document-title`      | `<title>` from the page title, suffixed with `appName`.                       |
| `empty-state`         | Icon, title, subtitle and an action slot for an empty list.                   |
| `error-page`          | Status, message and error id from `page`, with a link to `homeHref`.          |
| `fab`                 | Floating action button above the phone tab bar, with a haptic tap.            |
| `icon-button`         | Round icon button with a tooltip that doubles as its accessible name.         |
| `install-prompt`      | One-time PWA install sheet: native prompt, iOS steps or browser menu steps.   |
| `music-player`        | Audio bar with a queue: play, skip, seek, volume; positioning is the app's.   |
| `nav-cards`           | Phone-only list of a section's tabs as cards: icon, label, description.       |
| `new-password-fields` | New password and its confirmation: reveal, strength meter, rules.             |
| `option-group`        | Radio cards for a settings choice, with an icon or a `swatch` snippet each.   |
| `otp-field`           | One-time code: digits only, SMS autofill, posted as one `code` field.         |
| `password-input`      | Password field with a button to reveal it.                                    |
| `responsive-sheet`    | A dialog on desktop, a bottom drawer under 768px.                             |
| `setting-switch`      | Labelled switch row for settings forms, posting `name=true` when on.          |
| `stat-card`           | Glass card with an icon, a value and a hint, optionally a link.               |
| `stepper`             | Multi-step flow: markers on desktop, progress bar and current step on phones. |
| `tab-nav`             | Pill tab bar of links, the current page's tab highlighted.                    |
| `tab-section`         | Layout for a tabbed section: tabs on desktop, nav cards on phones.            |
| `theme-picker`        | System, light and dark as radio cards, for an appearance page.                |
| `theme-toggle`        | System, light and dark: icon strip on desktop, three rows on phones.          |
| `top-loading-bar`     | Progress bar during SvelteKit navigations, safe-area aware.                   |
| `video-player`        | Video with scrubbing, chapters, subtitles, speed, fullscreen, gestures, keys. |

Blocks with built-in copy (`accent-toggle`, `copy-field`, `error-page`,
`install-prompt`, `new-password-fields`, `password-input`, `theme-picker`,
`theme-toggle`) take a `messages` prop. Its keys override the English defaults
one by one, which is how a French or translated app uses them. Blocks never set
the page title, except `tab-section`, which owns its section's title: the app
calls `setPageTitle` itself.

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
- `@orochibraru/ui/password`: `passwordRules` and `passwordScore`, the rules a
  new password must pass and a 0 to 4 strength, the same on the form and the
  server. `new-password-fields` renders them; `ruleLabels` translates them.
- `@orochibraru/ui/server/logger`: `Logger` writes scoped lines as coloured text
  or JSON lines (`LOG_FORMAT=json`) at `LOG_LEVEL` or above; `configureLogging`
  sets both in code. JSON lines carry the active trace and span ids.
- `@orochibraru/ui/server/telemetry`: `Telemetry` starts OpenTelemetry tracing
  over OTLP from `instrumentation.server.ts`; with `tracing: { server: true }`
  in the kit options, SvelteKit's own spans go with it. Its SDK packages are
  optional peer dependencies, installed only by apps that trace.
- `@orochibraru/ui/server/hooks`: `requestLog` logs one line per request and
  `unexpectedErrors` logs a crash, records it on the span and returns its trace
  id as the error id.
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
- Bordeaux is the default. `data-accent` picks a preset: `bordeaux`, `green`,
  `blue`, `violet`, `rose`, `orange`, `amber`, `cyan` or `neutral`.
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

The dev server is the docs site: a page per block, component and module, with
the component live and the code that renders it. That code is the example file
itself, its `#lib` imports rewritten to the package subpaths, so the two can't
drift apart. A file named `<slug>.<name>` next to an example is a companion,
shown after it: the layout, action or page an app needs for what the preview
can't hold. An example without a script is a note for the preview only.

Components built mostly for phones (drawers, steppers, cards, the media players)
also show on their page inside an iPhone or Android frame: an iframe of a bare
preview route at the device's real width, so phone layouts and drawers behave as
they would on the device.

The primitives are shadcn-svelte's components, so the site links to its docs
instead of repeating them; llms.txt and the MCP server still carry their usage
code. The privacy page lists what the site stores and loads, and the credits.

Every component page can be copied as Markdown, viewed as Markdown, exported as
a PDF (through the browser's print dialog, in the light theme), or opened in
Claude or ChatGPT. The list pages filter by category.

The `Dockerfile` deploys the docs site: `bun run build:docs` compiles it to one
Bun binary that serves on port 3000 and reads `x-forwarded-proto` and
`x-forwarded-host`, so llms.txt links point at the public URL behind a proxy.

`bun run check`, `bun run test` and `bun run build` are the gates; `build`
packages `dist/` and runs publint.

New upstream components come from the shadcn-svelte CLI (`components.json` is
set up), followed by `node_modules/.bin/tailwint --fix` on the new files. The
CLI overwrites any customised primitive a new one depends on (drawer, input and
sonner carry the apps' changes): copy those aside before `add --overwrite` and
put them back after.

Dependencies use caret ranges, unlike the apps' exact pins, so a consuming app
dedupes `bits-ui` and friends with its own copy instead of bundling two.

## MCP server

The package ships an MCP server with the docs and every example's code bundled
in, so an editor's assistant can list, search and read the components without
the docs site. It runs over stdio from the package's `bin`:

```bash
claude mcp add orochibraru-ui -- npx -y @orochibraru/ui
```

Cursor, VS Code and other clients take the same command:

```json
{
  "mcpServers": {
    "orochibraru-ui": { "command": "npx", "args": ["-y", "@orochibraru/ui"] }
  }
}
```

Its tools are `get_setup` (this README), `list_components` (by group or
category), `search_components` and `get_component` (the description, import path
and usage code). `bun run build` bundles it with its content, so it needs no
dependency at runtime. The docs site serves the same server over streamable HTTP
at `/mcp`, plus `/llms.txt`, `/llms-full.txt` and a Markdown page per component
at `/<group>/<slug>.md`.
