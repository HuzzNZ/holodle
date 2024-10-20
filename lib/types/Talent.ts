type Locales = "en" | "jp" | "id" | "kr" | "cn-S" | "cn-T"

type LocaleString = Partial<{
    [key in Locales]: string
}>

type Named = {
    name: LocaleString
}

type Branch = {} & Named

type Generation = {
    branch: Branch
    location: number
} & Named

export type Talent = {
    generations: Generation[]
    birthday: string
    anniversary: string
    imageColor: string
    height: number
    outfitCount: number
    originalSongCount: number
} & Named
