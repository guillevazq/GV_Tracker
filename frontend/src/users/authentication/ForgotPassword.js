import React, { useState, useContext, useEffect } from 'react';

// Context
import { AuthenticationContext } from '../../context/AuthenticationContext';

const ForgotPassword = props => {

    // Instantiating the context
    const authenticationContext = useContext(AuthenticationContext);
    const {sendResetPasswordEmail} = authenticationContext;

    // Controlled inputs
    const [email, setEmail] = useState("");

    const sendEmail = e => {
        e.preventDefault();
        sendResetPasswordEmail(email);
    };

    return (
        <div className="login-div reset-password">
            <form className="form-login" action="POST" onSubmit={e => sendEmail(e)}>
                <h3>Reset Password</h3>
                <div className="form-fields">
                    <div className="username-field">
                        <small>Email</small>
                        <input required type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <button className="submit-btn-form" type="submit">Send Email</button>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;