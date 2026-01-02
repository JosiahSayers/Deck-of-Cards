import { describe, it, expect } from 'bun:test';
import { Deck } from './deck';
import { RANKS, SUITS, type Suit } from './card-meta';
import { Card } from './card';

const deckWithoutJokers = () => {
  const cards: Card[] = [];

  const ranks = RANKS.filter(rank => rank !== 'joker');

  for (const suit of ['spade', 'diamond'] as Suit[]) {
    for (const rank of ranks) {
      cards.push(new Card(rank, suit));
    }
  }

  for (const suit of ['club', 'heart'] as Suit[]) {
    for (const rank of ranks.toReversed()) {
      cards.push(new Card(rank, suit));
    }
  }

  return cards;
}

const fullDeck = () => {
  const cards = deckWithoutJokers();
  cards.unshift(new Card('joker', null), new Card('joker', null));

  return cards;
}

describe('constructor', () => {
  describe('when includeJokers is true', () => {
    it('returns a deck with the expected cards', () => {
      const deck = new Deck({ jokerCount: 2 });
      const stringifiedCards = deck.cards.map(card => card.toString());

      fullDeck().forEach(card => {
        expect(stringifiedCards).toContain(card.toString());
      });
    });
  });

  describe('when jokerCount is 0', () => {
    it('returns a deck without jokers', () => {
      const deck = new Deck({ jokerCount: 0 });
      const stringifiedCards = deck.cards.map(card => card.toString());

      deckWithoutJokers().forEach(card => {
        expect(stringifiedCards).toContain(card.toString());
      });

      expect(stringifiedCards).not.toContain(new Card('joker', null).toString());
    });
  });

  describe('when jokerCount is undefined', () => {
    it('returns a deck without jokers', () => {
      const deck = new Deck();
      const stringifiedCards = deck.cards.map(card => card.toString());

      deckWithoutJokers().forEach(card => {
        expect(stringifiedCards).toContain(card.toString());
      });

      expect(stringifiedCards).not.toContain(new Card('joker', null).toString());
    });
  });
});
