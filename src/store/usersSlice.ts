import axios from "axios";
import {
    InterfaceResponse,
    IUser,
    UserState,
} from "../@types/types";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const _baseUrl = 'https://api.github.com';
const _clientKey = 'be3bef0f52261b3be3f9';
const _secretKey = 'ccf13dc5953b3987964651d029d41e51b57ef87f';


export const _withCreds = (url: string) => {
    return `${_baseUrl}${url}&client_id=${_clientKey}&client_secret=${_secretKey}`
}

// export const fetchUsers = ({value, page}: { value: string; page: number; }) => async (dispatch: AppDispatch) => {
//     try {
//         const {data} = await axios.get<InterfaceResponse>(_withCreds(`/search/users?q=${value}&per_page=4&page=${page}`))
//         dispatch(usersFetched(data.items.map((item) => item.login)))
//     } catch (e) {
//         if (e instanceof Error) {
//             debugger
//             dispatch(usersError(e.message))
//         }
//     }
// }
export const fetchUsersLogin = createAsyncThunk(
    'users/fetchLogin',
    async ({value, page}: { value: string, page: number }, thunkApi) => {
        try {
            const {data} = await axios.get<InterfaceResponse>(_withCreds(`/search/users?q=${value}&per_page=4&page=${page}`))
            return data.items.map((item) => item.login)
        } catch (e) {
            if (e instanceof Error) {
                return thunkApi.rejectWithValue(e.message)
            }
        }

    }
)
export const fetchReadyUsers = createAsyncThunk(
    'users/fetchReadyUsers',
    async (value: string[], thunkApi) => {
        try {
            const data = await axios.all(value.map((endpoint) => axios.get<IUser>(endpoint)))
            return data.map((item) => item.data)
        } catch (e) {
            if (e instanceof Error) {
                return thunkApi.rejectWithValue(e.message)
            }
        }
    }
)

// export const fetchReadyUsers = (value: string[]) => async (dispatch: AppDispatch) => {
//     try {
//         const data = await axios.all(value.map((endpoint) => axios.get<IUser>(endpoint)))
//         dispatch(usersAllInformFetched(data.map((item) => item.data)))
//     } catch (e) {
//         if (e instanceof Error) {
//             debugger
//             dispatch(usersError(e.message))
//         }
//     }
// }


const initialState: UserState = {
    usersLogin: [],
    usersLoadingStatus: 'idle',
    readyUsers: [],
    fetching: false,
    usersError: ''
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        usersFetching: state => {
            state.usersLoadingStatus = 'loading'
        },
        // usersFetched: (state, action: PayloadAction<string[]>) => {
        //     if (!action.payload.length) {
        //         state.usersLoadingStatus = 'error'
        //         state.readyUsers = []
        //     }
        //     state.usersLogin = action.payload
        // },
        // usersError: (state, action: PayloadAction<string>) => {
        //     state.usersLoadingStatus = 'error'
        //     state.usersError = action.payload
        // },
        // usersAllInformFetched: (state, action: PayloadAction<IUser[]>) => {
        //     state.usersLoadingStatus = 'idle'
        //     state.fetching ? state.readyUsers = [...state.readyUsers, ...action.payload] : state.readyUsers = action.payload
        //     state.fetching = false
        // },
        setNewItems: (state, action) => {
            state.fetching = action.payload
        },
        clearUsers: state => {
            state.usersLoadingStatus = 'idle'
            state.usersLogin = []
            state.readyUsers = []
        }
    },
    extraReducers: {
        [fetchUsersLogin.fulfilled.type]: (state, action: PayloadAction<string[]>) => {
            if (!action.payload.length) {
                state.usersLoadingStatus = 'idle'
                state.readyUsers = []
            }
            state.usersLogin = action.payload
        },
        [fetchUsersLogin.rejected.type]: (state, action: PayloadAction<string>) => {
            state.usersLoadingStatus = 'error'
            state.usersError = action.payload + '...IN Login'
        },
        [fetchReadyUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
            state.usersLoadingStatus = 'idle'
            state.fetching ? state.readyUsers = [...state.readyUsers, ...action.payload] : state.readyUsers = action.payload
            state.fetching = false
        },
        [fetchReadyUsers.rejected.type]: (state, action: PayloadAction<string>) => {
            state.usersLoadingStatus = 'error'
            state.usersError = action.payload + '...IN readyUsers'
        },
    }
})

const {actions, reducer} = usersSlice;
export default reducer;
export const {
    usersFetching,
    clearUsers,
    setNewItems
} = actions;
