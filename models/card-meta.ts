export const SUITS = ['club', 'diamond', 'heart', 'spade'] as const;
export type Suit = typeof SUITS[number];

export const RANKS = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'joker'] as const;
export type Rank = typeof RANKS[number];
