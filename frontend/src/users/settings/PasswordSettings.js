import React, {useState, useContext} from 'react';
import { AuthenticationContext } from '../../context/AuthenticationContext';
import { NotificationContext } from '../../context/NotificationContext';

const PasswordSettings = () => {
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState("password");

    const togglePasswordVisibility = () => {
        if (passwordVisibility === "password") {
            setPasswordVisibility("text");
        } else {
            setPasswordVisibility("password");
        }
    };

    const authenticationContext = useContext(AuthenticationContext);
    const {resetPasswordInAccount} = authenticationContext;

    const notificationContext = useContext(NotificationContext);
    const {addAlert} = notificationContext;

    const resetPassword = e => {
        e.preventDefault();
        if (password1 !== "" && password2 !== "") {
            resetPasswordInAccount(password1, password2);
        }
    };

    return (
        <div>
            <h4 className="title-settings">Reset Password</h4>
            <hr />
            <form onSubmit={e => resetPassword(e)} className="space-settings">
                <div className="fields-available">
                    <div className="email-change-field">
                        <p>New Password</p>
                        <input id="password2" type={passwordVisibility} value={password1} onChange={e => setPassword1(e.target.value)} />
                    </div>
                    <div className="email-change-field">
                        <p>New Password Confirmation</p>
                        <input id="password3" type={passwordVisibility} value={password2} onChange={e => setPassword2(e.target.value)} />
                        <button type="button" className="password-visibility" onClick={togglePasswordVisibility}>See passwords</button>
                    </div>
                    <div className="save-btn-div">
                        <button className='save-btn' type="submit">Reset Password</button>
                    </div>
                </div>
                <div className="profile-picture">
                </div>
            </form>
        </div>
    );
};

export default PasswordSettings;