<script>
	import { Drawer } from "@skeletonlabs/skeleton";
    import { getDrawerStore } from "@skeletonlabs/skeleton";

    import CreateDeckDraw from "$lib/draws/CreateDeckDraw.svelte";
    import EditDeckDraw from "$lib/draws/EditDeckDraw.svelte";

    import CreateCardDraw from "$lib/draws/CreateCardDraw.svelte";
    import EditCardDraw from "$lib/draws/EditCardDraw.svelte";

    const drawerStore = getDrawerStore();
</script>

<Drawer
		position="right"
		width="max-w-lg w-full"
	>
    <div class="p-4 h-full">
        {#if $drawerStore.id === 'createDeck'}
            <CreateDeckDraw />
        {:else if $drawerStore.id === 'createCard'}
            <CreateCardDraw />
        {:else if $drawerStore.id === 'editCard'}
            <EditCardDraw />
        {:else if $drawerStore.id === 'editDeck'}
            <EditDeckDraw />
        {:else}
            <div>
                <h1 class="createDeck">Sorry, something went wrong</h1>
            </div>
        {/if}
    </div>
</Drawer>