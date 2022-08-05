import {legacy_createStore as createStore, combineReducers, compose, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk'
import {userReducer} from './UserSlice'

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({users: userReducer}),
    compose(applyMiddleware(ReduxThunk), composeEnhancers())
);


export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
