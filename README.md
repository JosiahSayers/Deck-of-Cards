# Deck of Cards

Easily create a deck of playing cards for use in other applications.

## Usage

To create a standard deck in NDO (New Deck Order)

```typescript
import { Deck } from "deck-of-cards";

const deck = new Deck();
```

To create a standard deck with Jokers in NDO (New Deck Order)

```typescript
import { Deck } from "deck-of-cards";

const deck = new Deck({ jokerCount: 2 });
```

Shuffling a deck

```typescript
import { Deck } from "deck-of-cards";

const deck = new Deck();
deck.suffle();
```

Drawing a card

```typescript
import { Deck } from "deck-of-cards";

const deck = new Deck();
const drawnCard = deck.draw(); // drawn card is removed from the deck and returned
```

Inserting a card into a deck

```typescript
import { Deck } from "deck-of-cards";

const deck = new Deck();
const cardToInsert = new Card("joker", null);

deck.insert("bottom", cardToInsert); // Will be inserted at the bottom of the deck
deck.insert("top", cardToInsert); // Will be inserted at the top of the deck (i.e. will be the next card produced by deck.draw())
deck.insert("random", cardToInsert); // Will be inserted into the deck at a random position
```

Using BaseDeck as a discard pile

```typescript
import { Deck, BaseDeck } from "deck-of-cards";

const deck = new Deck();
console.log(deck.size); // 52
const discardPile = new BaseDeck();
console.log(discardPile.size); // 0

// Draw the top card from the deck and add it to the top of the discard pile
discardPile.insert("top", deck.draw());
console.log(deck.size); // 51
console.log(discardPile.size); // 1
```
