<script>
    import { db } from "$lib/db";
    import { getDrawerStore } from "@skeletonlabs/skeleton";
    import { liveQuery } from "dexie";

    const drawerStore = getDrawerStore();

    let decks = liveQuery(async () => {
        return await db.decks.toArray();
    });

    let newCard = {
        'leitnerRank': 0,
    };

    const createCard = async () => {
        console.log('creating new card')

        try {
            let res = await db.cards.put(newCard);
            
            drawerStore.close();
            
            console.log(res);
        }catch (e) {
            console.error(e);
        }
    };
</script>

<div>
    <h1>Create Card</h1>

    <form class="card card-bordered p-4 transition-all my-4" on:submit={createCard}>
        <div class="form-control">
            <label class="label" for="front">
                <span class="label-text">Front*</span>
            </label>
            
            <input type="text" id="front" class="input input-bordered" bind:value={newCard.front} required />
        </div>

        <div class="form-control mt-4">
            <label class="label" for="back">
                <span class="label-text">Back*</span>
            </label>
            
            <input type="text" id="back" class="input input-bordered" bind:value={newCard.back} required />
        </div>

        <div class="form-control mt-4">
            <label class="label" for="back">
                <span class="label-text">Deck</span>
            </label>

            <select class="select mt-2" bind:value={newCard.deckId}>
                {#each ($decks || []) as deck (deck.id)}
                    <option value={deck.id}>{deck.title}</option>
                {/each}
            </select>
        </div>

        

        <button type="submit" class="btn variant-filled-primary mt-8">Create</button>   
    </form>
</div>