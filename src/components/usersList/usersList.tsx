import React, {useEffect, useMemo} from 'react';
import {createSelector} from '@reduxjs/toolkit'

import UserItem from "../userItem/userItem";
import Search from "../search/search";

import {useAppSelector} from "../../hooks/useRedux";
import {_withCreds} from "../../store/usersSlice";
import {RootState} from "../../store/store";
import {useActions} from "../../hooks/useActions";
import {IUser} from "../../@types/types";
import './usersList.scss'

const UsersList: React.FC = () => {

    const {fetchReadyUsers, fetchUsersLogin} = useActions();

    const userReselector = createSelector(
        (state: RootState) => state.users.usersLogin,
        (items) => items
    )

    const users = useAppSelector(userReselector)
    const {readyUsers, usersLoadingStatus, usersError} = useAppSelector(state => state.users)
    console.log('ready', readyUsers)
    console.log('users', users)

    const logins = useMemo(() => users.length !== 0 && users
        .map((item: string) => _withCreds(`/users/${item}?`)), [users])


    useEffect(() => {
        if (logins) {
            fetchReadyUsers(logins)
        }
    }, [logins])


    let error
    if (usersError) {
        error = <div>{usersError}</div>
    } else if (usersLoadingStatus === 'error') {
        error = <div>Неє нихуя</div>
    }


        return (
        <>
            <Search searchHandler={fetchUsersLogin} typeProps='users'/>
            <ul className="users__list">
                {error}
                {usersLoadingStatus === 'loading' ? <h2>LOADING</h2> :
                    readyUsers.map((item: IUser) => (
                        <UserItem key={item.id} {...item} />
                    ))}
            </ul>
        </>
    );
};

export default UsersList;
