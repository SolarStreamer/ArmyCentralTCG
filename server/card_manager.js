import { EnergyManager } from "./energy_manager.js";

export class CardManager {
    constructor(gameState) {
        this.game = gameState;
        this.energyManager = new EnergyManager(gameState);
    }

    playArmyCard(slotIndex, card) {
        const player = this.game.getCurrentPlayerState();

        if (!this.energyManager.payForCard(player, "army")) return false;
        if (player.battlefield.army[slotIndex]) return false;

        player.battlefield.army[slotIndex] = {
            ...card,
            position: "ATK"
        };

        return true;
    }

    playSpellCard(card, target) {
        const player = this.game.getCurrentPlayerState();

        if (!this.energyManager.spendEnergy(player, card.energyCost)) return false;

        // Actual effect handled by engine/apply_spell_effect.js on server
        return true;
    }

    setTrapCard(slotIndex, card) {
        const player = this.game.getCurrentPlayerState();

        if (!this.energyManager.spendEnergy(player, card.energyCost)) return false;
        if (player.battlefield.spellTrap[slotIndex]) return false;

        player.battlefield.spellTrap[slotIndex] = {
            ...card,
            faceDown: true
        };

        return true;
    }

    useItemCard(card, target) {
        const player = this.game.getCurrentPlayerState();

        if (!this.energyManager.spendEnergy(player, card.energyCost)) return false;

        // Actual buff handled by engine/apply_item_buff.js
        return true;
    }
}
