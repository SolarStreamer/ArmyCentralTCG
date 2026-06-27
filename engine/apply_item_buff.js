export function applyItemBuff(unit, item) {
    if (item.atkBoost) unit.atk += item.atkBoost;
    if (item.defBoost) unit.def += item.defBoost;
    if (item.heal) unit.hp += item.heal;

    return unit;
}
