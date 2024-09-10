"use client"

import Input from "@/components/TalentInput"
import { useState } from "react"
import { Nullable } from "@/lib/types/util"
import { GameState, GameStatus, Talent } from "@/lib/types/data"
import guess from "@/lib/functions/game"
import { randomTalent } from "@/lib/functions/talents"
import gameConfig from "@/lib/config/gameConfig";

export default function Page() {
    const [selectedTalent, setSelectedTalent] = useState<Nullable<Talent>>(null)
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
                    <Button text={"Guess!"} theme={"blue"} disabled={selectedTalent === null} onClick={() => {
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
                    <Button text={"Pass"} theme={"gray"}/>
                </div>
            </> : <>
                <Button text={"Reset"} theme={"blue"} onClick={() => {
                    setGameState({ answer: randomTalent(), guesses: [], status: GameStatus.Fresh })
                }}/>
            </>}
        </div>
    )
}

type ButtonProps = {
    theme?: "blue" | "gray"
    disabled?: boolean
    onClick?: () => void
    text: string
}

function Button({ theme = "blue", disabled = false, onClick, text }: ButtonProps) {
    let themeClass: string

    switch (theme) {
        case "blue":
            themeClass = "bg-blue-500 shadow-blue-500 hover:bg-blue-600 disabled:bg-blue-200 disabled:hover:bg-blue-200"
            break
        case "gray":
            themeClass = "bg-gray-400 shadow-gray-400 hover:bg-gray-500 disabled:bg-gray-100 disabled:hover:bg-gray-100"
            break
    }
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`
                w-28 h-10 rounded-md
                text-white font-medium
                transition-all
                ${disabled? "cursor-not-allowed" : "hover:drop-shadow-xl drop-shadow-md"}
                ${themeClass}
            `}
        >
            {text}
        </button>
    )
}
