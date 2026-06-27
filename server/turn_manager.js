import { cardCosts } from "../engine/card_costs.js";

export class TurnManager {
    constructor(gameState) {
        this.game = gameState;
    }

    startPhase() {
        const player = this.game.getCurrentPlayerState();

        // Energy gain (+1 or +2 if Energy Leader)
        const leaderBuff = player.leader.buff;
        player.energy += leaderBuff === "Energy+" ? 2 : 1;
    }

    drawPhase() {
        const player = this.game.getCurrentPlayerState();
        if (player.deck.length > 0) {
            const card = player.deck.shift();
            player.hand.push(card);
        }
    }

    mainPhase() {
        // This phase is controlled by client actions.
        // Server only checks legality.
        return true;
    }

    battlePhase() {
        // Attacks handled in combat_manager.js
        return true;
    }

    endPhase() {
        // Cleanup temporary effects
        const player = this.game.getCurrentPlayerState();
        player.tempDamageReduction = 0;
        this.game.cancelNextSpell = false;
    }

    runTurn() {
        this.startPhase();
        this.drawPhase();
        this.mainPhase();
        this.battlePhase();
        this.endPhase();
        this.game.switchTurn();
    }
}
