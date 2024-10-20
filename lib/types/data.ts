export type Talent = {
    fullName: string
    imgSrc: string
    branch: string
    generation: string[]
    aliases: string[]
}

const o: TalentAttribute = {
    name: {
        en: "Nekomata Okayu",
        jp: "猫又おかゆ"
    },
    height: 152.0,
    birthday: new Date("July 24 2024"),
    debut: new Date("July 24 2024"),
    branch: {
        name: {
            en: "hololive Japan",
            jp: "ホロライブ"
        }
    },
    generations: [{
        name: {
            en: "Gamers",
            jp: "ゲーマーズ"
        }
    }]
}

export type TalentAttribute = {
    height: number
    birthday: Date
    debut: Date
    branch: Branch
    generations: Generation[]
} & Named

export type Branch = {} & Named

export type Generation = {} & Named

export type Named = {
    name: LocaleString
}

export type LocaleString = Partial<{
    [key in Locales]: string
}>

export type Locales = "en" | "jp"

export type GameState = {
    answer: Talent
    guesses: Talent[]
    status: GameStatus
}

export enum GameStatus {
    Fresh,
    InProgress,
    Fail,
    Success
}
