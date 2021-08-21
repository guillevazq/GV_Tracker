import React, { useState, useContext, useEffect} from 'react';

// Context
import { AuthenticationContext } from '../../context/AuthenticationContext';

const Register = props => {

    // Instantiating the context
    const authenticationContext = useContext(AuthenticationContext);

    // Destructure it
    const {register, isLogged} = authenticationContext;

    const registerUser = e => {
        e.preventDefault();
        if (username !== "" && password1 !== "" && password2 !== "" && email !== "") {
            register(username, email, password1, password2);
        };
    };

    // Controlled inputs
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
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
    }, [isLogged]);

    const checkIfMatches = e => {
        setPassword2(e.target.value);
    };

    return (
        <div className="login-div">
            <div className="outer">
                <div className="middle">
                    <div className="inner">
                        <form className="form-login" action="POST" onSubmit={registerUser}>
                            <h3>Register</h3>
                            <div className="form-fields form-fields-register">
                                <div className="username-field">
                                    <small>Username</small>
                                    <input required type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} />
                                </div>
                                <div className="email-field">
                                    <small>Email</small>
                                    <input required type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div className="password-field">
                                    <small>Password</small>
                                    <input required type={passwordVisibility} name="password" id="password1" value={password1} onChange={e => setPassword(e.target.value)} />
                                    <button type="button" className="password-visibility" onClick={togglePasswordVisibility}>See password</button>
                                </div>
                                <div className="password-field">
                                    <small>Password Confirmation</small>
                                    <input required type={passwordVisibility} name="password" id="password2" value={password2} onChange={e => checkIfMatches(e)} />
                                    <button type="button" className="password-visibility" onClick={togglePasswordVisibility}>See password</button>
                                </div>
                                <button className="submit-btn-form" type="submit">Register</button>
                            </div>
                            <div className="help-anchortags">
                                <a href="/login">Already have an Account? Log in</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;