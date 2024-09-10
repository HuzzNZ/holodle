import { Nullable } from "@/lib/types/util"
import { Talent } from "@/lib/types/data"
import talents from "@/data/talents"

export function matchTalent(searchString: string): Nullable<Talent> {
    return talents.find(t => {
        /* Try to match full name */
        if (t.fullName.toLowerCase() === searchString.toLowerCase()) return true
        /* Also try to match alias */
        if (t.aliases.some(a => a.toLowerCase() === searchString.toLowerCase())) return true
    }) ?? null
}

export function searchTalents(searchString: string): Talent[] {
    return talents.filter(t => {
        /* Try to match full name */
        if (t.fullName.toLowerCase().includes(searchString.toLowerCase())) return true
        /* Also try to match alias */
        if (t.aliases.some(a => a.toLowerCase().includes(searchString.toLowerCase()))) return true
    })
}

export function allTalents(): Talent[] {
    return talents.map(t => t)
}
