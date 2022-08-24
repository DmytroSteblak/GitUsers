import React, {useEffect, useMemo} from 'react';
import {createSelector} from '@reduxjs/toolkit'

import UserItem from "../userItem/userItem";
import Search from "../search/search";

import {useAppSelector} from "../../hooks/useRedux";
import {_withCreds} from "../../store/usersSlice";
import {RootState} from "../../store/store";
import {useActions} from "../../hooks/useActions";
import {IUser} from "../../@types/types";
import './usersList.scss';

const UsersList: React.FC = () => {

    const {fetchReadyUsers, fetchUsersLogin} = useActions();

    const userReselector = createSelector(
        (state: RootState) => state?.users?.usersLogin,
        (items) => items
    )

    const users = useAppSelector(userReselector)
    const {readyUsers, usersLoadingStatus, usersError} = useAppSelector(state => state?.users)

    const logins = useMemo(() => users.length !== 0 && users
        .map((item: string) => _withCreds(`/users/${item}?`)), [users])


    useEffect(() => {
        if (logins) {
            fetchReadyUsers(logins)
        }
    }, [logins])

    function renderItems(arr: IUser[]) {
        const items = arr.map((item: IUser) => {
            return <UserItem key={item.id} {...item} />
        })

        return (
            <ul className="users__list">
                {items}
            </ul>
        )
    }

    let items = readyUsers.length ? renderItems(readyUsers) : null;
    let loading = usersLoadingStatus === 'loading' ? <div className='users__info'>Loading</div> : null;

    let error
    if (usersError) {
        error = <div className='users__info'>{usersError}</div>
    } else if (usersLoadingStatus === 'error') {
        error = <div className='users__info'>Неє нихуя</div>
    }

    return (
        <div className="users">
            <Search searchHandler={fetchUsersLogin} typeProps='users'/>
            {items}
            {error}
            {loading}
        </div>
    );
};

export default UsersList;
