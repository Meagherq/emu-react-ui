import { Game, GameCreateModel } from "./game";

export interface UserGameProfile {
    userGameProfileId: number
    gameId: number
    game: Game
    isFavorite: boolean
    isRecent: boolean
}

export interface UserGameProfileCreateModel {
    userId: string
    game: GameCreateModel
    isFavorite: boolean
    isRecent: boolean
}


export interface UserGameProfiles {
    [id: number]: UserGameProfile
}

export type UserGameProfilesState = Readonly<UserGameProfiles>