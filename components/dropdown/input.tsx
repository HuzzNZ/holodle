"use client"

import React, { useState } from "react"
import Option, { Talent } from "@/components/dropdown/option"
import Image from "next/image"

type InputProps = {
    selectedTalent: Talent | null
    setSelectedTalent: React.Dispatch<Talent | null>
}

export default function Input({ selectedTalent, setSelectedTalent }: InputProps): React.JSX.Element {
    const talents: Talent[] = [
        { fullName: "Amelia Watson", branch: "hololive EN", imgSrc: "ame.png", generation: ["Myth"], aliases: ["ame", "watson", "amelia"] },
        { fullName: "Shirakami Fubuki", branch: "hololive JP", imgSrc: "fubuki.png", generation: ["1st", "Gamers"], aliases: ["fubuki", "fbk", "shirakami"] },
        { fullName: "Ayunda Risu", branch: "hololive ID", imgSrc: "risu.png", generation: ["1st"], aliases: ["risu", "ayunda"] },
        { fullName: "Otonose Kanade", branch: "hololive DEV_IS", imgSrc: "kanade.png", generation: ["ReGLOSS"], aliases: ["kanade", "otonose"] }
    ]

    const [dropdownHidden, setDropdownHidden] = useState(true)

    return (
        <div className={`w-[600px] flex flex-col justify-center items-center rounded-lg`}>
            <div className={"w-full h-14 px-6 py-2 flex flex-row flex-gap-2 bg-white drop-shadow-md rounded-lg border-gray-800 border-opacity-15 border-[1px]"}>
                <input
                    type={"text"}
                    id={"talentInput"}
                    maxLength={35}
                    spellCheck={false}
                    autoComplete={"off"}
                    onFocus={() => setDropdownHidden(false)}
                    onBlur={() => setDropdownHidden(true)}
                    onChange={(e) => {
                        const t = talents.find(t => {
                            if (t.fullName.toLowerCase() === e.target.value.toLowerCase()) return true
                            if (t.aliases.some(a => a.toLowerCase() === e.target.value.toLowerCase())) return true
                        })
                        if (t) {
                            if (selectedTalent) return
                            setSelectedTalent(t)
                            setDropdownHidden(true)
                        } else {
                            if (!selectedTalent) return
                            setSelectedTalent(null)
                            setDropdownHidden(false)
                        }
                    }}
                    className={`h-full flex flex-grow focus:outline-none text-xl`}
                />
                <div className={"h-10 w-10 flex-grow-0"}>
                    {selectedTalent &&
                        <Image src={`/${selectedTalent.imgSrc}`} alt={selectedTalent.fullName} width={64} height={64} className={"rounded-full drop-shadow-md"}/>
                    }
                </div>
            </div>

            <div className={"relative w-[570px] z-10"}>
                <div className={"w-full bg-purple-500 rounded-b-lg text-white max-h-52 overflow-y-auto drop-shadow-md absolute"}>
                    {talents.map(t =>
                        <Option
                            talent={t}
                            hidden={dropdownHidden}
                            onSelect={(t) => {
                                const i = document.getElementById("talentInput") as HTMLInputElement
                                i.value = t.fullName
                                setSelectedTalent(t)
                                setDropdownHidden(true)
                            }}
                            key={t.fullName}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}