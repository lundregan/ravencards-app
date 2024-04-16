<script>
    import { db } from "$lib/db";
    import { getDrawerStore, SlideToggle } from "@skeletonlabs/skeleton";
    import { liveQuery } from "dexie";

    const drawerStore = getDrawerStore();

    let decks = liveQuery(async () => {
        return await db.decks.toArray();
    });

    let newCard = {
        'leitnerRank': 0,
    };

    let stayOpen = false;
    let keepValues = false;

    const createCard = async () => {
        try {
            let res = await db.cards.put(newCard);
            
            if(!stayOpen){
                drawerStore.close();
            }else{
                newCard = {
                    ...newCard,
                    'leitnerRank': 0,
                    front: keepValues ? newCard.front : null,
                    back: keepValues ? newCard.back : null,
                };
            }
        }catch (e) {
            console.error(e);
        }
    };
</script>

<div>
    <h1 class="h2">Create Card</h1>

    <div class="flex gap-4">
        <SlideToggle class="mt-4" name="slider-label" size="sm" active="variant-ghost-primary" bind:checked={stayOpen}>Stay open</SlideToggle>
        
        {#if stayOpen}
            <SlideToggle class="mt-4" name="slider-label" size="sm" active="variant-ghost-primary" bind:checked={keepValues}>Keep values</SlideToggle>
        {/if}
    </div>

    <form class="card card-bordered p-4 transition-all my-4" on:submit={createCard}>
        <div class="form-control">
            <label class="label" for="front">
                <span class="label-text">Front*</span>
            </label>
            
            <input
                type="text"
                id="front"
                class="input input-bordered"
                bind:value={newCard.front}
                maxlength="512"
                required
            />
        </div>

        <div class="form-control mt-4">
            <label class="label" for="back">
                <span class="label-text">Back*</span>
            </label>
            
            <input
                type="text"
                id="back"
                class="input input-bordered"
                bind:value={newCard.back}
                maxlength="512"
                required
            />
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