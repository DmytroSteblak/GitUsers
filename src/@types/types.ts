export interface IUser {
    avatar_url: string;
    bio?: string;
    blog?: string;
    company?: string;
    created_at: string;
    email?: string;
    events_url: string;
    followers: number;
    followers_url: string;
    following: number;
    following_url: string;
    gists_url: string;
    gravatar_id: string;
    hireable?: string;
    html_url: string;
    id: number;
    location: string;
    login: string;
    name: string;
    node_id: string;
    organizations_url: string;
    public_gists: number;
    public_repos: number;
    received_events_url: string;
    repos_url: string;
    site_admin: boolean;
    starred_url: string;
    subscriptions_url: string;
    twitter_username?: string;
    type: string;
    updated_at: string;
    url: string;
}

export interface IUserLogin {
    avatar_url: string;
    events_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    gravatar_id: string;
    html_url: string;
    id: number;
    login: string;
    node_id: string;
    organizations_url: string;
    received_events_url: string;
    repos_url: string;
    score: number;
    site_admin: boolean;
    starred_url: string;
    subscriptions_url: string;
    type: string;
    url: string;
}

export interface InterfaceResponse {
    incomplete_results: boolean;
    items: IUserLogin[]
    total_count: number
}

export interface UserState {
    usersLogin: string[];
    readyUsers: IUser[];
    usersLoadingStatus: string;
    fetching: boolean;
    repos: any;
}

export interface UsersFetching {
    type: UserActionTypes.USERS_FETCHING;
}

export interface UsersFetched {
    type: UserActionTypes.USERS_FETCHED;
    payload: string[];
}

export interface UsersFetchingError {
    type: UserActionTypes.USERS_FETCHING_ERROR;
}

export interface UserInformFetched {
    type: UserActionTypes.USER_INFORM_FETCHED;
    payload: IUser[];
}

export interface UserInformError {
    type: UserActionTypes.USER_INFORM_ERROR;
}

export interface FetchingNewItems {
    type: UserActionTypes.FETCHING_NEW_ITEM;
    payload: boolean;
}

export interface ClearUsersType {
    type: UserActionTypes.CLEAR_USERS
}

export interface getAllRepoByUser {
    type: UserActionTypes.GET_ALL_REPOS;
    payload: any
}

export enum UserActionTypes {
    USERS_FETCHING = "USERS_FETCHING",
    USERS_FETCHED = "USERS_FETCHED",
    USERS_FETCHING_ERROR = "USERS_FETCHING_ERROR",
    USER_INFORM_FETCHED = "USER_INFORM_FETCHED",
    USER_INFORM_ERROR = "USER_INFORM_ERROR",
    FETCHING_NEW_ITEM = "FETCHING_NEW_ITEM",
    CLEAR_USERS = "CLEAR_USERS",
    GET_ALL_REPOS = "GET_ALL_REPOS"
}


export type UserAction = UsersFetching | UsersFetched | UsersFetchingError | UserInformFetched | UserInformError | FetchingNewItems | getAllRepoByUser | ClearUsersType;
