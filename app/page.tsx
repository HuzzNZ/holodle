"use client"

import Input from "@/components/TalentInput"
import { useState } from "react"
import { Nullable } from "@/lib/types/util"
import { Talent } from "@/lib/types/data"

export default function Page() {
    const [selectedTalent, setSelectedTalent] = useState<Nullable<Talent>>(null)

    return (
        <div className={"w-full flex flex-col items-center justify-center py-24 gap-y-8"}>
            <h1 className={"text-[48px] font-semibold"}>holodle</h1>
            <Input selectedTalent={selectedTalent} setSelectedTalent={setSelectedTalent}/>
            <div className={"flex flex-row gap-8"}>
                <Button text={"Guess!"} theme={"blue"} disabled={selectedTalent === null}/>
                <Button text={"Pass"} theme={"gray"}/>
            </div>
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
