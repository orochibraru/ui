<script lang="ts" module>
	import type { Component } from "svelte";

	export type FormFieldType =
		| "text"
		| "email"
		| "password"
		| "number"
		| "url"
		| "tel"
		| "search"
		| "textarea"
		| "select"
		| "date"
		| "checkbox"
		| "switch"
		| "checkboxes"
		| "radio"
		| "segmented"
		| "file";

	export interface FormFieldOption {
		value: string;
		label: string;
		description?: string;
		icon?: Component<{ class?: string }>;
		disabled?: boolean;
	}

	export interface FormField {
		name: string;
		type?: FormFieldType;
		label?: string;
		description?: string;
		placeholder?: string;
		required?: boolean;
		disabled?: boolean;
		autocomplete?: HTMLInputElement["autocomplete"];
		options?: FormFieldOption[];
		searchable?: boolean;
		variant?: "list" | "cards";
		rows?: number;
		maxlength?: number;
		min?: string;
		max?: string;
		/** For `file`: what it accepts, how many and how big. */
		accept?: string;
		maxFiles?: number;
		maxFileSize?: number;
		/** Takes the whole row when the form has two columns. */
		span?: "full";
	}

	export type FormValues = Record<string, string | string[] | boolean>;

	/** Each field's starting value: what `values` gives, else empty for its type. */
	export function initialValues(
		fields: FormField[],
		values: FormValues = {},
	): FormValues {
		return Object.fromEntries(
			fields.map((field) => [
				field.name,
				values[field.name] ??
					(field.type === "checkbox" || field.type === "switch"
						? false
						: field.type === "checkboxes"
							? []
							: ""),
			]),
		);
	}
</script>

<script lang="ts">
	import { enhance } from "$app/forms";
	import { type Snippet, untrack } from "svelte";

	import { Button } from "#lib/components/ui/button/index.js";
	import { Spinner } from "#lib/components/ui/spinner/index.js";
	import { type ActionData, enhanceToast } from "#lib/toast.js";
	import { cn } from "#lib/utils.js";

	import CheckboxList from "./checkbox-list.svelte";
	import Checkbox from "./checkbox.svelte";
	import DateField from "./date-field.svelte";
	import FileDropzone from "./file-dropzone.svelte";
	import Input from "./input.svelte";
	import RadioList from "./radio-list.svelte";
	import SegmentedControl from "./segmented-control.svelte";
	import Select from "./select.svelte";
	import Switch from "./switch.svelte";
	import Textarea from "./textarea.svelte";

	const defaultMessages = {
		submit: "Save",
		loading: "Saving",
		success: "Saved.",
		error: "Couldn't save. Check the form and try again.",
	};

	interface Props {
		fields: FormField[];
		values?: FormValues;
		action?: string;
		/** Field errors to show, like a form action's `errors` after a full-page submit. */
		errors?: Record<string, string[] | undefined>;
		columns?: 1 | 2;
		onsuccess?: (data: ActionData) => void | Promise<void>;
		children?: Snippet;
		actions?: Snippet<[{ pending: boolean }]>;
		messages?: Partial<typeof defaultMessages>;
		class?: string;
	}

	let {
		fields,
		values = $bindable({}),
		action,
		errors = {},
		columns = 2,
		onsuccess,
		children,
		actions,
		messages = {},
		class: className,
	}: Props = $props();

	const text = $derived({ ...defaultMessages, ...messages });

	let current = $state<FormValues>(
		initialValues(
			untrack(() => fields),
			untrack(() => values),
		),
	);
	let returnedErrors = $state<Record<string, string[] | undefined>>({});
	let pending = $state(false);

	values = current;

	const fieldErrors = $derived({ ...errors, ...returnedErrors });

	function textValue(name: string) {
		return {
			get value() {
				return String(current[name] ?? "");
			},
			set value(next: string) {
				current[name] = next;
			},
		};
	}

	function listValue(name: string) {
		return {
			get value() {
				const value = current[name];
				return Array.isArray(value) ? value : [];
			},
			set value(next: string[]) {
				current[name] = next;
			},
		};
	}

	function checkedValue(name: string) {
		return {
			get value() {
				return current[name] === true;
			},
			set value(next: boolean) {
				current[name] = next;
			},
		};
	}

	function errorsFrom(data: ActionData): Record<string, string[] | undefined> {
		const found = data?.errors;
		return found && typeof found === "object"
			? (found as Record<string, string[] | undefined>)
			: {};
	}

	const submit = $derived(
		enhanceToast({
			loading: text.loading,
			success: text.success,
			error: text.error,
			onStart: () => {
				pending = true;
				returnedErrors = {};
			},
			onSettled: () => {
				pending = false;
			},
			onFailure: (data) => {
				returnedErrors = errorsFrom(data);
			},
			onSuccess: async (data) => {
				await onsuccess?.(data);
			},
		}),
	);
