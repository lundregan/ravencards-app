import Dexie from 'dexie';

import { db } from '$lib/db';

let deck = null;
let cards = [];

const getDeck = async (deckId) => {
    if(!deckId) return;

    deck = await db.decks.get(deckId);
}

const getAllCards = async () => {
    cards = await db.cards.toArray();

    cards = cards.filter(card => {
        if(!card.nextReviewDate) return true;

        let cardDate = new Date(card.nextReviewDate);
        let now = new Date();
        
        return cardDate.getTime() <= now.getTime();
    });
}

const getPracticeCards = async (deckId) => {
    if(!deckId){
        console.log("getting all cards")
        await getAllCards();
        console.log(cards)

        return;
    }

    cards = await db.cards
    .where('deckId').equals(deckId)
    .toArray();

    cards = cards.filter(card => {
        if(!card.nextReviewDate) return true;

        let cardDate = new Date(card.nextReviewDate);
        let now = new Date();
        
        return cardDate.getTime() <= now.getTime();
    });
}

export const load = async ({ params, url }) => {    
    let deckId = url.searchParams.get('deckId');

    await getDeck(parseInt(deckId));

    await getPracticeCards(parseInt(deckId));
    
    return {
        deck: deck,
        cards: cards,
        cardsToPracticeCount: cards.length,
        deckId: deckId
	};
}