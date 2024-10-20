"use client"

import { useState } from "react"

import gameConfig from "@/lib/config/gameConfig"
import { Nullable } from "@/lib/types/util"
import { GameState, GameStatus, Talent } from "@/lib/types/data"
import { randomTalent } from "@/lib/functions/talents"
import guess from "@/lib/functions/game"

import Input from "@/components/TalentInput"
import Button from "@/components/Button"


export default function Page() {
    const [selectedTalent, setSelectedTalent] = useState<Nullable<Talent>>(null)
    const [guesses, setGuesses] = useState<Talent[]>([])
    const [gameState, setGameState] = useState<GameState>({
        answer: randomTalent(),
        guesses: [],
        status: GameStatus.Fresh
    })
    const talentInputId = "talent-input"

    const statusDisplay = (gs: GameState) => {
        switch (gs.status) {
            case GameStatus.Fresh:
                return <p>Game Not Started</p>
            case GameStatus.InProgress:
                return <p>Game In Progress ({gs.guesses.length}/{gameConfig.maxGuesses})</p>
            case GameStatus.Fail:
                return <b>You Lose!!</b>
            case GameStatus.Success:
                return <b>You Win!!</b>
        }
    }

    return (
        <div className={"w-full flex flex-col items-center justify-center py-24 gap-y-8"}>
            <h1 className={"text-[48px] font-semibold"}>holodle</h1>

            <div className={"flex flex-col gap-2 items-center justify-center"}>
                {statusDisplay(gameState)}
                {gameState.guesses.map(t =>
                    <p>{t.fullName} {(t.fullName === gameState.answer.fullName) ? "CORRECT" : "WRONG"}</p>
                )}
            </div>

            {gameState.status < 2 ? <>
                <Input selectedTalent={selectedTalent} setSelectedTalent={setSelectedTalent} id={talentInputId}/>
                <div className={"flex flex-row gap-8"}>
                    <Button config={{ text: "Guess!", theme: "blue", disabled: selectedTalent === null }} onClick={() => {
                        if (selectedTalent) {
                            setGameState(g => {
                                /* Copy old game state object */
                                return JSON.parse(JSON.stringify(guess(g, selectedTalent) ?? g))
                            })
                            const i = document.getElementById(talentInputId) as HTMLInputElement
                            i.value = ""
                            setSelectedTalent(null)
                        }
                    }}/>
                    <Button config={{ text: "Pass", theme: "gray" }}/>
                </div>
            </> : <>
                <Button config={{ text: "Reset", theme: "blue" }} onClick={() => {
                    setGameState({ answer: randomTalent(), guesses: [], status: GameStatus.Fresh })
                }}/>
            </>}
        </div>
    )
}
