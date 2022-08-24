import {configureStore} from '@reduxjs/toolkit'
import userReducer from './usersSlice'
import reposReducer from './reposSlice'
import {userAPI} from "../services/UserService";


let store = configureStore({
    reducer: {
        [userAPI.reducerPath]: userAPI.reducer,
        users: userReducer,
        repos: reposReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(userAPI.middleware),
    devTools: process.env.NODE_ENV !== 'production',
})


export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
