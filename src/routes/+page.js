import { db } from '$lib/db';

let deckCount = 0;
let cardCount = 0;

const getDecksCount = async () => {
    return db.decks.count();
}

const getCardsCount = async () => {
    return db.cards.count();
}

export const load = async ({ params, url }) => {    
    deckCount = await getDecksCount();
    cardCount = await getCardsCount();
    

    return {
        deckCount: deckCount,
        cardCount: cardCount
    };
}