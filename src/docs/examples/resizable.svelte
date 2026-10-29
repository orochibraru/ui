<script lang="ts">
	import * as Resizable from "#lib/components/ui/resizable/index.js";
</script>

<div class="h-72 rounded-md border">
	<Resizable.PaneGroup direction="horizontal">
		<Resizable.Pane defaultSize={25} minSize={15}>
			<div class="flex h-full items-center justify-center p-4">
				<span class="font-medium">Services</span>
			</div>
		</Resizable.Pane>
		<Resizable.Handle withHandle />
		<Resizable.Pane defaultSize={75}>
			<Resizable.PaneGroup direction="vertical">
				<Resizable.Pane defaultSize={60}>
					<div class="flex h-full items-center justify-center p-4">
						<span class="font-medium">Details</span>
					</div>
				</Resizable.Pane>
				<Resizable.Handle withHandle />
				<Resizable.Pane defaultSize={40}>
					<div class="flex h-full items-center justify-center p-4">
						<span class="font-medium">Logs</span>
					</div>
				</Resizable.Pane>
			</Resizable.PaneGroup>
		</Resizable.Pane>
	</Resizable.PaneGroup>
</div>
