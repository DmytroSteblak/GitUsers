import React, {useEffect, useMemo} from 'react';
import UserItem from "../userItem/userItem";
import {createSelector} from '@reduxjs/toolkit'

import './usersList.scss'
import {useAppSelector} from "../../hooks/useRedux";
import {_withCreds} from "../../store/UserSlice";
import {RootState} from "../../store/store";
import {useActions} from "../../hooks/useActions";
import Search from "../search/search";
import {IUser} from "../../@types/types";


const UsersList: React.FC = () => {

    const {fetchReadyUsers, fetchUsers} = useActions();

    const userReselector = createSelector(
        (state: RootState) => state.users.usersLogin,
        (items) => items
    )

    const users = useAppSelector(userReselector)
    const {readyUsers, usersLoadingStatus} = useAppSelector(state => state.users)

    const logins = useMemo(() => users.length !== 0 && users
        .map((item: string) => _withCreds(`/users/${item}?`)), [users])


    useEffect(() => {
        if (logins) {
            fetchReadyUsers(logins)
        }
    }, [logins])



    let noItems = usersLoadingStatus === 'error' ? <div>Неє нихуя</div> : null;

    return (
        <>
            <Search searchHandler={fetchUsers} typeProps='users'/>
            <ul className="users__list">
                {noItems}
                {usersLoadingStatus === 'loading' ? <h2>LOADING</h2> :
                    readyUsers.map((item: IUser) => (
                        <UserItem key={item.id} {...item} />
                    ))}
            </ul>
        </>
    );
};

export default UsersList;
