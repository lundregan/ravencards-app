<script>
    import { getDrawerStore } from "@skeletonlabs/skeleton";
    import { openDraw } from '$lib/drawer';
    
    import FaCog from 'svelte-icons/fa/FaCog.svelte';
    
    export let data;
</script>

<div>
    <div class="flex justify-between mb-12">
        <h1 class="h1">Cards</h1>
    </div>

    {#if data.cards.length > 0}
        <table class="table w-full mt-8">
            <thead>
                <tr>
                    <th>Front</th>
                    <th>Deck</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {#each (data.cards || []) as card (card.id)}
                    <tr>
                        <td>{card.front}</td>
                        <td>{card.deckName}</td>
                        <td class="flex justify-end">
                            <button on:click={() => openDraw('editCard', {cardId: card.id})} type="button" class="btn btn-icon w-6">
                                <FaCog />
                            </button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {:else}
        <div>
            <div class="card p-4 mx-auto">
                <p class="">No decks found,</p>
                <p>Try creating one from the side menu!</p>
            </div>
        </div>
    {/if}
</div>