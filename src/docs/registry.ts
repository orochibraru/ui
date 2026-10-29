import { resolve } from "$app/paths";
import AppWindowIcon from "@lucide/svelte/icons/app-window";
import ArrowUpFromLineIcon from "@lucide/svelte/icons/arrow-up-from-line";
import AsteriskIcon from "@lucide/svelte/icons/asterisk";
import BellIcon from "@lucide/svelte/icons/bell";
import BetweenHorizontalStartIcon from "@lucide/svelte/icons/between-horizontal-start";
import BlocksIcon from "@lucide/svelte/icons/blocks";
import BoldIcon from "@lucide/svelte/icons/bold";
import BoxIcon from "@lucide/svelte/icons/box";
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
import FilmIcon from "@lucide/svelte/icons/film";
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
import MusicIcon from "@lucide/svelte/icons/music";
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

import { catalog, type CatalogDoc, type Group, isGroup } from "./catalog.js";

export { type Group, isGroup };

type Icon = Component<{ class?: string }>;

export interface Doc extends CatalogDoc {
	icon: Icon;
}

const groupIcons: Record<Group, Icon> = {
	blocks: BlocksIcon,
	primitives: ComponentIcon,
	modules: BracesIcon,
};

const icons: Record<string, Icon> = {
	"accent-toggle": PaintBucketIcon,
	"auth-shell": LogInIcon,
	"bottom-nav": PanelBottomIcon,
	"copy-field": CopyIcon,
	"document-title": FileTextIcon,
	"empty-state": InboxIcon,
	"error-page": TriangleAlertIcon,
	fab: CirclePlusIcon,
	"icon-button": MousePointerClickIcon,
	"install-prompt": DownloadIcon,
	"music-player": MusicIcon,
	"video-player": FilmIcon,
	"nav-cards": LayoutListIcon,
	"new-password-fields": ShieldCheckIcon,
	"option-group": ListChecksIcon,
	"otp-field": HashIcon,
	"password-input": LockKeyholeIcon,
	"responsive-sheet": PanelBottomOpenIcon,
	"setting-switch": ToggleRightIcon,
	"stat-card": ChartNoAxesColumnIcon,
	"tab-nav": PanelsTopLeftIcon,
	"tab-section": LayoutPanelTopIcon,
	"theme-picker": PaletteIcon,
	"theme-toggle": SunMoonIcon,
	"top-loading-bar": LoaderIcon,
	accordion: ChevronsUpDownIcon,
	alert: CircleAlertIcon,
	"alert-dialog": MessageSquareWarningIcon,
	avatar: CircleUserRoundIcon,
	badge: TagIcon,
	breadcrumb: ChevronsRightIcon,
	button: RectangleHorizontalIcon,
	"button-group": GroupIcon,
	calendar: CalendarIcon,
	card: SquareIcon,
	checkbox: SquareCheckIcon,
	command: CommandIcon,
	"context-menu": SquareMousePointerIcon,
	dialog: AppWindowIcon,
	drawer: ArrowUpFromLineIcon,
	"dropdown-menu": SquareChevronDownIcon,
	empty: PackageOpenIcon,
	field: TextCursorInputIcon,
	input: TextCursorIcon,
	"input-group": BetweenHorizontalStartIcon,
	"input-otp": KeyRoundIcon,
	label: TypeIcon,
	menubar: MenuIcon,
	pagination: EllipsisIcon,
	popover: MessageSquareIcon,
	progress: GaugeIcon,
	"radio-group": CircleDotIcon,
	"range-calendar": CalendarRangeIcon,
	resizable: GripVerticalIcon,
	"scroll-area": ScrollTextIcon,
	select: ListIcon,
	separator: SeparatorHorizontalIcon,
	sheet: PanelRightIcon,
	sidebar: PanelLeftIcon,
	skeleton: RectangleEllipsisIcon,
	slider: SlidersHorizontalIcon,
	sonner: BellIcon,
	spinner: LoaderCircleIcon,
	switch: ToggleLeftIcon,
	table: TableIcon,
	tabs: LayersIcon,
	textarea: NotepadTextIcon,
	toggle: BoldIcon,
	"toggle-group": Rows3Icon,
	tooltip: MessageCircleIcon,
	appearance: SwatchBookIcon,
	haptics: VibrateIcon,
	"page-title": Heading1Icon,
	password: AsteriskIcon,
	toast: MessageSquareTextIcon,
	utils: WrenchIcon,
};

export const groups = Object.fromEntries(
	Object.entries(catalog).map(([group, { docs, ...meta }]) => [
		group,
		{
			...meta,
			icon: groupIcons[group as Group],
			docs: docs.map((doc) => ({ ...doc, icon: icons[doc.slug] ?? BoxIcon })),
		},
	]),
) as Record<
	Group,
	{ label: string; description: string; icon: Icon; docs: Doc[] }
>;

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
