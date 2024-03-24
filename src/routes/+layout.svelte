<script lang="ts">
	import '../app.postcss';
	import Footer from '$lib/global/Footer.svelte'
	import { AppShell } from '@skeletonlabs/skeleton';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import Navigation from '$lib/global/Navigation.svelte';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { setDrawerStore } from '$lib/drawer';

	import Drawer from '$lib/Drawer.svelte';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	initializeStores();

	setDrawerStore(getDrawerStore());
</script>

<div class="h-full">
	<AppShell>
		<svelte:fragment slot="header">
			
		</svelte:fragment>

		<svelte:fragment slot="sidebarLeft">
			<Navigation />
		</svelte:fragment>
		
		<main class="h-full">
			<div class="p-4 h-full">
				<slot />
			</div>
		</main>
		
		<svelte:fragment slot="pageFooter">
			<Footer />
		</svelte:fragment>
	</AppShell>

	<Drawer />
</div>