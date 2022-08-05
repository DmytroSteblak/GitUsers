import axios from "axios";
import {ThunkAction} from 'redux-thunk'
import {RootState} from "./store";
import {IUser, UserAction, UserActionTypes, UserState} from "../@types/types";
import {Dispatch} from 'redux';
import {Action} from "redux";

const _baseUrl = 'https://api.github.com';
const _clientKey = 'be3bef0f52261b3be3f9';
const _secretKey = 'ccf13dc5953b3987964651d029d41e51b57ef87f';

export const withCreds = (url: string) => {
    return `${_baseUrl}${url}&client_id=${_clientKey}&client_secret=${_secretKey}`
}

export const fetchUsers = ({name, page}: { name: string; page: number; }): ThunkAction<void, RootState, unknown, Action<UserActionTypes>> =>
    async (dispatch) => {
        try {
            const {data} = await axios.get(withCreds(`/search/users?q=${name}&per_page=4&page=${page}`))
            dispatch(usersFetched(data.items.map((item: any) => item.login)))
        } catch (e) {
            dispatch(usersFetchingError())
        }
    }


export const fetchRepo = (value: string[]): ThunkAction<void, RootState, unknown, Action<UserActionTypes>> => (dispatch) => {
    axios.all(value.map((endpoint) => axios.get(endpoint)))
        .then((data) => dispatch(repoFetched(data.map((item) => item.data))))
        .catch(() => dispatch(repoFetchingError()))
}

const initialState: UserState = {
    usersLogin: [],
    usersLoadingStatus: 'idle',
    readyUsers: [],
    fetching: false,
}


export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.USERS_FETCHING:
            return {
                ...state,
                usersLoadingStatus: 'loading'
            }
        case UserActionTypes.USERS_FETCHED:
            return {
                ...state,
                usersLogin: action.payload,
            }
        case UserActionTypes.USERS_FETCHING_ERROR:
            return {
                ...state,
                usersLoadingStatus: 'error'
            }
        case UserActionTypes.REPO_FETCHED:
            const addUsers = state.fetching ? [...state.readyUsers, ...action.payload] : action.payload;
            return {
                ...state,
                readyUsers: addUsers,
                usersLoadingStatus: 'idle',
                fetching: false
            }
        case UserActionTypes.REPO_FETCHING_ERROR:
            return {
                ...state,
                usersLoadingStatus: 'error'
            }
        case UserActionTypes.FETCHING_NEW_ITEM:
            return {
                ...state,
                fetching: action.payload
            }
        default:
            return state
    }

}

export const usersFetching = () => {
    return {
        type: UserActionTypes.USERS_FETCHING
    }
}

export const usersFetched = (payload: string[]) => {
    return {
        type: UserActionTypes.USERS_FETCHED,
        payload
    }
}

export const usersFetchingError = () => {
    return {
        type: UserActionTypes.USERS_FETCHING_ERROR
    }
}

export const repoFetched = (payload: IUser[]) => {
    return {
        type: UserActionTypes.REPO_FETCHED,
        payload
    }
}

export const repoFetchingError = () => {
    return {
        type: UserActionTypes.REPO_FETCHING_ERROR
    }
}

export const setFetching = (payload: boolean) => {
    return {
        type: UserActionTypes.FETCHING_NEW_ITEM,
        payload
    }
}

