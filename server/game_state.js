import { cardCosts } from "../engine/card_costs.js";

export class GameState {
    constructor(player1, player2) {
        this.players = {
            [player1]: this.createPlayerState(player1),
            [player2]: this.createPlayerState(player2)
        };

        this.currentPlayer = player1;
        this.turnNumber = 1;
        this.cancelNextSpell = false;
    }

    createPlayerState(name) {
        return {
            name,
            deck: [],
            hand: [],
            graveyard: [],
            energy: 0,
            leader: null,
            battlefield: {
                army: [null, null, null, null, null],
                spellTrap: [null, null, null, null, null]
            }
        };
    }

    switchTurn() {
        this.currentPlayer =
            this.currentPlayer === Object.keys(this.players)[0]
                ? Object.keys(this.players)[1]
                : Object.keys(this.players)[0];

        this.turnNumber++;
    }

    getCurrentPlayerState() {
        return this.players[this.currentPlayer];
    }

    getOpponentState() {
        const keys = Object.keys(this.players);
        return this.players[keys.find(p => p !== this.currentPlayer)];
    }
}
