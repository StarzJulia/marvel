import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import './styles/styles.scss';
import Header from './components/Header';

const Home = lazy(() => import('./components/Home'));
const Character = lazy(() => import('./components/Character'));

ReactDOM.render(
    <Router>
        <Header />
        <div id="container">
            <Suspense fallback={<h1>Loading Page...</h1>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:characterId" element={<Character />} />
                </Routes>
            </Suspense>
        </div>
    </Router>,
    document.getElementById('root')
);