import { cardCosts } from "../engine/card_costs.js";

export class EnergyManager {
    constructor(gameState) {
        this.game = gameState;
    }

    canAfford(player, cost) {
        return player.energy >= cost;
    }

    spendEnergy(player, cost) {
        if (!this.canAfford(player, cost)) return false;
        player.energy -= cost;
        return true;
    }

    payForCard(player, cardType) {
        const cost = cardCosts[cardType];
        return this.spendEnergy(player, cost);
    }
}
