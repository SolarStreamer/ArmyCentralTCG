export function calculateDamage(attacker, defender, defCircle) {
    const race = defender.race;
    const matchup = defCircle[race];

    let defValue = matchup.neutralDef;

    if (attacker.race === matchup.strongAgainst) {
        defValue = matchup.weakDef;
    } else if (attacker.race === matchup.weakAgainst) {
        defValue = matchup.strongDef;
    }

    const rawDamage = attacker.atk - defValue;
    return rawDamage > 0 ? rawDamage : 0;
}
