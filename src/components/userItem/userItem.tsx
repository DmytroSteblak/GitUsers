import React from 'react';

import './userItem.scss';

const UserItem: React.FC<any> = ({avatar_url, login, public_repos}) => {
    return (
        <li className="user__item">
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
    );
};

export default UserItem;
