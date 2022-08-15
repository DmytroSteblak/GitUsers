import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../hooks/useRedux";
import './itemPages.scss';
import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "../../store/store";
import {useActions} from "../../hooks/useActions";
import Search from "../search/search";

const ItemPages = () => {
    const [value, setValue] = useState<string>('')

    const history = useNavigate();

    let {id} = useParams<{ id: string }>();

    // @ts-ignore
    const userReselector = createSelector(
        (state: RootState) => state.users.readyUsers,
        (items) => items.find(item => item.id === Number(id))
    )
    let user = useAppSelector(userReselector)
    let {repos} = useAppSelector(state => state.users)

    const {getAllRepo} = useActions();
    console.log('user', user)
    useEffect(() => {
        if (!user) history('/')
        else {
            // getAllRepo({})
        }
    }, [])

    let data = user?.created_at.slice(0, 10)

    return (
        <div className="item__pages">
            <button onClick={() => history('/')}>Go Back</button>
            <div className="item__pages-info">
                <img src={user?.avatar_url} alt=""/>
                <ul className="item__pages-info-descr">
                    <li className="item__pages-info-descr-"><span>Login</span>: {user?.login}</li>
                    <li className="item__pages-info-descr-"><span>Email</span>: {user?.email}</li>
                    <li className="item__pages-info-descr-"><span>Join Data</span>: {data}</li>
                    <li className="item__pages-info-descr-"><span>Followers</span>: {user?.followers}</li>
                    <li className="item__pages-info-descr-"><span>Following</span>: {user?.following}</li>
                </ul>
            </div>
            <div className="item__pages-search">
                <h3>this is their biography. it may be long and needs to all fit</h3>
                <Search searchHandler={getAllRepo} typeProps='repo' login={user?.login}/>
                <ul className="item__pages-search-content">
                    {repos && repos.map((item: any, id: number) => {
                        return (
                            <li key={id}>
                                <div><span>Имя:</span> {item.repoName}</div>
                                <div><span>Forks:</span> {item.forks} Stars:{item.stars}</div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
};

export default ItemPages;