<script lang="ts">
	import BellIcon from "@lucide/svelte/icons/bell";
	import InboxIcon from "@lucide/svelte/icons/inbox";
	import MoonIcon from "@lucide/svelte/icons/moon";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import WalletIcon from "@lucide/svelte/icons/wallet";
	import { toggleMode } from "mode-watcher";
	import { toast } from "svelte-sonner";

	import AuthShell from "#lib/components/blocks/auth-shell.svelte";
	import CopyField from "#lib/components/blocks/copy-field.svelte";
	import EmptyState from "#lib/components/blocks/empty-state.svelte";
	import Fab from "#lib/components/blocks/fab.svelte";
	import IconButton from "#lib/components/blocks/icon-button.svelte";
	import ResponsiveSheet from "#lib/components/blocks/responsive-sheet.svelte";
	import SettingSwitch from "#lib/components/blocks/setting-switch.svelte";
	import StatCard from "#lib/components/blocks/stat-card.svelte";
	import * as Accordion from "#lib/components/ui/accordion/index.js";
	import * as Alert from "#lib/components/ui/alert/index.js";
	import { Badge } from "#lib/components/ui/badge/index.js";
	import { Button } from "#lib/components/ui/button/index.js";
	import { Calendar } from "#lib/components/ui/calendar/index.js";
	import * as Card from "#lib/components/ui/card/index.js";
	import { Checkbox } from "#lib/components/ui/checkbox/index.js";
	import * as DropdownMenu from "#lib/components/ui/dropdown-menu/index.js";
	import * as Field from "#lib/components/ui/field/index.js";
	import { Input } from "#lib/components/ui/input/index.js";
	import { Progress } from "#lib/components/ui/progress/index.js";
	import * as Select from "#lib/components/ui/select/index.js";
	import { Skeleton } from "#lib/components/ui/skeleton/index.js";
	import { Slider } from "#lib/components/ui/slider/index.js";
	import { Spinner } from "#lib/components/ui/spinner/index.js";
	import { Switch } from "#lib/components/ui/switch/index.js";
	import * as Table from "#lib/components/ui/table/index.js";
	import * as Tabs from "#lib/components/ui/tabs/index.js";
	import { Textarea } from "#lib/components/ui/textarea/index.js";
	import * as ToggleGroup from "#lib/components/ui/toggle-group/index.js";
	import { setPageTitle } from "#lib/page-title.svelte.js";

	const accents = [
		"blue",
		"bordeaux",
		"green",
		"violet",
		"rose",
		"orange",
		"amber",
		"cyan",
		"neutral",
	];

	let accent = $state("blue");
	let sheetOpen = $state(false);
	let fruit = $state("apple");
	let volume = $state([40]);

	setPageTitle("Showcase");

	$effect(() => {
		document.documentElement.dataset.accent = accent;
	});
</script>

