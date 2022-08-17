import React from 'react';

import './header.scss';
import {useAppSelector} from "../../hooks/useRedux";

const Header: React.FC = () => {

    return (
        <header  className="app__header">
            GitHub Searcher
        </header>
    );
};

export default Header;
