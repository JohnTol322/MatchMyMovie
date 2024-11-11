import React from "react";
import {useState} from "react";
import {userService} from "../services/UserService";
import {User} from "../models/User";

const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    });
    const [message, setMessage] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const newUser: User = {
            username: user.username,
            email: user.email,
            password: user.password,
        };

        userService.createUser(newUser).then((response) => {
            setMessage(response.message)
        });
    }

    return (
        <div>
            <h1>Register</h1>
            <b>{message}</b>
            <form>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" required onChange={(e) => {
                    setUser({
                        ...user,
                        username: e.target.value
                    })
                }}/>

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required onChange={(e) => {
                    setUser({
                        ...user,
                        email: e.target.value
                    })
                }}/>

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required onChange={(e) => {
                    setUser({
                        ...user,
                        password: e.target.value
                    })
                }}/>

                <label htmlFor="password-confirmation">Confirm Password</label>
                <input type="password" id="password-confirmation" name="password-confirmation" required onChange={(e) => {
                    setUser({
                        ...user,
                        passwordConfirmation: e.target.value
                    });
                }}/>

                <button onClick={handleSubmit} type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;