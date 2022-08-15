import React from 'react';
import {
    Routes,
    Route,
} from "react-router-dom";
import Header from "../header/header";
import UsersList from "../usersList/usersList";
import ItemPages from "../itemPages/itemPages";

function App() {

    return (
        <main className="app">
            <Header/>
            <div className="app__content">
                <Routes>
                    <Route path="/" element={<UsersList/>}></Route>
                    <Route path="user/:id" element={<ItemPages/>}></Route>
                </Routes>
            </div>
        </main>
    );
}

export default App;
