import React, { useState, useContext, useEffect } from 'react';

// Context
import { AuthenticationContext } from '../../context/AuthenticationContext';

const Login = props => {

    // Instantiating the context
    const authenticationContext = useContext(AuthenticationContext);

    // Destructure it
    const { logIn, isLogged } = authenticationContext;

    const logInUser = e => {
        e.preventDefault();
        if (username !== "" && password !== "") {
            logIn(username, password);
        };
    };

    // Controlled inputs
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState("password");

    const togglePasswordVisibility = () => {
        if (passwordVisibility === "password") {
            setPasswordVisibility("text");
        } else {
            setPasswordVisibility("password");
        };
    };

    useEffect(() => {
        if (isLogged) {
            props.history.push("/");
        };
    }, [isLogged, props.history]);


    return (
        <div className="login-div">
            <form className="form-login" action="POST" onSubmit={logInUser}>
                <h3>Login</h3>
                <div className="form-fields">
                    <div className="username-field">
                        <small>Username</small>
                        <input type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className="password-field">
                        <small>Password</small>
                        <input type={passwordVisibility} name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                        <button type="button" className="password-visibility" onClick={togglePasswordVisibility}>See password</button>
                    </div>
                    <button className="submit-btn-form" type="submit">Log In</button>
                </div>
                <div className="help-anchortags">
                    <a href="/forgotpassword">Forgot Password?</a>
                    <a href="/register">Register</a>
                </div>
            </form>
        </div>
    );
};

export default Login;