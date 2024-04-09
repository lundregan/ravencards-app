import { db, CardProgress, getCardsByProgress } from '$lib/db';

const getUsername = async () => {
    let username = await db.settings.get('username');
    
    if(!username){
        await db.settings.put({key: 'username', value: 'User'});
        return 'User';
    }
    
    return username.value;
}

const getDecksCount = async () => {
    try{
        return db.decks.count();
    }catch (e){
        console.log(e);
        return 0;
    }
}

const getCardsCount = async () => {
    try{
        return db.cards.count();
    }catch (e){
        console.log(e);
        return 0;
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
        },
        username: await getUsername()
    };
}