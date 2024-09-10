export type Talent = {
    fullName: string
    imgSrc: string
    branch: string
    generation: string[]
    aliases: string[]
}

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
