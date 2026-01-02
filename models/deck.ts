import { BaseDeck } from "./base-deck";
import { Card } from "./card";
import { RANKS, SUITS, type Suit } from "./card-meta";

export class Deck extends BaseDeck {
  constructor({
    jokerCount = 0
  }: DeckOptions = {}) {
    super();
    this._cards = [];

    if (jokerCount > 0) {
      for (let i = 0; i < jokerCount; i++) {
        this._cards.push(new Card('joker', null));
      }
    }

    // assemble the rest of the deck in NDO (New Deck Order)
    const ranks = RANKS.filter(rank => rank !== 'joker');

    for (const suit of ['spade', 'diamond'] as Suit[]) {
      for (const rank of ranks) {
        this._cards.push(new Card(rank, suit));
      }
    }

    for (const suit of ['club', 'heart'] as Suit[]) {
      for (const rank of ranks.toReversed()) {
        this._cards.push(new Card(rank, suit));
      }
    }
  }
}

export type DeckOptions = {
  jokerCount?: number;
}
