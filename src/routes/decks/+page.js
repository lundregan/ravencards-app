import { db } from '$lib/db';

export const load = async ({ params, url }) => {
    let decks = await db.decks.toArray();
    
    return {
        decks: decks
    }
}