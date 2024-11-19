import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import RegisterPage from "./components/register/RegisterPage";
import HomePage from "./components/home/HomePage";
import SwipePage from "./components/matcher/SwipePage";
import LoginPage from "./components/login/LoginPage";
import OnboardingPage from "./components/onboarding/OnboardingPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path={'/register'} element={<RegisterPage/>}/>
                <Route path={'/login'} element={<LoginPage/>}/>
                <Route path={'/matcher'} element={<SwipePage/>}/>
                <Route path={'/onboarding'} element={<OnboardingPage/>}/>
                <Route path={'/'} element={<HomePage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
