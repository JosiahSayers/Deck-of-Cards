import type { Rank, Suit } from "./card-meta";

export class Card {
  private _rank: Rank;
  private _suit: Suit | null;

  constructor(rank: Rank, suit: Suit | null) {
    this._rank = rank;
    this._suit = suit;
  }

  get rank() {
    return this._rank;
  }

  get suit() {
    return this._suit ?? '';
  }

  get isFaceCard() {
    const faceRanks: Rank[] = ['jack', 'king', 'queen'];
    return faceRanks.includes(this._rank);
  }

  get isJoker() {
    return this._rank === 'joker';
  }

  get isNumeral() {
    const numeralRanks = ['2', '3', '4', '5', '6', '7', '8', '9', '10'];
    return numeralRanks.includes(this._rank);
  }

  toString() {
    if (this._suit) {
      const formattedSuit = `${this.capitalize(this._suit)}s`;
      const formattedRank = this.isNumeral ? this._rank : this.capitalize(this._rank);
      return `${formattedRank} of ${formattedSuit}`;
    }

    return this.capitalize(this._rank);
  }

  private capitalize(value: string) {
    const [firstLetter, ...rest] = value.split('');
    return `${firstLetter?.toUpperCase()}${rest.join('')}`;
  }
}
