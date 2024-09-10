import { GameState, GameStatus, Talent } from "@/lib/types/data"
import { Nullable } from "@/lib/types/util"
import gameConfig from "@/lib/config/gameConfig"

export default function guess(gameState: GameState, t: Talent): Nullable<GameState> {
    if (gameState.status === GameStatus.Fresh) {
        gameState.status = GameStatus.InProgress
    } else if (gameState.status !== GameStatus.InProgress) {
        /* Check if game has concluded */
        return null
    }
    if (gameState.guesses.length >= gameConfig.maxGuesses) {
        /* Check if at maximum guesses */
        return null
    }
    if (t.fullName === gameState.answer.fullName) {
        gameState.guesses.push(t)
        gameState.status = GameStatus.Success
        return gameState
    }
    gameState.guesses.push(t)
    if (gameState.guesses.length >= gameConfig.maxGuesses) {
        gameState.status = GameStatus.Fail
    }
    return gameState
}
