import { resolve } from "$app/paths";
import AppWindowIcon from "@lucide/svelte/icons/app-window";
import ArrowUpFromLineIcon from "@lucide/svelte/icons/arrow-up-from-line";
import AsteriskIcon from "@lucide/svelte/icons/asterisk";
import BellIcon from "@lucide/svelte/icons/bell";
import BetweenHorizontalStartIcon from "@lucide/svelte/icons/between-horizontal-start";
import BlocksIcon from "@lucide/svelte/icons/blocks";
import BoldIcon from "@lucide/svelte/icons/bold";
import BracesIcon from "@lucide/svelte/icons/braces";
import CalendarIcon from "@lucide/svelte/icons/calendar";
import CalendarRangeIcon from "@lucide/svelte/icons/calendar-range";
import ChartNoAxesColumnIcon from "@lucide/svelte/icons/chart-no-axes-column";
import ChevronsRightIcon from "@lucide/svelte/icons/chevrons-right";
import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
import CircleAlertIcon from "@lucide/svelte/icons/circle-alert";
import CircleDotIcon from "@lucide/svelte/icons/circle-dot";
import CirclePlusIcon from "@lucide/svelte/icons/circle-plus";
import CircleUserRoundIcon from "@lucide/svelte/icons/circle-user-round";
import CommandIcon from "@lucide/svelte/icons/command";
import ComponentIcon from "@lucide/svelte/icons/component";
import CopyIcon from "@lucide/svelte/icons/copy";
import DownloadIcon from "@lucide/svelte/icons/download";
import EllipsisIcon from "@lucide/svelte/icons/ellipsis";
import FileTextIcon from "@lucide/svelte/icons/file-text";
import GaugeIcon from "@lucide/svelte/icons/gauge";
import GripVerticalIcon from "@lucide/svelte/icons/grip-vertical";
import GroupIcon from "@lucide/svelte/icons/group";
import HashIcon from "@lucide/svelte/icons/hash";
import Heading1Icon from "@lucide/svelte/icons/heading-1";
import HouseIcon from "@lucide/svelte/icons/house";
import InboxIcon from "@lucide/svelte/icons/inbox";
import KeyRoundIcon from "@lucide/svelte/icons/key-round";
import LayersIcon from "@lucide/svelte/icons/layers";
import LayoutListIcon from "@lucide/svelte/icons/layout-list";
import LayoutPanelTopIcon from "@lucide/svelte/icons/layout-panel-top";
import ListIcon from "@lucide/svelte/icons/list";
import ListChecksIcon from "@lucide/svelte/icons/list-checks";
import LoaderIcon from "@lucide/svelte/icons/loader";
import LoaderCircleIcon from "@lucide/svelte/icons/loader-circle";
import LockKeyholeIcon from "@lucide/svelte/icons/lock-keyhole";
import LogInIcon from "@lucide/svelte/icons/log-in";
import MenuIcon from "@lucide/svelte/icons/menu";
import MessageCircleIcon from "@lucide/svelte/icons/message-circle";
import MessageSquareIcon from "@lucide/svelte/icons/message-square";
import MessageSquareTextIcon from "@lucide/svelte/icons/message-square-text";
import MessageSquareWarningIcon from "@lucide/svelte/icons/message-square-warning";
import MousePointerClickIcon from "@lucide/svelte/icons/mouse-pointer-click";
import NotepadTextIcon from "@lucide/svelte/icons/notepad-text";
import PackageOpenIcon from "@lucide/svelte/icons/package-open";
import PaintBucketIcon from "@lucide/svelte/icons/paint-bucket";
import PaletteIcon from "@lucide/svelte/icons/palette";
import PanelBottomIcon from "@lucide/svelte/icons/panel-bottom";
import PanelBottomOpenIcon from "@lucide/svelte/icons/panel-bottom-open";
import PanelLeftIcon from "@lucide/svelte/icons/panel-left";
import PanelRightIcon from "@lucide/svelte/icons/panel-right";
import PanelsTopLeftIcon from "@lucide/svelte/icons/panels-top-left";
import RectangleEllipsisIcon from "@lucide/svelte/icons/rectangle-ellipsis";
import RectangleHorizontalIcon from "@lucide/svelte/icons/rectangle-horizontal";
import Rows3Icon from "@lucide/svelte/icons/rows-3";
import ScrollTextIcon from "@lucide/svelte/icons/scroll-text";
import SeparatorHorizontalIcon from "@lucide/svelte/icons/separator-horizontal";
import ShieldCheckIcon from "@lucide/svelte/icons/shield-check";
import SlidersHorizontalIcon from "@lucide/svelte/icons/sliders-horizontal";
import SquareIcon from "@lucide/svelte/icons/square";
import SquareCheckIcon from "@lucide/svelte/icons/square-check";
import SquareChevronDownIcon from "@lucide/svelte/icons/square-chevron-down";
import SquareMousePointerIcon from "@lucide/svelte/icons/square-mouse-pointer";
import SunMoonIcon from "@lucide/svelte/icons/sun-moon";
import SwatchBookIcon from "@lucide/svelte/icons/swatch-book";
import TableIcon from "@lucide/svelte/icons/table";
import TagIcon from "@lucide/svelte/icons/tag";
import TextCursorIcon from "@lucide/svelte/icons/text-cursor";
import TextCursorInputIcon from "@lucide/svelte/icons/text-cursor-input";
import ToggleLeftIcon from "@lucide/svelte/icons/toggle-left";
import ToggleRightIcon from "@lucide/svelte/icons/toggle-right";
import TriangleAlertIcon from "@lucide/svelte/icons/triangle-alert";
import TypeIcon from "@lucide/svelte/icons/type";
import VibrateIcon from "@lucide/svelte/icons/vibrate";
import WrenchIcon from "@lucide/svelte/icons/wrench";
import type { Component } from "svelte";

