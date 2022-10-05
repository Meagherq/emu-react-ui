import { combineReducers } from 'redux'
import { StateType } from 'typesafe-actions'
import userGameProfilesReducer from './userGameProfiles'
import authReducer from './auth'
import statusReducer from './status'

const rootReducer = combineReducers({
    userGameProfiles: userGameProfilesReducer,
    auth: authReducer,
    status: statusReducer,
})

export type RootState = StateType<typeof rootReducer>

export default rootReducer