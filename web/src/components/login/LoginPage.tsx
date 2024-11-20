import React from "react";
import {LoginDetails} from "../../models/LoginDetails";
import {authService} from "../../services/AuthService";
import {Link, useNavigate} from "react-router-dom";
import "./LoginPage.scss";
import {userService} from "../../services/UserService";

const LoginPage = () => {
    const [loginDetails, setLoginDetails] = React.useState<LoginDetails>({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = React.useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        authService.login(loginDetails).then((success) => {
            if (success) {
                console.log("Login successful");
                setTimeout(() => {
                    userService.getAuthenticatedUser().then((user) => {
                        localStorage.setItem("onboard_status", JSON.stringify(user.isOnboarded));
                        if (!user.isOnboarded) {
                            setIsLoading(false);
                            navigate("/onboarding");
                            return;
                        }
                        setIsLoading(false);
                        navigate("/matcher");
                    });
                }, 500);
            } else {
                console.log("Login failed");
                setIsLoading(false);
            }
        });
    };

    return (
        <div className="page-background">
            <div className="login-form-container">
                <div className="login-title">
                    <b>Login</b>
                    <p>Don’t have an account? <Link className="register-link" to="/register">Create your free account here.</Link></p>
                </div>
                <div className="input-fields">
                    <input type="email" placeholder="E-mail" onChange={(e) => {
                        setLoginDetails({...loginDetails, email: e.target.value});
                    }}/>
                    <input type="password" placeholder="Password" onChange={(e) => {
                        setLoginDetails({...loginDetails, password: e.target.value});
                    }}/>
                </div>
                <button style={{cursor: isLoading ? "default" : "cursor"}} disabled={isLoading} onClick={handleSubmit}>
                    {isLoading ? "Loading..." : "Login"}
                </button>
            </div>
        </div>
    );
};

export default LoginPage;