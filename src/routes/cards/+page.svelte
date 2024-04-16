<script>
    import { openDraw } from '$lib/drawer';
    import { liveQuery } from 'dexie';
    import { db } from '$lib/db';
    
    import FaCog from 'svelte-icons/fa/FaCog.svelte';
    import FaPlus from 'svelte-icons/fa/FaPlus.svelte'

    let cards = liveQuery(() => db.cards.toArray());
</script>

<div>
    <div class="flex justify-between mb-12">
        <h1 class="h1">Cards</h1>
        <button class="btn btn-sm variant-ghost-primary w-32" on:click={() => {openDraw('createCard')}}>
            <div class="w-3"><FaPlus /></div>
            <span>Create Card</span>
        </button>
    </div>

    {#if ($cards|| []).length > 0}
        <table class="table w-full mt-8">
            <thead>
                <tr>
                    <th>Question</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {#each ($cards || []) as card (card.id)}
                    <tr>
                        <td class="text-ellipsis overflow-hidden max-w-[10vw]">{card.front}</td>
                        <td class="flex justify-end">
                            <button on:click={() => openDraw('editCard', {cardId: card.id})} type="button" class="btn btn-icon w-5">
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
                <p class="">No decks found, <button class="anchor" on:click={() => {openDraw('createCard')}}>create a card</p>
            </div>
        </div>
    {/if}
</div>