<script>
    import { openDraw } from '$lib/drawer';
    import { liveQuery } from 'dexie';
    import { db } from '$lib/db';
    
    import FaCog from 'svelte-icons/fa/FaCog.svelte';
    import FaPlay from 'svelte-icons/fa/FaPlay.svelte';
    

    let decks = liveQuery(() => db.decks.toArray());
</script>

<div class="table-container">
    <div class="flex justify-between mb-12">
        <h1 class="h1">Decks</h1>
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
                        <td>{deck.title}</td>
                        <td>{deck.description}</td>
                        <td class="flex gap-4 justify-end">
                            <a href="/practice?deckId={deck.id}" type="button" class="btn btn-icon w-6">
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
                <p class="">No decks found,</p>
                <p>Try creating one from the side menu!</p>
            </div>
        </div>
    {/if}
</div>