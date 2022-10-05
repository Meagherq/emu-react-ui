import { createAction } from 'typesafe-actions'
import { AADUser } from '../models/users'

export const setAuthenticatedUserAction = createAction('SET_AUTHENTICATED_USER')<AADUser>()