import { BaseDeck } from "./models/base-deck";
import { Deck } from "./models/deck";

const deck = new Deck({ jokerCount: 2 });
const discard = new BaseDeck();

deck.shuffle();
discard.insert('top', deck.draw());

console.log(deck.toString());
console.log(discard.toString());
