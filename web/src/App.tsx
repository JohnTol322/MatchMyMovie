import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register from "./components/Register";
import HomePage from "./components/home/HomePage";
import SwipePage from "./components/matcher/SwipePage";
import LoginPage from "./components/login/LoginPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'/login'} element={<LoginPage/>}/>
                <Route path={'/matcher'} element={<SwipePage/>}/>
                <Route path={'/'} element={<HomePage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