import type { NavItem } from "#lib/components/blocks/bottom-nav.svelte";

export type Group = "blocks" | "primitives" | "modules";

type Icon = Component<{ class?: string }>;

type Entry = [icon: Icon, description: string];

export interface Doc {
	slug: string;
	name: string;
	description: string;
	icon: Icon;
}

const blocks: Record<string, Entry> = {
	"accent-toggle": [
		PaintBucketIcon,
		"The accent presets: a swatch strip on desktop, labelled rows on phones.",
	],
	"auth-shell": [
		LogInIcon,
		"Centered sign-in layout: heading, optional brand and footer.",
	],
	"bottom-nav": [
		PanelBottomIcon,
		"The phone tab bar: top-level destinations, the current one lit.",
	],
	"copy-field": [
		CopyIcon,
		"Monospace value with a copy button and a promise toast.",
	],
	"document-title": [
		FileTextIcon,
		"The tab's <title> from the page title, suffixed with the app.",
	],
	"empty-state": [
		InboxIcon,
		"Icon, title, subtitle and an action for an empty list.",
	],
	"error-page": [
		TriangleAlertIcon,
		"Status, message and error id, with a link back home.",
	],
	fab: [
		CirclePlusIcon,
		"Floating action button above the phone tab bar, with a haptic tap.",
	],
	"icon-button": [
		MousePointerClickIcon,
		"Round icon button whose tooltip is its accessible name.",
	],
	"install-prompt": [
		DownloadIcon,
		"One-time PWA install sheet: native prompt or the steps.",
	],
	"nav-cards": [
		LayoutListIcon,
		"Phone-only list of a section's tabs as cards.",
	],
	"new-password-fields": [
		ShieldCheckIcon,
		"New password with a reveal button, a strength meter and the rules it must pass.",
	],
	"option-group": [
		ListChecksIcon,
		"Radio cards for a settings choice, each with an icon or swatch.",
	],
	"otp-field": [
		HashIcon,
		"A one-time code: digits only, autofilled from SMS, posted as one field.",
	],
	"password-input": [
		LockKeyholeIcon,
		"A password field with a button to reveal what was typed.",
	],
	"responsive-sheet": [
		PanelBottomOpenIcon,
		"A dialog on desktop, a bottom drawer on phones.",
	],
	"setting-switch": [
		ToggleRightIcon,
		"Labelled switch row for settings forms.",
	],
	"stat-card": [
		ChartNoAxesColumnIcon,
		"Glass card with an icon, a value and a hint, optionally a link.",
	],
	"tab-nav": [
		PanelsTopLeftIcon,
		"Pill tab bar of links, the current page's tab highlighted.",
	],
	"tab-section": [
		LayoutPanelTopIcon,
		"Tabbed section layout: tabs on desktop, nav cards on phones.",
	],
	"theme-picker": [PaletteIcon, "System, light and dark as radio cards."],
	"theme-toggle": [
		SunMoonIcon,
		"System, light and dark: an icon strip on desktop, three rows on phones.",
	],
	"top-loading-bar": [LoaderIcon, "Progress bar during SvelteKit navigations."],
};

