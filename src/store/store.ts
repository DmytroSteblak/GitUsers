import {configureStore} from '@reduxjs/toolkit'
import userReducer from './usersSlice'
import reposReducer from './reposSlice'


let store = configureStore({
    reducer: {users: userReducer, repos: reposReducer},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
})


export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
