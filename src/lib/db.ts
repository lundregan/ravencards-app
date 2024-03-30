import Dexie from 'dexie';

declare module 'dexie' {
  interface Dexie {
    settings: any;
    cards: any;
    decks: any;
  }
}

export const db = new Dexie('rcDatabase');

db.version(3).stores({
  cards: '++id, deckId, leitnerRank',
  settings: '++id, name',
  decks: '++id, name'
});

export enum CardProgress {
  NotStarted,
  Learning,
  Mastered
}

export const getCardsByProgress = async (progress: CardProgress) => {
  try{
    switch (progress) {
      case CardProgress.NotStarted:
        return await db.cards.where('leitnerRank').equals(0).count();
      case CardProgress.Learning:
        return db.cards.where('leitnerRank').between(1, 4).count();
      case CardProgress.Mastered:
        return db.cards.where('leitnerRank').equals(5).count(); 
    }
  } catch (error) {
    console.error('Error getting cards by progress', error);
  }
}
