import React from "react";
import {useState} from "react";
import {userService} from "../../services/UserService";
import {User} from "../../models/User";
import {Link} from "react-router-dom";
import "./RegisterPage.scss";
import {authService} from "../../services/AuthService";

const RegisterPage = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        const newUser: User = {
            username: user.username,
            email: user.email,
            password: user.password,
        };

        userService.createUser(newUser).then((response) => {
            if (![200, 201].includes(response.status)) {
                console.error(response.message);
                setIsLoading(false);
            } else {
                setTimeout(() => {
                    authService.login({email: user.email, password: user.password}).then((success) => {
                        if (success) {
                            setIsLoading(false);
                            // @todo navigate to onboarding
                        } else {
                            console.log("Login failed");
                        }
                    });
                }, 500);
            }
        });
    }

    return (
        <div className="page-background">
            <div className="register-form-container">
                <div className="login-title">
                    <b>Create an account</b>
                    <p>Already have an account? <Link className="register-link" to="/login">Log in here.</Link></p>
                </div>
                <div className="input-fields">
                    <input type="text" placeholder="Username" onChange={(e) => {
                        setUser({...user, username: e.target.value});
                    }}/>
                    <input type="email" placeholder="E-mail" onChange={(e) => {
                        setUser({...user, email: e.target.value});
                    }}/>
                    <input type="password" placeholder="Password" onChange={(e) => {
                        setUser({...user, password: e.target.value});
                    }}/>
                    <input type="password" placeholder="Repeat password" onChange={(e) => {
                        setUser({...user, passwordConfirmation: e.target.value});
                    }}/>
                </div>
                <button style={{cursor: isLoading ? "default" : "cursor"}} disabled={isLoading} onClick={handleSubmit}>
                    {isLoading ? "Loading..." : "Submit"}
                </button>
            </div>
        </div>
    )
}

export default RegisterPage;