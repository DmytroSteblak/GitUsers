import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {debounce} from 'lodash';
import './search.scss';
import {clearUsers, setFetching, usersFetching} from "../../store/UserSlice";
import {useAppDispatch, useAppSelector, } from "../../hooks/useRedux";

interface ISearchProps {
    searchHandler: any;
    typeProps: 'repo' | 'users';
    login?: string;
}
const Search: React.FC<ISearchProps> = ({searchHandler, typeProps, login}) => {
    const {fetching} = useAppSelector(state => state.users);
    const [value, setValue] = useState<string>('');
    const [page, setPage] = useState(1);

    const dispatch = useAppDispatch()

    const setNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const event = e.target.value;
        setPage(1);
        setValue(event)
        if (!event) {
            dispatch(clearUsers())
        } else {
            dispatch(usersFetching())
            debouceType(event);
        }
    }

    const debouceType = useCallback(
        debounce(
            (value: string) => {
                setPage(prevState => prevState + 1)
                switch (typeProps) {
                    case "users":
                        return  debouncedSearch({value, page});
                    case "repo":
                        return debouncedSearch({value, login});
                    default:
                        return
                }
            }, 500
        ), [])

    const debouncedSearch = useCallback(debounce(value => {
        searchHandler(value)
    }, 800), [])


    useEffect(() => {
        if (fetching) {
            debouceType(value)
        }
    }, [fetching])


    useEffect(() => {
        dispatch(clearUsers())
        document.addEventListener('scroll', scrollHandler)
        return () => {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    const scrollHandler = useCallback((e: any) => {
        const event = e.target.documentElement;
        if (event.scrollHeight - (event.scrollTop + window.innerHeight) < 10) {
            dispatch(setFetching(true))
        }
    }, [])

    return (
        <div className="search__form">
            <input
                value={value}
                onChange={setNameHandler}
                type="text"
                placeholder="Search For UserName"
                name="login"
                id="login"
            />
        </div>
    );
};

export default Search;
