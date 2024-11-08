import React from "react";
import {LoginDetails} from "../models/LoginDetails";
import {authService} from "../services/AuthService";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [loginDetails, setLoginDetails] = React.useState<LoginDetails>({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();

        authService.login(loginDetails).then((success) => {
            if (success) {
                console.log("Login successful");
                navigate("/matcher");
            } else {
                console.log("Login failed");
            }
        });
    };

    return (
        <div>
            <h1>Login</h1>
            <form>
                <input type="email" placeholder="E-mail" onChange={(e) => {
                    setLoginDetails({...loginDetails, email: e.target.value});
                }}/>
                <input type="password" placeholder="Password" onChange={(e) => {
                    setLoginDetails({...loginDetails, password: e.target.value});
                }}/>
                <button onClick={handleSubmit}>Login</button>
            </form>
        </div>
    );
};

export default Login;