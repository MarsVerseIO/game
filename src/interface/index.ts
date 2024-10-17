export interface BetHistory {
    bet: number;
    prediction: string;
    result: string;
    winAmount: number;
};

export interface RoundHistory {
    drawnCard: string;
    bets: any[];
}

export interface Deck {
    rank: string;
    suit: string
}