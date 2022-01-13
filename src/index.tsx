import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import Character from './components/Character';
import './styles/styles.scss';

ReactDOM.render(
    <Router basename="/marvel">
        <Header />
        <div id="container">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:characterId" element={<Character />} />
            </Routes>
        </div>
    </Router>,
    document.getElementById('root')
);