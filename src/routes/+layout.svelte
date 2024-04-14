<script lang="ts">
	import '../app.postcss';
	import { AppShell, getDrawerStore, initializeStores, Toast, storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { setDrawerStore } from '$lib/drawer';

	import Footer from '$lib/global/Footer.svelte'
	import Navigation from '$lib/global/Navigation.svelte';
	import Drawer from '$lib/Drawer.svelte';
	import Modal from '$lib/Modal.svelte';

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
	<Toast />
	<Modal />
</div>