import { ActionType } from 'typesafe-actions'

import * as UserGameProfilesActions from './userGameProfiles'
import * as AuthActions from './auth'
import * as UIActions from './ui'

export type AuthAction = ActionType<typeof AuthActions>
export type UserGameProfilesAction = ActionType<typeof UserGameProfilesActions>
export type UIAction = ActionType<typeof UIActions>

type RootAction =
    | AuthAction
    | UserGameProfilesAction
    | UIAction

export default RootAction