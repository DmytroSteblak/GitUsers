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
    usersError: string;
    repos?: any;
}



export interface IRepos {
    forks: number;
    repoName: string;
    stars: number;
}
export interface IReposState {
    repos: IRepos[],
    reposLoadingStatus: 'idle' | 'loading' | 'error',
    reposError: string,
}

export interface InterfaceReposAnswer {
    incomplete_results: boolean;
    items: any;
    total_count: number;
}

export interface IRepos {
    forks: number;
    name: string;
    stargazers_count: number;
}
