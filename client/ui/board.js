import { renderBoard } from "./ui/board.js";
import { renderEnergy } from "./ui/energy_display.js";
import { renderLeader } from "./ui/leader_display.js";
import { renderCard } from "./ui/card_renderer.js";

const socket = io("http://localhost:3000");

let gameState = null;

socket.on("stateUpdate", state => {
    gameState = state;
    updateUI();
});

function updateUI() {
    renderBoard(gameState);
    renderEnergy(gameState);
    renderLeader(gameState);
}

document.getElementById("endTurnBtn").onclick = () => {
    socket.emit("endTurn", { gameId: "default" });
};

export function playArmy(slotIndex, card) {
    socket.emit("playArmy", {
        gameId: "default",
        slotIndex,
        card
    });
}

export function attack(attackerSlot, defenderSlot) {
    socket.emit("attack", {
        gameId: "default",
        attackerSlot,
        defenderSlot
    });
}
