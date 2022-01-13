import React from 'react';
import ReactDOM from 'react-dom';
import {
    Routes,
    Route,
    HashRouter
} from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import Character from './components/Character';
import './styles/styles.scss';

ReactDOM.render(
    <HashRouter>
        <Header />
        <div id="container">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:characterId" element={<Character />} />
            </Routes>
        </div>
    </HashRouter>,
    document.getElementById('root')
);