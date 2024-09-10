"use client"

import Image from "next/image"
import React from "react"
import { Talent } from "@/lib/types/data"

type OptionProps = {
    talent: Talent,
    id: string,
    onSelect: (talent: Talent) => void
    onMouseEnter: () => void
    onMouseLeave: () => void
    highlighted: boolean
}

export default function TalentOption({ talent, id, onSelect, onMouseEnter, onMouseLeave, highlighted }: OptionProps) {
    return (
        <div
            onMouseDown={() => onSelect(talent)}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            id={id}
            className={`${highlighted? "bg-black bg-opacity-10" : ""} cursor-pointer`}
        >
            {/* Talent Option Card */}
            <div className={"h-12 w-full flex flex-row items-center px-3 py-2 leading-tight select-none gap-2"}>
                <Image
                    src={`/talents/${talent.imgSrc}`}
                    width={64} height={64}
                    alt={"img"}
                    className={"rounded-full h-8 w-8 shadow-md"}
                />
                <div>
                    <p className={"font-medium"}>{talent.fullName}</p>
                    <p className={"text-xs font-light opacity-75"}>{talent.branch}</p>
                </div>
            </div>
        </div>
    )
}
