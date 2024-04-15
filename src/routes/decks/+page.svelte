<script>
    import { openDraw } from '$lib/drawer';
    import { liveQuery } from 'dexie';
    import { db } from '$lib/db';
    
    import FaCog from 'svelte-icons/fa/FaCog.svelte';
    import FaPlay from 'svelte-icons/fa/FaPlay.svelte';
    import FaPlus from 'svelte-icons/fa/FaPlus.svelte'
    

    let decks = liveQuery(() => db.decks.toArray());
</script>

<div class="table-container">
    <div class="flex justify-between mb-12">
        <h1 class="h1">Decks</h1>
        <button class="btn btn-sm variant-ghost-primary w-32" on:click={() => {openDraw('createDeck')}}>
            <div class="w-3"><FaPlus /></div>
            <span>Create Deck</span>
        </button>
    </div>

    {#if ($decks || []).length > 0}
        <table class="table w-full mt-8">
            <thead>
                <tr>
                    <th>Front</th>
                    <th>Description</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {#each ($decks || []) as deck (deck.id)}
                    <tr>
                        <td class="text-ellipsis overflow-hidden max-w-[10vw]">{deck.title}</td>
                        <td class="text-ellipsis overflow-hidden max-w-[10vw]">{deck.description}</td>
                        <td class="flex gap-4 justify-end">
                            <a href="/review?deckId={deck.id}" type="button" class="btn btn-icon w-6">
                                <FaPlay />
                            </a>
                            <button type="button" on:click={() => openDraw('editDeck', {deckId: deck.id})} class="btn btn-icon w-6">
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
                <p class="">No decks found, <button class="anchor" on:click={() => {openDraw('createDeck')}}>create a deck</p>
            </div>
        </div>
    {/if}
</div>