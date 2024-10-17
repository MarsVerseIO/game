import { suits, cards } from './constant'
import { Deck } from './interface'

export class CardDeck {
    private static readonly SUITS = suits;
    private static readonly RANKS = Object.keys(cards);

    private deck: Deck[] = [];

    constructor(numDecks: number = 6) {
        this.generateDecks(numDecks);
    }

    private generateDecks(numDecks: number) {
        for (let i = 0; i < numDecks; i++) {
            for (let suit of CardDeck.SUITS) {
                for (let rank of CardDeck.RANKS) {
                    this.deck.push({ rank, suit });
                }
            }
        }
        this.shuffleDeck();
    }

    private shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    public drawCard() {
        return this.deck.pop();
    }
}