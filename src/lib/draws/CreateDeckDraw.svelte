<script>
    import { db } from "$lib/db";

    let newDeck = {};

    const createDeck = async () => {
        try {
            let res = await db.decks.put(newDeck);
        }catch (e) {
            console.error(e);
        }
    };
</script>

<div>
    <h1 class="h2">Create Deck</h1>

    <form class="card card-bordered p-4 transition-all my-4" on:submit={createDeck}>
        <div class="form-control">
            <label class="label" for="title">
                <span class="label-text">Title</span>
            </label>
            <input type="text" id="title" class="input input-bordered" bind:value={newDeck.title} placeholder="Deck Name..." maxlength="128" required />
        </div>

        <div class="form-control mt-4">
            <label class="label" for="back">
                <span class="label-text">Description</span>
            </label>
            <textarea class="textarea" id="description" rows="4" bind:value={newDeck.description} placeholder="Description..." maxlength="256" />
        </div>

        <button type="submit" class="btn variant-filled-primary mt-8">Create</button>   
    </form>
</div>