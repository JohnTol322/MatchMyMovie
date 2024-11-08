import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register from "./components/Register";
import Login from "./components/Login";
import HomePage from "./components/home/HomePage";
import SwipePage from "./components/matcher/SwipePage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/matcher'} element={<SwipePage/>}/>
                <Route path={'/'} element={<HomePage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
