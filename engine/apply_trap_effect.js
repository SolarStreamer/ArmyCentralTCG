export function applyTrapEffect(target, trap, gameState) {
    switch (trap.effect) {
        case "stunNextTurn":
            target.stunned = true;
            break;

        case "forceDefPosition":
            target.position = "DEF";
            break;

        case "lose1Energy":
            target.energy = Math.max(0, target.energy - 1);
            break;

        case "cancelNextSpell":
            gameState.cancelNextSpell = true;
            break;

        case "revealFaceDown":
            target.revealed = true;
            break;

        case "revealHand":
            target.handRevealed = true;
            break;

        default:
            break;
    }

    return { target, gameState };
}
