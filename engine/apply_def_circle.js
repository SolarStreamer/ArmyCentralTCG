export function getDefenseValue(unitRace, enemyRace, defCircle) {
    const matchup = defCircle[unitRace];

    if (enemyRace === matchup.strongAgainst) return matchup.strongDef;
    if (enemyRace === matchup.weakAgainst) return matchup.weakDef;

    return matchup.neutralDef;
}
