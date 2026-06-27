export function applySpellEffect(target, spell) {
    if (spell.dmg) {
        target.hp -= spell.dmg;
    }

    if (spell.heal) {
        target.hp += spell.heal;
    }

    if (spell.atkBoost) {
        target.atk += spell.atkBoost;
    }

    if (spell.defBoost) {
        target.def += spell.defBoost;
    }

    if (spell.damageReduction) {
        target.tempDamageReduction = spell.damageReduction;
    }

    if (spell.energyGain) {
        target.energy += spell.energyGain;
    }

    return target;
}
