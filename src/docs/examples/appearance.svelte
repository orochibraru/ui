<script lang="ts">
	import { applyAppearance } from "#lib/appearance.js";
	import { Button } from "#lib/components/ui/button/index.js";

	let corners = $state("rounded");

	function toggleCorners() {
		corners = corners === "rounded" ? "square" : "rounded";
		applyAppearance(
			document.documentElement,
			{
				accent: document.documentElement.dataset.accent ?? "bordeaux",
				theme: "system",
				darkVariant: "default",
				font: "default",
				corners,
			},
			matchMedia("(prefers-color-scheme: dark)").matches,
		);
	}
</script>

<Button variant="outline" onclick={toggleCorners}>
	Corners: {corners}
</Button>
