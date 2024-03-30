<script>
    import { db } from "$lib/db";
    import { getDrawerStore } from "@skeletonlabs/skeleton";
    import { liveQuery } from "dexie";
    import { onMount } from "svelte";

    const drawerStore = getDrawerStore();

    let decks = liveQuery(async () => {
        return await db.decks.toArray();
    });

    let editedCard = {};

    const updateCard = async () => {
        console.log('creating new card')

        try {
            let res = await db.cards.put(editedCard);
            
            drawerStore.close();
            
            console.log(res);
        }catch (e) {
            console.error(e);
        }
    };

    const deleteCard = async () => {
        console.log('deleting card')

        try {
            let res = await db.cards.delete(editedCard.id);
            
            drawerStore.close();
            
            console.log(res);
        }catch (e) {
            console.error(e);
        }
    };

    onMount(async () => {
        let cardId = $drawerStore.meta.cardId;

        let card = await db.cards.get(cardId);

        editedCard = card;
    });
</script>

<div>
    <h1>Editing card</h1>


    <form class="card card-bordered p-4 transition-all my-4" on:submit={updateCard}>
        <div class="form-control">
            <label class="label" for="front">
                <span class="label-text">Front*</span>
            </label>
            
            <input type="text" id="front" class="input input-bordered" bind:value={editedCard.front} required />
        </div>

        <div class="form-control mt-4">
            <label class="label" for="back">
                <span class="label-text">Back*</span>
            </label>
            
            <input type="text" id="back" class="input input-bordered" bind:value={editedCard.back} required />
        </div>

        <div class="form-control mt-4">
            <label class="label" for="back">
                <span class="label-text">Deck</span>
            </label>

            <select class="select mt-2" bind:value={editedCard.deckId}>
                {#each ($decks || []) as deck (deck.id)}
                    <option value={deck.id}>{deck.title}</option>
                {/each}
            </select>
        </div>

        

        <button type="submit" class="btn variant-filled-primary mt-8">Save</button>   
    </form>

    <div class="card card-bordered p-4 transition-all my-4">
        <h1>Options</h1>
        <button type="button" class="btn variant-filled-error mt-8" on:click={deleteCard}>Delete</button>   
    </div>
</div>