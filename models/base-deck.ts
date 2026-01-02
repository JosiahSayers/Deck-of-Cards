import type { Card } from "./card";

export class BaseDeck {
  protected _cards: Card[];

  constructor() {
    this._cards = [];
  }

  get cards() {
    return this._cards;
  }

  shuffle() {
    let currentIndex = this._cards.length;

    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this._cards[currentIndex], this._cards[randomIndex]] = [
        this._cards[randomIndex] as Card, this._cards[currentIndex] as Card];
    }
  }

  toString() {
    return JSON.stringify({
      cards: this._cards.map(card => card.toString()),
      cardCount: this._cards.length
    });
  }

  draw() {
    return this._cards.pop();
  }

  insert(location: 'bottom' | 'top' | 'random', card?: Card) {
    if (!card) return;

    if (location === 'bottom') {
      this._cards.unshift(card);
    } else if (location === 'top') {
      this._cards.push(card);
    } else if (location === 'random') {
      const index = Math.floor(Math.random() * this._cards.length);
      this._cards.splice(index, 0, card);
    }
  }
}