<main class="pt-safe-top grid gap-6 p-4 md:p-8">
	<header class="flex flex-wrap items-center justify-between gap-4">
		<div>
			<h1 class="text-3xl font-bold">@orochibraru/ui</h1>
			<p class="text-muted-foreground">Every primitive and block, live.</p>
		</div>
		<div class="flex flex-wrap items-center gap-2">
			<ToggleGroup.Root type="single" bind:value={accent} variant="outline">
				{#each accents as name (name)}
					<ToggleGroup.Item value={name} aria-label={name} data-accent={name}>
						<span
							class="size-3 rounded-full bg-[oklch(0.6_var(--primary-chroma)_var(--hue))]"
						></span>
					</ToggleGroup.Item>
				{/each}
			</ToggleGroup.Root>
			<IconButton
				label="Toggle dark mode"
				icon={MoonIcon}
				onclick={toggleMode}
			/>
		</div>
	</header>

	<section
		class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 min-[2400px]:grid-cols-6"
	>
		<StatCard
			label="Balance"
			value="1 284 €"
			hint="This month"
			icon={WalletIcon}
		/>
		<StatCard
			label="Owed to you"
			value="312 €"
			icon={WalletIcon}
			tone="positive"
		/>
		<StatCard label="You owe" value="96 €" icon={WalletIcon} tone="warning" />
		<StatCard label="Alerts" value={3} href="#alerts" icon={BellIcon} />
	</section>

	<section
		class="grid items-start gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 min-[2400px]:grid-cols-6"
	>
		<Card.Root>
			<Card.Header>
				<Card.Title>Buttons</Card.Title>
				<Card.Description>Variants, sizes and states.</Card.Description>
			</Card.Header>
			<Card.Content class="flex flex-wrap gap-2">
				<Button>Primary</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="outline">Outline</Button>
				<Button variant="ghost">Ghost</Button>
				<Button variant="destructive">Delete</Button>
				<Button disabled><Spinner /> Saving</Button>
				<Button size="icon" aria-label="Add"><PlusIcon /></Button>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>Form</Card.Title>
			</Card.Header>
			<Card.Content>
				<Field.Group>
					<Field.Field>
						<Field.Label for="email">Email</Field.Label>
						<Input id="email" type="email" placeholder="you@example.com" />
						<Field.Description>We never share it.</Field.Description>
					</Field.Field>
					<Field.Field>
						<Field.Label for="fruit">Fruit</Field.Label>
						<Select.Root type="single" bind:value={fruit}>
							<Select.Trigger id="fruit" class="w-full">{fruit}</Select.Trigger>
							<Select.Content>
								<Select.Item value="apple">apple</Select.Item>
								<Select.Item value="pear">pear</Select.Item>
								<Select.Item value="fig">fig</Select.Item>
							</Select.Content>
						</Select.Root>
					</Field.Field>
					<Field.Field>
						<Field.Label for="notes">Notes</Field.Label>
						<Textarea id="notes" placeholder="Anything else?" />
					</Field.Field>
					<Field.Field orientation="horizontal">
						<Checkbox id="terms" />
						<Field.Label for="terms">Accept the terms</Field.Label>
					</Field.Field>
				</Field.Group>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>Settings</Card.Title>
			</Card.Header>
			<Card.Content>
				<SettingSwitch
					name="push"
					label="Push notifications"
					description="On this device only."
					checked
				/>
				<SettingSwitch
					name="digest"
					label="Weekly digest"
					description="Every Monday morning."
					checked={false}
				/>
				<div class="flex items-center gap-3 pt-4">
					<Switch id="plain" />
					<label for="plain" class="text-sm">A bare switch</label>
				</div>
				<Slider type="multiple" bind:value={volume} max={100} class="mt-6" />
				<Progress value={volume[0]} class="mt-6" />
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>Feedback</Card.Title>
			</Card.Header>
			<Card.Content class="grid gap-3">
				<Alert.Root>
					<BellIcon />
					<Alert.Title>Heads up</Alert.Title>
					<Alert.Description>Bank sync runs every hour.</Alert.Description>
				</Alert.Root>
				<div class="flex flex-wrap gap-2">
					<Badge>New</Badge>
					<Badge variant="secondary">Draft</Badge>
					<Badge variant="outline">Archived</Badge>
					<Badge variant="destructive">Failed</Badge>
				</div>
				<div class="flex flex-wrap gap-2">
					<Button variant="outline" onclick={() => toast.success("Saved.")}
						>Success toast</Button
					>
					<Button
						variant="outline"
						onclick={() => toast.error("Couldn't save.")}>Error toast</Button
					>
				</div>
				<Skeleton class="h-4 w-2/3" />
				<Skeleton class="h-4 w-1/2" />
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>Overlays</Card.Title>
			</Card.Header>
			<Card.Content class="flex flex-wrap gap-2">
				<Button variant="outline" onclick={() => (sheetOpen = true)}
					>Responsive sheet</Button
				>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Button {...props} variant="outline">Menu</Button>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Item>Edit</DropdownMenu.Item>
						<DropdownMenu.Item>Duplicate</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item variant="destructive">Delete</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
				<CopyField label="Copy the token" value="oc_4f9a2c81d7e3b605" />
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>Tabs and accordion</Card.Title>
			</Card.Header>
			<Card.Content>
				<Tabs.Root value="one">
					<Tabs.List>
						<Tabs.Trigger value="one">One</Tabs.Trigger>
						<Tabs.Trigger value="two">Two</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="one" class="text-sm">First tab.</Tabs.Content>
					<Tabs.Content value="two" class="text-sm">Second tab.</Tabs.Content>
				</Tabs.Root>
				<Accordion.Root type="single" class="mt-4">
					<Accordion.Item value="a">
						<Accordion.Trigger>What is this?</Accordion.Trigger>
						<Accordion.Content
							>One package instead of six copies.</Accordion.Content
						>
					</Accordion.Item>
					<Accordion.Item value="b">
						<Accordion.Trigger>How do I theme it?</Accordion.Trigger>
						<Accordion.Content
							>Set --hue after importing the theme.</Accordion.Content
						>
					</Accordion.Item>
				</Accordion.Root>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>Calendar</Card.Title>
			</Card.Header>
			<Card.Content class="flex justify-center">
				<Calendar type="single" />
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>Table</Card.Title>
			</Card.Header>
			<Card.Content>
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>Who</Table.Head>
							<Table.Head class="text-right">Amount</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						<Table.Row>
							<Table.Cell>Alex</Table.Cell>
							<Table.Cell class="text-right tabular">42.00 €</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Sam</Table.Cell>
							<Table.Cell class="text-right tabular">17.50 €</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table.Root>
			</Card.Content>
		</Card.Root>

		<Card.Root class="sm:col-span-2">
			<EmptyState
				icon={InboxIcon}
				title="No expenses yet"
				subtitle="Add the first one and it shows up here."
			>
				<Button><PlusIcon /> Add expense</Button>
			</EmptyState>
		</Card.Root>

		<Card.Root class="sm:col-span-2">
			<AuthShell heading="Sign in" subheading="Welcome back.">
				{#snippet brand()}
					<div class="bg-primary size-12 rounded-2xl"></div>
				{/snippet}
				<Field.Group>
					<Field.Field>
						<Field.Label for="auth-email">Email</Field.Label>
						<Input id="auth-email" type="email" autocomplete="email" />
					</Field.Field>
					<Button class="h-11">Continue</Button>
				</Field.Group>
				{#snippet footer()}
					No account? Ask your admin.
				{/snippet}
			</AuthShell>
		</Card.Root>
	</section>
</main>

<ResponsiveSheet
	bind:open={sheetOpen}
	title="Responsive sheet"
	description="A dialog on desktop, a drawer on phones."
>
	<p class="pb-6 text-sm">Resize the window to see it switch.</p>
</ResponsiveSheet>

<Fab label="Add expense" icon={PlusIcon} onclick={() => toast("Fab tapped.")} />
