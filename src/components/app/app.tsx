import React, {useState} from 'react';
import Header from "../header/header";
import Search from "../search/search";
import UsersList from "../usersList/usersList";

function App() {


    return (
        <main className="app">
            <Header />
            <Search />
            <UsersList />
        </main>
    );
}

export default App;