const primitives: Record<string, Entry> = {
	accordion: [
		ChevronsUpDownIcon,
		"Stacked sections that expand one or several at a time.",
	],
	alert: [CircleAlertIcon, "A callout for something the reader should notice."],
	"alert-dialog": [
		MessageSquareWarningIcon,
		"A modal that asks to confirm before something drastic.",
	],
	avatar: [CircleUserRoundIcon, "A user's picture, falling back to initials."],
	badge: [TagIcon, "A small label for a status or a count."],
	breadcrumb: [
		ChevronsRightIcon,
		"The path from the root to the current page.",
	],
	button: [RectangleHorizontalIcon, "Every button variant and size."],
	"button-group": [GroupIcon, "Buttons joined into one control."],
	calendar: [CalendarIcon, "A month grid to pick a date."],
	card: [SquareIcon, "A surface with a header, content and footer."],
	checkbox: [SquareCheckIcon, "A checkbox, with a label through Field."],
	command: [CommandIcon, "A searchable list of commands, also as a palette."],
	"context-menu": [
		SquareMousePointerIcon,
		"A menu on right click or long press.",
	],
	dialog: [AppWindowIcon, "A modal window over the page."],
	drawer: [
		ArrowUpFromLineIcon,
		"A panel sliding up from the bottom, made for phones.",
	],
	"dropdown-menu": [SquareChevronDownIcon, "A menu opened from a button."],
	empty: [PackageOpenIcon, "The parts of an empty state, to compose your own."],
	field: [
		TextCursorInputIcon,
		"Label, control, description and error, laid out together.",
	],
	input: [
		TextCursorIcon,
		"A text input; password managers stay off unless asked.",
	],
	"input-group": [
		BetweenHorizontalStartIcon,
		"An input with addons: icons, text or buttons.",
	],
	"input-otp": [KeyRoundIcon, "One box per digit for a one-time code."],
	label: [TypeIcon, "A label for a form control."],
	menubar: [MenuIcon, "A desktop-style bar of menus."],
	pagination: [EllipsisIcon, "Links to the pages of a long list."],
	popover: [MessageSquareIcon, "Floating content anchored to a trigger."],
	progress: [GaugeIcon, "How far along something is."],
	"radio-group": [CircleDotIcon, "Pick one of a few options."],
	"range-calendar": [
		CalendarRangeIcon,
		"A month grid to pick a start and an end date.",
	],
	resizable: [GripVerticalIcon, "Panes split by a draggable handle."],
	"scroll-area": [ScrollTextIcon, "A scrolling box with a styled scrollbar."],
	select: [ListIcon, "Pick one option from a list."],
	separator: [SeparatorHorizontalIcon, "A line between groups of content."],
	sheet: [PanelRightIcon, "A panel sliding in from a side of the screen."],
	sidebar: [
		PanelLeftIcon,
		"The app sidebar: groups, menus, collapsing to icons.",
	],
	skeleton: [RectangleEllipsisIcon, "Placeholder shapes while content loads."],
	slider: [SlidersHorizontalIcon, "Pick a value or a range by dragging."],
	sonner: [BellIcon, "Toasts, styled by the theme."],
	spinner: [LoaderCircleIcon, "An indeterminate loading indicator."],
	switch: [ToggleLeftIcon, "An on or off toggle."],
	table: [TableIcon, "Rows and columns of data."],
	tabs: [LayersIcon, "In-page tabs that switch panels without navigating."],
	textarea: [NotepadTextIcon, "A multi-line text input."],
	toggle: [BoldIcon, "A button that stays pressed."],
	"toggle-group": [Rows3Icon, "Toggles where one or several stay pressed."],
	tooltip: [MessageCircleIcon, "A hint on hover or focus."],
};

const modules: Record<string, Entry> = {
	appearance: [
		SwatchBookIcon,
		"Apply a saved accent, theme, font and corners to <html>.",
	],
	haptics: [VibrateIcon, "A short vibration on tap, success or error."],
	"page-title": [
		Heading1Icon,
		"One page title for the app bar, the header and the tab.",
	],
	password: [
		AsteriskIcon,
		"The password rules and strength score, for the form and the server alike.",
	],
	toast: [
		MessageSquareTextIcon,
		"Narrate a form action through one promise toast.",
	],
	utils: [
		WrenchIcon,
		"cn to merge Tailwind classes, and the prop helper types.",
	],
};

function docs(entries: Record<string, Entry>): Doc[] {
	return Object.entries(entries).map(([slug, [icon, description]]) => ({
		slug,
		name: slug.charAt(0).toUpperCase() + slug.slice(1).replaceAll("-", " "),
		description,
		icon,
	}));
}

export const groups: Record<
	Group,
	{ label: string; description: string; icon: Icon; docs: Doc[] }
> = {
	blocks: {
		label: "Blocks",
		description: "App-level pieces the apps shared copies of.",
		icon: BlocksIcon,
		docs: docs(blocks),
	},
	primitives: {
		label: "Primitives",
		description: "The shadcn-svelte components, as the apps customised them.",
		icon: ComponentIcon,
		docs: docs(primitives),
	},
	modules: {
		label: "Modules",
		description: "Helpers for toasts, titles, appearance and haptics.",
		icon: BracesIcon,
		docs: docs(modules),
	},
};

export function isGroup(value: string): value is Group {
	return Object.hasOwn(groups, value);
}

export function findDoc(group: string, slug: string): Doc | undefined {
	return isGroup(group)
		? groups[group].docs.find((doc) => doc.slug === slug)
		: undefined;
}

export const sections: NavItem[] = [
	{ href: resolve("/"), label: "Start", icon: HouseIcon },
	{
		href: resolve("/[group]", { group: "blocks" }),
		label: "Blocks",
		icon: BlocksIcon,
	},
	{
		href: resolve("/[group]", { group: "primitives" }),
		label: "Primitives",
		icon: ComponentIcon,
	},
	{
		href: resolve("/[group]", { group: "modules" }),
		label: "Modules",
		icon: BracesIcon,
	},
];

const demos = import.meta.glob<Component>("./examples/*.svelte", {
	eager: true,
	import: "default",
});
/** The component a doc page renders live: its example file. */
export function demoOf(slug: string): Component | undefined {
	return demos[`./examples/${slug}.svelte`];
}
