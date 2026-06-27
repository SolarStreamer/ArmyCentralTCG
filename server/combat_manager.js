import { calculateDamage } from "../engine/calculate_damage.js";
import { getDefenseValue } from "../engine/apply_def_circle.js";
import { cardCosts } from "../engine/card_costs.js";

export class CombatManager {
    constructor(gameState, defCircle) {
        this.game = gameState;
        this.defCircle = defCircle;
    }

    attack(attackerSlot, defenderSlot) {
        const player = this.game.getCurrentPlayerState();
        const opponent = this.game.getOpponentState();

        const attacker = player.battlefield.army[attackerSlot];
        const defender = opponent.battlefield.army[defenderSlot];

        if (!attacker || !defender) return false;

        // Must be in ATK position
        if (attacker.position !== "ATK") return false;

        // Must have enough Energy
        if (player.energy < cardCosts.attack) return false;

        player.energy -= cardCosts.attack;

        // Calculate DEF based on race matchup
        const defValue = getDefenseValue(
            defender.race,
            attacker.race,
            this.defCircle
        );

        const dmg = attacker.atk - defValue;
        const finalDamage = dmg > 0 ? dmg : 0;

        defender.hp -= finalDamage;

        // If defender dies
        if (defender.hp <= 0) {
            opponent.battlefield.army[defenderSlot] = null;
        }

        return true;
    }
}
