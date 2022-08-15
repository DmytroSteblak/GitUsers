import React from 'react';

import './userItem.scss';
import {Link} from "react-router-dom";

interface IUserItem {
    avatar_url: string;
    login: string;
    public_repos: number;
    id: number;
}

const UserItem: React.FC<IUserItem> = ({avatar_url, login, public_repos, id}) => {
    return (
        <Link className="user__item" to={`user/${id}`}>
            <li>
                <div>
                    <img src={avatar_url} alt={avatar_url} />
                </div>
                <div className="user__item-name">
                    {login}
                </div>
                <div className="user__item-repo">
                    public_repos: {public_repos}
                </div>
            </li>
        </Link>
    );
};

export default UserItem;
