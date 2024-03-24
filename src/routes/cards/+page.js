import { db } from '$lib/db';

export const load = async ({ params, url }) => {
    let cards = await db.cards.toArray();

    cards.forEach(async card => {
        if(!card.deckId) return;
        
        let deck = await db.decks.get(card.deckId);

        card.deckName = deck.title;
    });


    console.log(cards)

    return {
        cards: cards
    }
}