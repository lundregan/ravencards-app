<script>
    import { db } from "$lib/db";
    import { getDrawerStore } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";

    const drawerStore = getDrawerStore();

    let editedDeck = {};

    const updateDeck = async () => {
        try {
            let res = await db.cards.put(editedDeck);
            
            drawerStore.close();
        }catch (e) {
            console.error(e);
        }
    };

    const deleteDeck = async () => {
        try {
            let res = await db.decks.delete(editedDeck.id);
            
            drawerStore.close();
        }catch (e) {
            console.error(e);
        }
    };

    const resetDeckProgress = async () => {
        let cards = await db.cards.where('deckId').equals(editedDeck.id).toArray();
        
        cards.forEach(async card => {
            card.leitnerRank = 0;
            card.nextReviewDate = null;
            card.lastPracticed = null;

            await db.cards.put(card);
        });
    }

    onMount(async () => {
        let deckId = $drawerStore.meta.deckId;

        let deck = await db.decks.get(deckId);

        editedDeck = deck;
    });
</script>

<div class="h-full flex flex-col justify-between">
    <div>
        <h1>Editing Deck</h1>

        <form class="card card-bordered p-4 transition-all my-4" on:submit={updateDeck}>
            <div class="form-control">
                <label class="label" for="title">
                    <span class="label-text">Title</span>
                </label>
                <input type="text" id="title" class="input input-bordered" bind:value={editedDeck.title} placeholder="Deck Name..." required />
            </div>

            <div class="form-control mt-4">
                <label class="label" for="back">
                    <span class="label-text">Description</span>
                </label>
                <textarea class="textarea" id="description" rows="4" bind:value={editedDeck.description} placeholder="Description..." required />
            </div>

            <button type="submit" class="btn variant-filled-primary mt-8">Save</button>   
        </form>
    </div>

    <div class="card card-bordered p-4 transition-all">
        <h1>Options</h1>
        <div class="flex gap-4">
            <button type="button" class="btn btn-sm variant-filled-warning mt-4" on:click={resetDeckProgress}>Reset All cards Progress</button>
            <button type="button" class="btn btn-sm variant-filled-error mt-4" on:click={deleteDeck}>Delete</button>
        </div>
    </div>
</div>