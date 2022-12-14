import React, {ChangeEvent, useCallback, useEffect, useMemo, useState} from 'react';
import {debounce} from 'lodash';
import './search.scss';
import {setNewItems, usersFetching} from "../../store/usersSlice";
import {useAppDispatch, useAppSelector,} from "../../hooks/useRedux";
import {reposFetching} from "../../store/reposSlice";

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


    // const data = useFetchUsersLoginQuery({value, page}, {
    //     skip: value.length < 1,
    //     refetchOnFocus: true,
    // })
    console.log('dDDDDAAA',)




    const setNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPage(1);
        setValue(value)
        if (!value) {
        } else {
            debouceType(value)
        }
    }

    const handleSearchDebounced = useMemo(() => debounce(setNameHandler, 800), []);

    const debouceType = (value: string) => {
        setPage(prevState => prevState + 1)
        switch (typeProps) {
            case "users":
                dispatch(usersFetching())
                searchHandler({value, page});
                break
            case "repo":
                dispatch(reposFetching())
                searchHandler({value, login});
                break
            default:
                return
        }
    }

    useEffect(() => {
        if (fetching && value) {
            debouceType(value)
        }
    }, [fetching])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return () => {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    const scrollHandler = useCallback((e: any) => {
        const event = e.target.documentElement;
        if (event.scrollHeight - (event.scrollTop + window.innerHeight) < 10) {
            dispatch(setNewItems(true))
        }
    }, [])

    return (
        <div className="search__form">
            <input
                defaultValue={value}
                onChange={handleSearchDebounced}
                type="text"
                placeholder="Search For UserName"
                name="login"
                id="login"
            />
        </div>
    );
};

export default Search;
