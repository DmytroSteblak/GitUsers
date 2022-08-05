import React, {useEffect, useMemo} from 'react';
import UserItem from "../userItem/userItem";
import {createSelector} from '@reduxjs/toolkit'

import './usersList.scss'
import {useAppDispatch, useAppSelector} from "../../hooks/useRedux";
import {fetchRepo, withCreds} from "../../store/UserSlice";
import {RootState} from "../../store/store";


const UsersList: React.FC = () => {

    const dispatch = useAppDispatch()

    const userReselector = createSelector(
        (state: RootState) => state.users.usersLogin,
        (items) => items
    )

    const users = useAppSelector(userReselector)
    const {readyUsers, usersLoadingStatus} = useAppSelector(state => state.users)



    const logins = useMemo( () => users.length !== 0 && users

        .map((item: string) => withCreds(`/users/${item}?`)), [users])



    useEffect(() => {
        if (logins) {
            dispatch(fetchRepo(logins))
        }
    }, [logins])
    //


//доробити лоадинг
    return (
        <ul className="users__list">
            {usersLoadingStatus === 'loading' ? <h2>LOADING</h2> :
                readyUsers.map((item: any) => (
                    <UserItem key={item.id} {...item} />
                ))}
        </ul>
    );
};

export default UsersList;
