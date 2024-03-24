import Dexie from 'dexie';

declare module 'dexie' {
  interface Dexie {
    settings: any;
    cards: any;
    decks: any;
  }
}

export const db = new Dexie('rcDatabase');

db.version(1).stores({
  cards: '++id, deckId, leitnerRank',
  settings: '++id, name',
  decks: '++id, name'
});

db.version(2).stores({
  cards: '++id, deckId, leitnerRank',
  settings: '++id, name',
  decks: '++id, name'
}).upgrade(tx => {
  return tx.cards.toCollection().modify(card => {
    card.leitnerRank = 0;
  });
});