import { GameState } from "./game_state.js";
import { TurnManager } from "./turn_manager.js";
import { CombatManager } from "./combat_manager.js";
import { CardManager } from "./card_manager.js";
import defCircle from "../data/def_circle.json" assert { type: "json" };

export function setupSockets(io) {
    const games = new Map();

    io.on("connection", socket => {
        socket.on("createGame", ({ gameId, player1, player2 }) => {
            const gameState = new GameState(player1, player2);
            const turnManager = new TurnManager(gameState);
            const combatManager = new CombatManager(gameState, defCircle);
            const cardManager = new CardManager(gameState);

            games.set(gameId, { gameState, turnManager, combatManager, cardManager });
            socket.join(gameId);
            io.to(gameId).emit("gameCreated", { gameId });
        });

        socket.on("playArmy", ({ gameId, slotIndex, card }) => {
            const game = games.get(gameId);
            if (!game) return;

            const success = game.cardManager.playArmyCard(slotIndex, card);
            if (success) io.to(gameId).emit("stateUpdate", game.gameState);
        });

        socket.on("attack", ({ gameId, attackerSlot, defenderSlot }) => {
            const game = games.get(gameId);
            if (!game) return;

            const success = game.combatManager.attack(attackerSlot, defenderSlot);
            if (success) io.to(gameId).emit("stateUpdate", game.gameState);
        });

        socket.on("endTurn", ({ gameId }) => {
            const game = games.get(gameId);
            if (!game) return;

            game.turnManager.runTurn();
            io.to(gameId).emit("stateUpdate", game.gameState);
        });
    });
}
