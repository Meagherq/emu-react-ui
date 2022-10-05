import { getType } from 'typesafe-actions'
import { AuthAction } from '../actions'
import {
    setAuthenticatedUserAction,
} from '../actions/auth'
import { AuthStore, AuthState } from '../models/auth'

const initialState: AuthStore = { authenticated: false, user: null }
export default (state: AuthStore = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case getType(setAuthenticatedUserAction):
            return {
                authenticated: !!action.payload?.id?.length,
                user: action.payload,
            }
        default:
            return state
    }
}
