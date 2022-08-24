import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {_withCreds} from "./usersSlice";
import {IRepos, IReposState, InterfaceReposAnswer} from "../@types/types";

const initialState: IReposState = {
    repos: [],
    reposLoadingStatus: 'idle',
    reposError: ''
}

const _transformRepo = (item: IRepos) => {
    return {
        forks: item.forks,
        repoName: item.name,
        stars: item.stargazers_count
    }
}

export const getAllRepo = createAsyncThunk(
    'repos/fetchAll',
    async ({value, login}: any) => {
        const {data} = await axios.get<InterfaceReposAnswer>(_withCreds(`/search/repositories?q=${value}+user:${login}`))
        return data.items.map(_transformRepo)
    }
)

export const reposSlice = createSlice({
    name: 'repos',
    initialState,
    reducers: {
        reposFetching: state => {
            state.reposLoadingStatus = 'loading'
        },
    },
    extraReducers: {
        [getAllRepo.fulfilled.type]: (state, action: PayloadAction<IRepos[]>) => {
            if (!action.payload.length) {
                debugger
                state.reposLoadingStatus = 'error'
                state.repos = []
            } else {
                state.reposLoadingStatus = 'idle'
                state.reposError = ''
                state.repos = action.payload
            }
        },
        [getAllRepo.rejected.type]: (state, action: PayloadAction<string>) => {
            state.reposLoadingStatus = 'error'
            state.reposError = action.payload
        }
    }
})

export const { reducer, actions } = reposSlice;
export default reducer;
export const {
    reposFetching,
} = actions;


