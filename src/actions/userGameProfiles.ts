import { createAsyncAction } from 'typesafe-actions'
import {
    UserGameProfile, UserGameProfileCreateModel,
} from '../models/userGameProfile'
import { HttpErrorResponse } from '../services/http'

export const fetchUserGameProfilesByUserIdAction = createAsyncAction(
    'FETCH_USERGAMEPROFILES_BY_USER_ID_REQUEST',
    'FETCH_USERGAMEPROFILES_BY_USER_ID_SUCCESS',
    'FETCH_USERGAMEPROFILES_BY_USER_ID_FAILURE'
)<
    string,
    UserGameProfile[],
    HttpErrorResponse
>()

export const putUserGameProfileAction = createAsyncAction(
    'POST_USERGAMEPROFILE_REQUEST',
    'POST_USERGAMEPROFILE_SUCCESS',
    'POST_USERGAMEPROFILE_FAILURE'
)<
    UserGameProfileCreateModel,
    UserGameProfile,
    HttpErrorResponse
>()

export const deleteUserGameProfileAction = createAsyncAction(
    'DELETE_USERGAMEPROFILE_REQUEST',
    'DELETE_USERGAMEPROFILE_SUCCESS',
    'DELETE_USERGAMEPROFILE_FAILURE'
)<
    number,
    number,
    HttpErrorResponse
>()