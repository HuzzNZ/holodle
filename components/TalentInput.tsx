"use client"

import Image from "next/image"
import React, { ChangeEvent, KeyboardEvent, SetStateAction, useState } from "react"
import TalentOption from "@/components/TalentOption"
import { Talent } from "@/lib/types/data"
import { Nullable } from "@/lib/types/util"
import { allTalents, matchTalent, searchTalents } from "@/lib/functions/talents";

type InputProps = {
    selectedTalent: Nullable<Talent>
    setSelectedTalent: React.Dispatch<SetStateAction<Nullable<Talent>>>
}

export default function TalentInput({ selectedTalent, setSelectedTalent, id }: InputProps): React.JSX.Element {
    const [dropdownHidden, setDropdownHidden] = useState(true)
    const [dropdownTalentsList, setDropdownTalentsList] = useState<Talent[]>(allTalents())
    const [dropdownHighlightPos, setDropdownHighlightPos] = useState(-1)
    const talentOptionId = "talentOption"

    const hideDropdown = () => {
        setDropdownHidden(true)
    }

    const showDropdown = () => {
        setDropdownHidden(false)
    }

    const onInputFocus = () => {
        if (!selectedTalent) {
            showDropdown()
        }
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const t = matchTalent(e.target.value)
        setDropdownTalentsList(searchTalents(e.target.value))
        setDropdownHighlightPos(-1)
        if (t) {
            if (selectedTalent && selectedTalent.fullName === t.fullName) return
            setSelectedTalent(t)
            hideDropdown()
        } else {
            setSelectedTalent(null)
            showDropdown()
        }
    }

    const onInputKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            setDropdownHighlightPos(p => {
                if (p < dropdownTalentsList.length - 1) {
                    document.getElementById(`${talentOptionId}-${p + 1}`).scrollIntoView({
                        behavior: "smooth",
                        block: "end"
                    })
                    return p + 1
                } return p
            })
        } else if (e.key === "ArrowUp") {
            setDropdownHighlightPos(p => {
                if (p > 0) {
                    document.getElementById(`${talentOptionId}-${p - 1}`).scrollIntoView({
                        behavior: "smooth",
                        block: "end"
                    })
                    return p - 1
                } return p
            })
        } else if (e.key === "Enter") {
            if (!dropdownHidden) {
                onDropdownSelect(dropdownTalentsList[dropdownHighlightPos])
                hideDropdown()
            }
        }
    }

    const onDropdownSelect = (t: Talent) => {
        const i = document.getElementById(id) as HTMLInputElement
        i.value = t.fullName
        setSelectedTalent(t)
    }

    return (
        <div className={`w-[600px] flex flex-col justify-center items-center rounded-lg`}>
            <div className={`
                w-full h-14 px-6 py-2
                flex flex-row flex-gap-2
                bg-white drop-shadow-md
                rounded-lg border-gray-800 border-opacity-15 border-[1px]
            `}>
                <input
                    type={"text"}
                    id={id}
                    maxLength={35}
                    spellCheck={false}
                    autoComplete={"off"}
                    onFocus={onInputFocus}
                    onBlur={hideDropdown}
                    onChange={onInputChange}
                    onKeyDown={onInputKeydown}
                    className={`h-full flex flex-grow focus:outline-none text-xl`}
                />
                <div className={"h-10 w-10 flex-grow-0"}>
                    {selectedTalent &&
                        <Image
                            src={`/talents/${selectedTalent.imgSrc}`}
                            alt={selectedTalent.fullName}
                            width={64} height={64}
                            className={"rounded-full drop-shadow-md"}
                        />
                    }
                </div>
            </div>

            <div className={`relative w-[570px] z-10 ${dropdownHidden? "hidden" : ""}`}>
                <div className={"w-full bg-purple-500 rounded-b-lg text-white max-h-52 overflow-y-auto drop-shadow-md absolute"}>
                    {dropdownTalentsList.map((t, i) =>
                        <TalentOption
                            talent={t}
                            id={`${talentOptionId}-${i}`}
                            onSelect={onDropdownSelect}
                            onMouseEnter={() => setDropdownHighlightPos(i)}
                            onMouseLeave={() => setDropdownHighlightPos(-1)}
                            highlighted={i === dropdownHighlightPos}
                            key={i}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}