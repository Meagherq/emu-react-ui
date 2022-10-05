import { getType } from 'typesafe-actions'
import RootAction from '../actions'
import { clearStatusAction, setStatusAction } from '../actions/ui'

type StatusState = Readonly<string[]>

export default (state: StatusState = [], action: RootAction) => {
    switch (action.type) {
        case getType(setStatusAction):
            return [...state, action.payload]
        case getType(clearStatusAction):
            return state.slice(1)
        default:
            return state
    }
}
