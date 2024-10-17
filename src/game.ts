import { CardDeck } from './cardDeck';
import { Player } from './player';
import { RoundHistory } from './interface';
import { cards } from './constant'

export class Game {
    private deck: CardDeck;
    private players: Player[] = [];
    private roundHistory: RoundHistory[] = [];
    private previousCardValue: number = 7

    constructor() {
        this.deck = new CardDeck(6);
    }

    public addPlayer(player: Player) {
        this.players.push(player);
    }

    public startRound() {
        console.log("Новый раунд...");

        setTimeout(() => {
            const drawnCard = this.deck.drawCard();
            console.log(`Выпала карта: ${drawnCard?.rank} ${drawnCard?.suit}`);
            this.processBets(drawnCard?.rank);
        }, 15000); // 15 секунд на ставки
    }

    public processBets(drawnCardRank: string | undefined) {
        if (!drawnCardRank) return;

        const drawnCardValue = cards[drawnCardRank.toString()];
        
        this.players.forEach(player => {
            
            //тут получаем ставку игрока, например загружаем её из очереди брокера и создаем ставку. Игрок может пропустить ставку
            const bet = player.placeBet(10, 'higher'); //для примерера игрок поставил ставку 10 монет на карту "выше" 

            if (bet) {
                const isCorrect = bet.prediction === 'higher'
                    ? drawnCardValue > this.previousCardValue
                    : drawnCardValue < this.previousCardValue;

                if (isCorrect) {
                    const winAmount = bet.bet * 1.7;
                    player.receiveWinnings(winAmount);
                    console.log(`${player.getName()} выигрывает: ${winAmount}`);
                } else {
                    console.log(`${player.getName()} проигрывает.`);
                }

                player.addToHistory(bet.bet, bet.prediction, isCorrect ? 'win' : 'lose', isCorrect ? bet.bet * 1.7 : 0);
            }

        })

        this.previousCardValue = drawnCardValue

        setTimeout(() => {
            console.log("Раунд завершен. Выигрыш зачислен.");
        }, 1000);

        this.roundHistory.push({ drawnCard: drawnCardRank, bets: this.players.map(p => p.getBetHistory()) });
    }

    public getRoundHistory() {
        return this.roundHistory;
    }
}