import { BaseService } from './baseService'
import { UserGameProfile, UserGameProfileCreateModel } from '../models/userGameProfile'

export class UserGameProfilesApi extends BaseService {
    constructor() {
        super({ entityType: 'game' })
    }

    route = 'UserGameProfile'

    async getAllUserGameProfilesByUserId(Id: string): Promise<UserGameProfile[]> {
        return await this.get<UserGameProfile[]>(`${this.route}/${Id}`)
    }

    // async getUserGameProfilesById(Id: Number): Promise<UserGameProfile> {
    //     return await this.get<UserGameProfile>(`${this.route}/${Id}`)
    // }

    // async updateUserGameProfile(
    //     userGameProfile: UserGameProfile,
    //     Id?: Number
    // ): Promise<UserGameProfile> {
    //     return await this.update<UserGameProfile>(
    //         `${this.route}/${Id || ''}`,
    //         userGameProfile
    //     )
    // }

    async createUserGameProfile(
        userGameProfileCreateModel: UserGameProfileCreateModel,
    ): Promise<UserGameProfile> {
        return await this.create<UserGameProfile>(
            `${this.route}`,
            userGameProfileCreateModel
        )
    }

    async deleteUserGameProfile(id: number): Promise<number> {
        return await this.delete(`${this.route}/${id}`)
    }
}
