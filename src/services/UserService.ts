import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import axios from "axios";
import {InterfaceResponse} from "../@types/types";

interface InterfaceTwo {
    items: any
}

interface InterfaceN {
    data: any,
    meta: any
}



export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.github.com'}),
    endpoints: (build) => ({
        fetchUsersLogin: build.query({
            query: ({value, page}) => `/search/users?q=${value}&per_page=4&page=${page}`
        }),
    }),
})



export const {useFetchUsersLoginQuery} = userAPI;
