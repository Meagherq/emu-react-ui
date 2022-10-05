import { createAction } from 'typesafe-actions'

export const clearStatusAction = createAction('CLEAR_STATUS')()
export const setStatusAction = createAction('SET_STATUS')<string>()
