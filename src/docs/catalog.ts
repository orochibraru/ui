export type Group = "blocks" | "components" | "primitives" | "modules";

export const categories = [
	"Actions",
	"Forms",
	"Navigation",
	"Overlays",
	"Feedback",
	"Display",
	"Charts",
	"Layout",
	"Appearance",
	"Media",
	"Utilities",
	"Server",
] as const;

export type Category = (typeof categories)[number];

export interface CatalogDoc {
	slug: string;
	name: string;
	description: string;
	category: Category;
}

function docs(
	entries: Record<string, [category: Category, description: string]>,
): CatalogDoc[] {
	return Object.entries(entries)
		.toSorted(([a], [b]) => a.localeCompare(b))
		.map(([slug, [category, description]]) => ({
			slug,
			name: slug.charAt(0).toUpperCase() + slug.slice(1).replaceAll("-", " "),
			description,
			category,
		}));
}

/** Every documented block, primitive and module, without anything that needs Svelte or Vite, so the MCP server can bundle it. */
export const catalog: Record<
	Group,
	{ label: string; description: string; docs: CatalogDoc[] }
> = {
	blocks: {
		label: "Blocks",
		description: "App-level pieces the apps shared copies of.",
		docs: docs({
			"accent-toggle": [
				"Appearance",
				"The accent presets: a swatch strip on desktop, labelled rows on phones.",
			],
			"auth-shell": [
				"Layout",
				"Centered sign-in layout: heading, optional brand and footer.",
			],
			"bottom-nav": [
				"Navigation",
				"The phone tab bar: top-level destinations, the current one lit.",
			],
			"command-palette": [
				"Overlays",
				"A ⌘K search over pages and actions: a dialog on desktop, a tall drawer on phones.",
			],
			"copy-field": [
				"Forms",
				"Monospace value with a copy button and a promise toast.",
			],
			"document-title": [
				"Layout",
				"The tab's <title> from the page title, suffixed with the app.",
			],
			"empty-state": [
				"Feedback",
				"Icon, title, subtitle and an action for an empty list.",
			],
			"error-page": [
				"Layout",
				"Status, message and error id, with a link back home.",
			],
			fab: [
				"Actions",
				"Floating action button above the phone tab bar, with a haptic tap.",
			],
			"icon-button": [
				"Actions",
				"Round icon button whose tooltip is its accessible name.",
			],
			"install-prompt": [
				"Overlays",
				"One-time PWA install sheet: native prompt or the steps.",
			],
			"music-player": [
				"Media",
				"An audio player bar with a queue: play, skip, seek and volume.",
			],
			"nav-cards": [
				"Navigation",
				"Phone-only list of a section's tabs as cards.",
			],
			"new-password-fields": [
				"Forms",
				"New password with a reveal button, a strength meter and the rules it must pass.",
			],
			"option-group": [
				"Forms",
				"Radio cards for a settings choice, each with an icon or swatch.",
			],
			"otp-field": [
				"Forms",
				"A one-time code: digits only, autofilled from SMS, posted as one field.",
			],
			"password-input": [
				"Forms",
				"A password field with a button to reveal what was typed.",
			],
			"responsive-sheet": [
				"Overlays",
				"A dialog on desktop, a bottom drawer on phones.",
			],
			"setting-switch": ["Forms", "Labelled switch row for settings forms."],
			"stat-card": [
				"Display",
				"Glass card with an icon, a value and a hint, optionally a link.",
			],
			stepper: [
				"Navigation",
				"A multi-step flow: labelled markers on desktop, a progress bar and the current step on phones.",
			],
			"tab-nav": [
				"Navigation",
				"Pill tab bar of links, the current page's tab highlighted.",
			],
			"tab-section": [
				"Navigation",
				"Tabbed section layout: tabs on desktop, nav cards on phones.",
			],
			"time-range-picker": [
				"Charts",
				"Time range presets, plus a custom range in a calendar popover or a phone drawer.",
			],
			"time-series-chart": [
				"Charts",
				"Line, area or bar chart over time: axes, readout, touch scrubbing and a data table.",
			],
			"theme-picker": ["Appearance", "System, light and dark as radio cards."],
			"theme-toggle": [
				"Appearance",
				"System, light and dark: an icon strip on desktop, three rows on phones.",
			],
			"top-loading-bar": [
				"Feedback",
				"Progress bar during SvelteKit navigations.",
			],
			"video-player": [
				"Media",
				"A video player: scrubbing, chapters, subtitles, speed, fullscreen, gestures and shortcuts.",
			],
		}),
	},
	components: {
		label: "Components",
		description:
			"One import, data in: the everyday controls without assembling primitives.",
		docs: docs({
			"file-dropzone": [
				"Forms",
				"Drop or pick files, folders too: type and size limits, a list to review, posted with the form.",
			],
			breadcrumbs: [
				"Navigation",
				"A trail of pages from an array, collapsing the middle into a menu on phones.",
			],
			"confirm-dialog": [
				"Overlays",
				"Ask before acting: waits on an async confirm, a drawer on phones.",
			],
			menu: [
				"Overlays",
				"Actions from an array: a dropdown on desktop, a drawer of big rows on phones.",
			],
			pagination: [
				"Navigation",
				"Page numbers from a total and a page size, prev and next on phones.",
			],
			tabs: [
				"Navigation",
				"Tabs from an array, scrolling sideways when they run out of room.",
			],
			form: [
				"Forms",
				"Fields from an array, laid out and posted to a form action, with errors under each field.",
			],
			checkbox: [
				"Forms",
				"One checkbox with its label and description, the whole row tappable.",
			],
			"checkbox-list": [
				"Forms",
				"Options in, a labelled group of checkboxes out, posting every checked value.",
			],
			"radio-list": [
				"Forms",
				"Pick one option from a list or from cards, with a legend and errors.",
			],
			"segmented-control": [
				"Forms",
				"A single choice as equal segments that fold to icons when space runs out.",
			],
			switch: ["Forms", "A labelled switch row that posts true when on."],
			accordion: [
				"Display",
				"Questions and answers from an array: plain text or a snippet per item.",
			],
			"avatar-group": [
				"Display",
				"Overlapping avatars with initials, a +N count and names in tooltips.",
			],
			"bar-list": [
				"Charts",
				"A ranked list with proportional bars, links and a show-more toggle.",
			],
			"data-table": [
				"Display",
				"Columns and rows in, a sortable table out: cards on phones, links per row.",
			],
			"date-field": [
				"Forms",
				"A date with its label: calendar in a popover, a drawer on phones, ISO value.",
			],
			select: [
				"Forms",
				"Options in, a labelled select out: searchable, and a drawer on phones.",
			],
			"status-badge": [
				"Feedback",
				"A status pill with a tone, a dot and an optional pulse for live states.",
			],
			textarea: [
				"Forms",
				"A multi-line field with its label, error and an optional character counter.",
			],
			input: [
				"Forms",
				"A text field with its label, description and error in one: passwords get a reveal button.",
			],
		}),
	},
	primitives: {
		label: "Primitives",
		description: "The shadcn-svelte components, as the apps customised them.",
		docs: docs({
			accordion: [
				"Display",
				"Stacked sections that expand one or several at a time.",
			],
			alert: ["Feedback", "A callout for something the reader should notice."],
			"alert-dialog": [
				"Overlays",
				"A modal that asks to confirm before something drastic.",
			],
			avatar: ["Display", "A user's picture, falling back to initials."],
			badge: ["Display", "A small label for a status or a count."],
			breadcrumb: ["Navigation", "The path from the root to the current page."],
			button: ["Actions", "Every button variant and size."],
			"button-group": ["Actions", "Buttons joined into one control."],
			calendar: ["Forms", "A month grid to pick a date."],
			card: ["Display", "A surface with a header, content and footer."],
			checkbox: ["Forms", "A checkbox, with a label through Field."],
			command: [
				"Overlays",
				"A searchable list of commands, also as a palette.",
			],
			"context-menu": ["Overlays", "A menu on right click or long press."],
			dialog: ["Overlays", "A modal window over the page."],
			drawer: [
				"Overlays",
				"A panel sliding up from the bottom, made for phones.",
			],
			"dropdown-menu": ["Overlays", "A menu opened from a button."],
			empty: ["Feedback", "The parts of an empty state, to compose your own."],
			field: [
				"Forms",
				"Label, control, description and error, laid out together.",
			],
			input: [
				"Forms",
				"A text input; password managers stay off unless asked.",
			],
			"input-group": ["Forms", "An input with addons: icons, text or buttons."],
			"input-otp": ["Forms", "One box per digit for a one-time code."],
			label: ["Forms", "A label for a form control."],
			menubar: ["Navigation", "A desktop-style bar of menus."],
			pagination: ["Navigation", "Links to the pages of a long list."],
			popover: ["Overlays", "Floating content anchored to a trigger."],
			progress: ["Feedback", "How far along something is."],
			"radio-group": ["Forms", "Pick one of a few options."],
			"range-calendar": [
				"Forms",
				"A month grid to pick a start and an end date.",
			],
			resizable: ["Layout", "Panes split by a draggable handle."],
			"scroll-area": ["Layout", "A scrolling box with a styled scrollbar."],
			select: ["Forms", "Pick one option from a list."],
			separator: ["Layout", "A line between groups of content."],
			sheet: ["Overlays", "A panel sliding in from a side of the screen."],
			sidebar: [
				"Navigation",
				"The app sidebar: groups, menus, collapsing to icons.",
			],
			skeleton: ["Feedback", "Placeholder shapes while content loads."],
			slider: ["Forms", "Pick a value or a range by dragging."],
			sonner: ["Feedback", "Toasts, styled by the theme."],
			spinner: ["Feedback", "An indeterminate loading indicator."],
			switch: ["Forms", "An on or off toggle."],
			table: ["Display", "Rows and columns of data."],
			tabs: [
				"Navigation",
				"In-page tabs that switch panels without navigating.",
			],
			textarea: ["Forms", "A multi-line text input."],
			toggle: ["Actions", "A button that stays pressed."],
			"toggle-group": ["Actions", "Toggles where one or several stay pressed."],
			tooltip: ["Overlays", "A hint on hover or focus."],
		}),
	},
	modules: {
		label: "Modules",
		description:
			"Helpers for toasts, titles, appearance and haptics, and the server side: logs, traces and hooks.",
		docs: docs({
			hooks: [
				"Server",
				"SvelteKit hooks: one log line per request, and unexpected errors logged, traced and given an id.",
			],
			logger: [
				"Server",
				"Scoped server logs as coloured text or JSON lines that carry the active trace id.",
			],
			telemetry: [
				"Server",
				"OpenTelemetry tracing over OTLP, with SvelteKit's own handle, load and action spans.",
			],
			appearance: [
				"Appearance",
				"Apply a saved accent, theme, font and corners to <html>.",
			],
			haptics: ["Feedback", "A short vibration on tap, success or error."],
			"page-title": [
				"Layout",
				"One page title for the app bar, the header and the tab.",
			],
			password: [
				"Forms",
				"The password rules and strength score, for the form and the server alike.",
			],
			toast: ["Feedback", "Narrate a form action through one promise toast."],
			utils: [
				"Utilities",
				"cn to merge Tailwind classes, and the prop helper types.",
			],
		}),
	},
};

