import { describe, it, expect, test } from 'bun:test';
import { Card } from './card';
import { RANKS } from './card-meta';

test('rank returns the expected card rank', () => {
  const card = new Card('3', 'club');
  expect(card.rank).toBe('3');
});

test('suit returns the expected suit', () => {
  const card = new Card('4', 'club');
  expect(card.suit).toBe('club');
});

describe('toString', () => {

  it('returns the expected value for standard cards', () => {
    const card = new Card('8', 'diamond');
    expect(card.toString()).toBe('8 of Diamonds');
  });

  it('returns the expected value for face cards', () => {
    const card = new Card('jack', 'heart');
    expect(card.toString()).toBe('Jack of Hearts');
  });

  it('returns the expected value for joker cards', () => {
    const card = new Card('joker', null);
    expect(card.toString()).toBe('Joker');
  });
});

describe('isFaceCard', () => {
  it.each(['2', '3', '4', '5', '6', '7', '8', '9', '10', 'ace', 'joker'])('returns false when the rank is not a face rank', (nonFaceRank) => {
    const card = new Card(nonFaceRank, 'club');
    expect(card.isFaceCard).toBeFalse();
  });

  it.each(['jack', 'king', 'queen'])('returns true when the rank is a face rank', (faceRank) => {
    const card = new Card(faceRank, 'club');
    expect(card.isFaceCard).toBeTrue();
  });
});

describe('isJoker', () => {
  it('returns true when the rank is joker', () => {
    const card = new Card('joker', null);
    expect(card.isJoker).toBeTrue();
  });

  it.each(RANKS.filter(rank => rank !== 'joker'))('returns false when the rank is not joker', (rank) => {
    const card = new Card(rank, 'club');
    expect(card.isJoker).toBeFalse();
  });
});

describe('isNumeral', () => {
  it.each(['ace', 'jack', 'queen', 'king', 'joker'])('returns false when the rank is not a numeral', (rank) => {
    const card = new Card(rank, 'diamond');
    expect(card.isNumeral).toBeFalse();
  });

  it.each(['2', '3', '4', '5', '6', '7', '8', '9', '10'])('returns true when the rank is a numeral', (rank) => {
    const card = new Card(rank, 'diamond');
    expect(card.isNumeral).toBeTrue();
  });
});
