import { combineEpics, Epic } from 'redux-observable'
import RootAction from '../actions'
import { RootState } from '../reducers'

import * as UserGameProfilesEpics from './userGameProfile'

export type RootEpic = Epic<RootAction, RootAction, RootState, any>

export default combineEpics(
  ...Object.values(UserGameProfilesEpics)
)