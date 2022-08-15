import axios from "axios";
import {AppDispatch} from "./store";
import {
    ClearUsersType,
    FetchingNewItems,
    getAllRepoByUser,
    InterfaceResponse,
    IUser,
    UserInformFetched,
    UserInformError,
    UserAction,
    UserActionTypes,
    UsersFetched,
    UsersFetching,
    UsersFetchingError,
    UserState
} from "../@types/types";

const _baseUrl = 'https://api.github.com';
const _clientKey = 'be3bef0f52261b3be3f9';
const _secretKey = 'ccf13dc5953b3987964651d029d41e51b57ef87f';
//&client_id=${_clientKey}&client_secret=${_secretKey}

export const _withCreds = (url: string) => {
    return `${_baseUrl}${url}`
}

const _transformRepo = (item: any) => {
    return {
        forks: item.forks,
        repoName: item.name,
        stars: item.stargazers_count
    }
}

export const fetchUsers = ({value, page}: { value: string; page: number; }) =>
    async (dispatch: AppDispatch) => {
        try {
            const {data} = await axios.get<InterfaceResponse>(_withCreds(`/search/users?q=${value}&per_page=4&page=${page}`))
            dispatch(usersFetched(data.items.map((item) => item.login)))
        } catch (e) {
            dispatch(usersFetchingError())
        }
    }


export const fetchReadyUsers = (value: string[]) => async (dispatch: AppDispatch) => {
    try {
       const data = await axios.all(value.map((endpoint) => axios.get(endpoint)))
        dispatch(userInformFetched(data.map((item) => item.data)))
    } catch (e) {
        dispatch(userInformError())
    }
}

export const getAllRepo = ({ value, login}: { value: string; login: string; }) => async (dispatch: AppDispatch) => {
    try {
        const {data} = await axios.get(_withCreds(`/search/repositories?q=${value}+user:${login}`)) //https://api.github.com/search/repositories?q=+user:DmytroSteblak

        dispatch(getAllRepos(data.items.map(_transformRepo)))
    } catch (e) {
        console.log('ОШиька', e)
    }
}

const initialState: UserState = {
    usersLogin: [],
    usersLoadingStatus: 'idle',
    readyUsers: [],
    fetching: false,
    repos: []
}


export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.USERS_FETCHING:
            return {
                ...state,
                usersLoadingStatus: 'loading'
            }
        case UserActionTypes.USERS_FETCHED:
            if (action.payload.length < 1) {
                return {
                    ...state,
                    usersLoadingStatus: 'error',
                    readyUsers: [],
                    repos: []
                }
            }
            return {
                ...state,
                usersLogin: action.payload,
            }
        case UserActionTypes.USERS_FETCHING_ERROR:
            return {
                ...state,
                usersLoadingStatus: 'error'
            }
        case UserActionTypes.USER_INFORM_FETCHED:
            const addUsers = state.fetching ? [...state.readyUsers, ...action.payload] : action.payload;
            return {
                ...state,
                readyUsers: addUsers,
                usersLoadingStatus: 'idle',
                fetching: false
            }
        case UserActionTypes.USER_INFORM_ERROR:
            return {
                ...state,
                usersLoadingStatus: 'error'
            }
        case UserActionTypes.FETCHING_NEW_ITEM:
            return {
                ...state,
                fetching: action.payload
            }
        case UserActionTypes.GET_ALL_REPOS:
            return {
                ...state,
                repos: action.payload
            }
        case UserActionTypes.CLEAR_USERS:
            return {
                ...state,
                usersLogin: [],
                readyUsers: [],
                repos: []
            }
        default:
            return state
    }

}

export const usersFetching = (): UsersFetching => {
    return {
        type: UserActionTypes.USERS_FETCHING
    }
}

export const usersFetched = (payload: string[]): UsersFetched => {
    return {
        type: UserActionTypes.USERS_FETCHED,
        payload
    }
}

export const usersFetchingError = (): UsersFetchingError => {
    return {
        type: UserActionTypes.USERS_FETCHING_ERROR
    }
}

export const userInformFetched = (payload: IUser[]): UserInformFetched => {
    return {
        type: UserActionTypes.USER_INFORM_FETCHED,
        payload
    }
}

export const userInformError = (): UserInformError => {
    return {
        type: UserActionTypes.USER_INFORM_ERROR
    }
}

export const setFetching = (payload: boolean): FetchingNewItems => {
    return {
        type: UserActionTypes.FETCHING_NEW_ITEM,
        payload
    }
}

export const getAllRepos = (payload: boolean): getAllRepoByUser => {
    return {
        type: UserActionTypes.GET_ALL_REPOS,
        payload
    }
}
export const clearUsers = (): ClearUsersType => ({type: UserActionTypes.CLEAR_USERS})

