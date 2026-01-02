import { test, expect, describe, it, beforeEach } from 'bun:test';
import { BaseDeck } from './base-deck';
import { Card } from './card';

test('toString returns the expected value', () => {
  const deck = new BaseDeck();
  deck.insert('top', new Card('6', 'club'));
  deck.insert('top', new Card('ace', 'spade'));
  expect(deck.toString()).toBe(JSON.stringify({
    cards: deck.cards.map(card => card.toString()),
    cardCount: 2,
  }));
});

describe('shuffle', () => {
  let deck: BaseDeck;
  let shuffledDeck: BaseDeck;

  beforeEach(() => {
    deck = new BaseDeck();
    deck.insert('top', new Card('10', 'diamond'));
    deck.insert('top', new Card('jack', 'club'));
    deck.insert('top', new Card('9', 'heart'));

    shuffledDeck = new BaseDeck();
    shuffledDeck.insert('top', new Card('10', 'diamond'));
    shuffledDeck.insert('top', new Card('jack', 'club'));
    shuffledDeck.insert('top', new Card('9', 'heart'));
    shuffledDeck.shuffle();
  });

  it('randomizes the order of the cards', () => {
    for (let i = 0; i < shuffledDeck.cards.length; i++) {
      expect(deck.cards[i]?.toString).not.toBe(shuffledDeck.cards[i]?.toString());
    }
  });

  it('does not add or remove any cards', () => {
    expect(deck.cards.length).toBe(shuffledDeck.cards.length);

    shuffledDeck.cards.forEach(shuffledCard => {
      expect(deck.cards.map(card => card.toString())).toContain(shuffledCard.toString());
    });

    deck.cards.forEach(card => {
      expect(shuffledDeck.cards.map(card => card.toString())).toContain(card.toString());
    });
  });
});

test('draw removes the last card from the deck and returns it', () => {
  const deck = new BaseDeck();
  deck.insert('top', new Card('5', 'heart'));
  deck.insert('top', new Card('joker', null));
  const originalLength = deck.cards.length;
  const lastCard = deck.cards.at(-1)?.toString();
  const drawnCard = deck.draw();

  expect(drawnCard?.toString()).toBe(lastCard);
  expect(deck.cards.length).toBe(originalLength - 1);
});

describe('insert', () => {
  let deck: BaseDeck;
  let drawnCard: Card;

  beforeEach(() => {
    deck = new BaseDeck();
    deck.insert('top', new Card('10', 'diamond'));
    deck.insert('top', new Card('jack', 'club'));
    deck.insert('top', new Card('9', 'heart'));
    deck.shuffle();
    drawnCard = deck.draw()!;
  });

  describe('bottom', () => {
    it('inserts the card at the bottom of the deck', () => {
      deck.insert('bottom', drawnCard);
      expect(deck.cards[0]?.toString()).toBe(drawnCard.toString());
    });
  });

  describe('top', () => {
    it('inserts the card at the top of the deck', () => {
      deck.insert('top', drawnCard);
      expect(deck.cards.at(-1)?.toString()).toBe(drawnCard.toString());
    });
  });

  describe('random', () => {
    it('inserts the card at a random position', () => {
      deck.insert('random', drawnCard);
      const index = deck.cards.findIndex(card => card.toString() === drawnCard.toString());
      expect(index).toBeGreaterThan(-1);
    });
  });
});