</script>

<form
	method="POST"
	{action}
	enctype={fields.some((field) => field.type === "file")
		? "multipart/form-data"
		: undefined}
	use:enhance={submit}
	class={cn("grid gap-6", className)}
	novalidate
>
	<div
		class={cn(
			"grid grid-cols-1 gap-x-6 gap-y-5",
			columns === 2 && "md:grid-cols-2",
		)}
	>
		{#each fields as field (field.name)}
			{@const type = field.type ?? "text"}
			{@const common = {
				name: field.name,
				label: field.label,
				description: field.description,
				required: field.required,
				disabled: field.disabled || pending,
				error: fieldErrors[field.name],
			}}
			<div
				class={cn(
					"min-w-0",
					(field.span === "full" ||
						type === "textarea" ||
						type === "checkboxes" ||
						type === "file" ||
						(type === "radio" && field.variant === "cards")) &&
						"md:col-span-2",
				)}
			>
				{#if type === "textarea"}
					{@const bound = textValue(field.name)}
					<Textarea
						{...common}
						placeholder={field.placeholder}
						rows={field.rows}
						maxlength={field.maxlength}
						bind:value={bound.value}
					/>
				{:else if type === "select"}
					{@const bound = textValue(field.name)}
					<Select
						{...common}
						options={field.options ?? []}
						placeholder={field.placeholder}
						searchable={field.searchable}
						bind:value={bound.value}
					/>
				{:else if type === "date"}
					{@const bound = textValue(field.name)}
					<DateField
						{...common}
						min={field.min}
						max={field.max}
						placeholder={field.placeholder}
						bind:value={bound.value}
					/>
				{:else if type === "checkbox"}
					{@const bound = checkedValue(field.name)}
					<Checkbox {...common} bind:checked={bound.value} />
				{:else if type === "switch"}
					{@const bound = checkedValue(field.name)}
					<Switch {...common} bind:checked={bound.value} />
				{:else if type === "checkboxes"}
					{@const bound = listValue(field.name)}
					<CheckboxList
						{...common}
						options={field.options ?? []}
						bind:value={bound.value}
					/>
				{:else if type === "radio"}
					{@const bound = textValue(field.name)}
					<RadioList
						{...common}
						options={field.options ?? []}
						variant={field.variant}
						bind:value={bound.value}
					/>
				{:else if type === "file"}
					<FileDropzone
						{...common}
						accept={field.accept}
						maxFiles={field.maxFiles}
						maxFileSize={field.maxFileSize}
					/>
				{:else if type === "segmented"}
					{@const bound = textValue(field.name)}
					<SegmentedControl
						{...common}
						options={field.options ?? []}
						bind:value={bound.value}
					/>
				{:else}
					{@const bound = textValue(field.name)}
					<Input
						{...common}
						{type}
						placeholder={field.placeholder}
						autocomplete={field.autocomplete}
						maxlength={field.maxlength}
						bind:value={bound.value}
					/>
				{/if}
			</div>
		{/each}
	</div>
	{@render children?.()}
	{#if actions}
		{@render actions({ pending })}
	{:else}
		<div class="flex justify-end">
			<Button
				type="submit"
				disabled={pending}
				class="h-11 w-full rounded-xl md:w-auto md:px-6"
			>
				{#if pending}<Spinner />{/if}
				{text.submit}
			</Button>
		</div>
	{/if}
</form>
