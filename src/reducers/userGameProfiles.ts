import { getType } from 'typesafe-actions'
import { UserGameProfilesAction } from '../actions'
import { deleteUserGameProfileAction, fetchUserGameProfilesByUserIdAction, putUserGameProfileAction } from '../actions/userGameProfiles'
import {
    UserGameProfile, UserGameProfiles, UserGameProfilesState,
} from '../models/userGameProfile'
import { deleteRecord, mergeRecord, mergeRecords } from '../utilities'

export default (state: UserGameProfiles = {}, action: UserGameProfilesAction): UserGameProfilesState => {
    switch (action.type) {
        case getType(fetchUserGameProfilesByUserIdAction.success):
            return mergeRecords<UserGameProfilesState, UserGameProfile, 'userGameProfileId'>(
                state,
                action.payload,
                'userGameProfileId'
            )
        case getType(putUserGameProfileAction.success):
            return mergeRecord<UserGameProfilesState, UserGameProfile, 'userGameProfileId'>(
                state,
                action.payload,
                'userGameProfileId'
            )
        case getType(deleteUserGameProfileAction.success):
            return deleteRecord<UserGameProfilesState, UserGameProfile>(state, action.payload)
        default:
            return state
    }
}
