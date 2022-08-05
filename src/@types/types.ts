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

export interface UserState {
    usersLogin: string[];
    readyUsers: IUser[];
    usersLoadingStatus: string;
    fetching: boolean;
}


interface UsersFetching {
    type: UserActionTypes.USERS_FETCHING;
}

interface UsersFetched {
    type: UserActionTypes.USERS_FETCHED;
    payload: string[];
}

interface UsersFetchingError {
    type: UserActionTypes.USERS_FETCHING_ERROR;
}

interface RepoFetched {
    type: UserActionTypes.REPO_FETCHED;
    payload: IUser[];
}

interface RepoFetchingError {
    type: UserActionTypes.REPO_FETCHING_ERROR;
}

interface FetchingNewItems {
    type: UserActionTypes.FETCHING_NEW_ITEM;
    payload: boolean;
}

export enum UserActionTypes {
    USERS_FETCHING = "USERS_FETCHING",
    USERS_FETCHED = "USERS_FETCHED",
    USERS_FETCHING_ERROR = "USERS_FETCHING_ERROR",
    REPO_FETCHED = "REPO_FETCHED",
    REPO_FETCHING_ERROR = "REPO_FETCHING_ERROR",
    FETCHING_NEW_ITEM = "FETCHING_NEW_ITEM",
}


export type UserAction = UsersFetching | UsersFetched | UsersFetchingError | RepoFetched | RepoFetchingError | FetchingNewItems;
