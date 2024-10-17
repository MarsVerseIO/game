import { Game } from './game';
import { Player } from './player';

const roundSecTime = 20 // Новый раунд запускается каждые 20 секунд

const game = new Game();
const player1 = new Player('Игрок 1', 100);
const player2 = new Player('Игрок 2', 200);

game.addPlayer(player1);
game.addPlayer(player2);

game.startRound();

setInterval(() => {
    game.startRound();
}, roundSecTime*1000); 