import { db, CardProgress, getCardsByProgress } from '$lib/db';

const getDecksCount = async () => {
    try{
        return db.decks.count();
    }catch (e){
        console.log(e);
    }
}

const getCardsCount = async () => {
    try{
        return db.cards.count();
    }catch (e){
        console.log(e);
    }
}

export const load = async ({ params, url }) => {    
    let deckCount = await getDecksCount();
    let cardCount = await getCardsCount();

    return {
        deckCount: deckCount,
        cardCount: cardCount,
        cardProgressCounts: {
            notStarted: await getCardsByProgress(CardProgress.NotStarted),
            learning: await getCardsByProgress(CardProgress.Learning),
            mastered: await getCardsByProgress(CardProgress.Mastered)
        }
    };
}