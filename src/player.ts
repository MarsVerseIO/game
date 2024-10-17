import {BetHistory} from './interface'

export class Player {
    private name: string;
    private balance: number;
    private betHistory: BetHistory[] = [];

    constructor(name: string, initialBalance: number) {
        this.balance = initialBalance;
        this.name = name;
    }

    public placeBet(bet: number, prediction: string) {
        if (bet > this.balance) {
            console.log("Недостаточный баланс!");
            return null;
        }
        this.balance -= bet;
        return { bet, prediction };
    }

    public receiveWinnings(winAmount: number) {
        this.balance += winAmount;
    }

    public addToHistory(bet: number, prediction: string, result: string, winAmount: number) {
        this.betHistory.push({ bet, prediction, result, winAmount });
    }

    public getName() {
        return this.name;
    }

    public getBalance() {
        return this.balance;
    }

    public getBetHistory() {
        return this.betHistory;
    }
}