export function isGroup(value: string): value is Group {
	return Object.hasOwn(catalog, value);
}

/** Docs whose look on a phone is the point, so their page shows them in a phone frame too. */
export const phoneFirst = new Set([
	"components/file-dropzone",
	"blocks/top-loading-bar",
	"blocks/install-prompt",
	"blocks/error-page",
	"primitives/tabs",
	"primitives/range-calendar",
	"primitives/input-otp",
	"primitives/calendar",
	"components/textarea",
	"components/switch",
	"components/radio-list",
	"components/input",
	"components/checkbox-list",
	"components/checkbox",
	"components/bar-list",
	"components/accordion",
	"blocks/theme-picker",
	"blocks/tab-section",
	"blocks/tab-nav",
	"blocks/stat-card",
	"blocks/setting-switch",
	"blocks/password-input",
	"blocks/option-group",
	"blocks/bottom-nav",
	"blocks/auth-shell",
	"blocks/accent-toggle",
	"blocks/command-palette",
	"blocks/fab",
	"blocks/music-player",
	"blocks/nav-cards",
	"blocks/new-password-fields",
	"blocks/otp-field",
	"blocks/responsive-sheet",
	"blocks/stepper",
	"blocks/theme-toggle",
	"blocks/time-range-picker",
	"blocks/time-series-chart",
	"blocks/video-player",
	"components/breadcrumbs",
	"components/confirm-dialog",
	"components/data-table",
	"components/date-field",
	"components/form",
	"components/menu",
	"components/pagination",
	"components/segmented-control",
	"components/select",
	"components/tabs",
	"primitives/drawer",
	"primitives/sheet",
]);

/** Phone-first docs best seen with the phone turned sideways, so their frame starts in landscape. */
export const phoneLandscape = new Set(["blocks/video-player"]);
