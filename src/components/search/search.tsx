import React, {useEffect, useState} from 'react';

import './search.scss';
import {fetchUsers, setFetching, usersFetching} from "../../store/UserSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/useRedux";


const Search: React.FC = () => {

    const {fetching} = useAppSelector(state => state.users)

    const [name, setName] = useState('')
    const [page, setPage] = useState(1)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (name.length) {
            dispatch(usersFetching());
            dispatch(fetchUsers({name, page}))
            setPage(prevState => prevState + 1)
        }

    }, [name])


    useEffect(() => {

        if (fetching) {
            dispatch(fetchUsers({name, page}))
            setPage(prevState => prevState + 1)

        }
    }, [fetching])




    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return () => {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    const scrollHandler = (e: any) => {
        const event = e.target.documentElement;
        if (event.scrollHeight - (event.scrollTop + window.innerHeight) < 10) {
            // @ts-ignore
            dispatch(setFetching(true))
        }
    }

    return (
        <div className="search__form">
            <input
                value={name}
                onChange={event => setName(event.target.value)}
                type="text"
                placeholder="Search For UserName"
                name="login"
                id="login"
            />
        </div>
    );
};

export default Search;
