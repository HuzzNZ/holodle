"use client"

import Image from "next/image"
import React from "react"

export type Talent = {
    fullName: string
    imgSrc: string
    branch: string
    generation: string[]
    aliases: string[]
}

type OptionProps = {
    talent: Talent,
    onSelect: (talent: Talent) => void
    hidden: boolean
}

export default function Option({ talent, onSelect, hidden }: OptionProps) {
    return (
        <div
            onMouseDown={() => onSelect(talent)}
            className={`hover:bg-black hover:bg-opacity-10 cursor-pointer ${hidden ? "hidden" : ""}`}
        >
            <TalentOptionCard talent={talent}/>
        </div>
    )
}

function TalentOptionCard({ talent }: { talent: Talent }) {
    return (
        <div className={"h-12 w-full flex flex-row items-center px-3 py-2 leading-tight select-none gap-2"}>
            <Image
                src={`/${talent.imgSrc}`}
                width={64} height={64}
                alt={"img"}
                className={"rounded-full h-8 w-8 shadow-md"}
            />
            <div>
                <p className={"font-medium"}>{talent.fullName}</p>
                <p className={"text-xs font-light opacity-75"}>{talent.branch}</p>
            </div>
        </div>
    )
}