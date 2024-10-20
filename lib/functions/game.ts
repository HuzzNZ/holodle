import { GameState, GameStatus, Talent } from "@/lib/types/data"
import { Nullable, Result } from "@/lib/types/util"
import gameConfig from "@/lib/config/gameConfig"
import { fail, success } from "@/lib/functions/util";

export default function guess(gameState: GameState, t: Talent): Result<GameState> {
    /* Start the game if the game is fresh */
    if (gameState.status === GameStatus.Fresh) {
        gameState.status = GameStatus.InProgress
    }

    /* Check if the game has concluded */
    if (gameState.status !== GameStatus.InProgress) {
        return fail()
    }

    /* Check if at maximum guesses */
    if (gameState.guesses.length >= gameConfig.maxGuesses) {
        return fail()
    }

    gameState.guesses.push(t)

    if (t.fullName === gameState.answer.fullName) {
        gameState.status = GameStatus.Success
        return success(gameState)
    }
    if (gameState.guesses.length >= gameConfig.maxGuesses) {
        gameState.status = GameStatus.Fail
    }
    return success(gameState)
}
