import { Epic } from 'redux-observable'
import RootAction from '../actions'
import { RootState } from '../reducers'
import { isActionOf } from 'typesafe-actions'
import { from, of } from 'rxjs'
import { filter, mergeMap, map, catchError } from 'rxjs/operators'
import {
    putUserGameProfileAction,
    fetchUserGameProfilesByUserIdAction,
    deleteUserGameProfileAction,
} from '../actions/userGameProfiles'
import { UserGameProfilesApi } from '../middleware/userGameProfile'

type UserGameProfilesEpic = Epic<
    RootAction,
    RootAction,
    RootState,
    { userGameProfilesApi: UserGameProfilesApi }
>

export const putUserGameProfileEpic: UserGameProfilesEpic = (
    action$,
    state$,
    { userGameProfilesApi }
) => {
    return action$.pipe(
        filter(isActionOf(putUserGameProfileAction.request)),
        mergeMap((action) =>
            from(
                userGameProfilesApi.createUserGameProfile(action.payload)
            ).pipe(
                map((userGameProfile) =>
                    putUserGameProfileAction.success(userGameProfile)
                ),
                catchError((error) =>
                    of(putUserGameProfileAction.failure(error))
                )
            )
        )
    )
}

export const fetchUserGameProfilesByUserIdEpic: UserGameProfilesEpic = (
    action$,
    state$,
    { userGameProfilesApi }
) => {
    return action$.pipe(
        filter(isActionOf(fetchUserGameProfilesByUserIdAction.request)),
        mergeMap((action) =>
            from(
                userGameProfilesApi.getAllUserGameProfilesByUserId(action.payload)
            ).pipe(
                map((userGameProfiles) =>
                fetchUserGameProfilesByUserIdAction.success(userGameProfiles)
                ),
                catchError((error) =>
                    of(fetchUserGameProfilesByUserIdAction.failure(error))
                )
            )
        )
    )
}

export const deleteUserGameProfileEpic: UserGameProfilesEpic = (action$, state$, { userGameProfilesApi }) => {
    return action$.pipe(
      filter(isActionOf(deleteUserGameProfileAction.request)),
      mergeMap((action) =>
        from(userGameProfilesApi.deleteUserGameProfile(action.payload)).pipe(
          map(() => deleteUserGameProfileAction.success(action.payload)),
          catchError((error) => of(deleteUserGameProfileAction.failure(error)))
        )
      )
    )
  }