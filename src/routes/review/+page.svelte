<script>
    import { onMount } from "svelte";
    import { db } from "$lib/db";

    export let data;

    $: cardFlipped = false;

    $: card = {
        front: 'Example Question',
        back: 'Example answer',
        id: 0
    };

    $: cards = data.cards || [];
    $: backHasBeenShown = false;

    let cardsPracticed = 0;

    const flipCard = () => {
        cardFlipped = !cardFlipped;
        backHasBeenShown = true;
    }

    const chooseRandomCard = async () => {
        let currentCardId = card.id;

        let newRandomNumber = Math.floor(Math.random() * data.cards.length);

        if(cards.length >= 2 ){
            while (newRandomNumber === currentCardId) {
                newRandomNumber = Math.floor(Math.random() * data.cards.length);      
            }
        }

        card = data.cards[newRandomNumber];

        cardFlipped = false;
        backHasBeenShown = false;
    }

    const againButtonClicked = async () => {
        resetCardLeitnerRank(card);
        
        chooseRandomCard();
    }

    const removeCurrentCardFromUpcomingCards = async () => {
        let index = data.cards.findIndex(card => card.id === card.id);

        chooseRandomCard();

        data.cards.splice(index, 1);
        data.cards = data.cards;

        cardsPracticed++;
    }

    const resetCardLeitnerRank = async (card) => {
        let updatedCard = {
            ...card,
            leitnerRank: 1,
            lastPracticed: new Date().toISOString(),
            nextReviewDate: new Date().toISOString()
        };

        db.cards.update(card.id, updatedCard);
    }

    const updateCard = async (card) => {
        let numOfDaysToAdd = card.leitnerRank * card.leitnerRank - card.leitnerRank;
        
        let nextReviewDate = new Date();
        nextReviewDate.setDate(nextReviewDate.getDate() + numOfDaysToAdd);

        let updatedCard = {
            ...card,
            leitnerRank: card.leitnerRank + 1,
            lastPracticed: new Date().toISOString(),
            nextReviewDate: nextReviewDate.toISOString()
        };

        db.cards.update(card.id, updatedCard);
    }

    const hardButtonClicked = () => {
        updateCard(card);

        removeCurrentCardFromUpcomingCards();
    }

    const mediumButtonClicked = () => {
        updateCard(card);

        removeCurrentCardFromUpcomingCards();
    }

    const easyButtonClicked = () => {
        updateCard(card);

        removeCurrentCardFromUpcomingCards();
    }

    const onKeyDown = (e) => {
        switch (e.key) {
            case '1':
                againButtonClicked();
                break;
            case '2':
                hardButtonClicked();
                break;
            case '3':
                mediumButtonClicked();
                break;
            case '4':
                easyButtonClicked();1
                break;
            case ' ':
                flipCard();
                break;
        }
    }

    $: test37 = 

    onMount(() => {        
        chooseRandomCard();
    });
</script>

<div class="h-full flex flex-col justify-between items-center">
    <div class="w-full">
        <progress class="progress w-full" value={cardsPracticed} max={data.cardsToPracticeCount}></progress>
        
        <div class="w-full flex justify-between">
            <div>
                {#if data.deck}
                    <p>{data.deck.title}</p>
                {:else}
                    <p>All Cards</p>
                {/if}
            </div>
            <div>
                <p>{cardsPracticed} / {data.cardsToPracticeCount}</p>
            </div>
        </div>
    </div>

    {#if data.cards.length === 0}
        <div>
            <h2 class="h4">No more cards to practice</h2>
        
            <div class="mt-4 flex flex-col gap-4">
                <a href="/decks" class="btn variant-filled-primary">Go to dashboard</a>
                <a href="/decks" class="btn variant-filled-secondary">Go to decks</a>
            </div>
        </div>
    {:else}
        <button class="card w-96 shadow-xl transform relative pt-4 transition-all duration-600 bg-gray-800 {cardFlipped ? 'rotate-3d-[1,1,1,360deg]' : ''}" on:click={flipCard}>            
            <section class="card-body items-center text-center min-h-40 flex px-8 justify-center">
                {#if !cardFlipped}
                    <h2 class="card-title">{card.front}</h2>
                {:else}
                    <h2 class="card-title">{card.back}</h2>
                {/if}
            </section>
        </button>
    {/if}

    <div class="max-w-7xl mx-16 mbs-8 p-4 rounded-full flex justify-center gap-8">
        <button class="btn btn-outline variant-filled-error text-center font-bold text-xl" disabled={!backHasBeenShown} on:click={againButtonClicked}>Again</button>
        <button class="btn btn-outline variant-filled-warning text-center font-bold text-xl" on:click={hardButtonClicked}>Hard</button>
        <button class="btn btn-outline variant-filled-secondary text-center font-bold text-xl" on:click={mediumButtonClicked}>Medium</button>
        <button class="btn btn-outline variant-filled-success text-center font-bold text-xl" on:click={easyButtonClicked}>Easy</button>
    </div>
</div>

<svelte:window on:keydown={onKeyDown} />