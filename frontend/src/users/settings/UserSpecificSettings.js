import React, {useState, useContext} from 'react';
import {AuthenticationContext} from "../../context/AuthenticationContext";
import {NotificationContext} from '../../context/NotificationContext';

const UserSpecificSettings = () => {
    const authenticationContext = useContext(AuthenticationContext);
    const {email, username, changeUsername} = authenticationContext;

    const notificationContext = useContext(NotificationContext);
    const {addAlert} = notificationContext;

    const [emailInput, setEmail] = useState(email);
    const [usernameInput, setUsername] = useState(username);

    const [emailConfirmation, setEmailConfirmation] = useState("");

    const submitNewUsername = e => {
        e.preventDefault();
        if (usernameInput !== username) {
            changeUsername(usernameInput);
        } else {
            addAlert("Username warning", "Your new username is the same as your old username", "warning", "top-center");
        };
    };

    return (
        <div>
            {email && username && (
                <>
                <h4 className="title-settings">Details</h4>
                <hr />
                <div className="space-settings">
                    <div className="fields-available">
                        <div className="email-change-field">
                            <p>Email</p>
                            <input style={{backgroundColor: "lightgray", cursor: "not-allowed"}} disabled id="email1" type="text" value={emailInput} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="email-change-field">
                            <p>Username</p>
                            <input id="username" type="text" value={usernameInput} onChange={e => setUsername(e.target.value)} />
                            {(usernameInput.length < 4 || usernameInput.length > 40) ? (
                                <small style={{color: "red"}}>{usernameInput.length}/40</small>
                            ): (
                                <small style={{color: "green"}}>{usernameInput.length}/40</small>
                            )}
                        </div>
                        {/* <div className="email-change-field">
                            <p>Email Confirmation</p>
                            <input id="email2" type="text" value={emailConfirmation} onChange={e => setEmailConfirmation(e.target.value)} />
                        </div> */}
                        <div className="save-btn-div">
                            <button onClick={e => submitNewUsername(e)} className='save-btn' type="submit">Save</button>
                        </div>
                    </div>
                    <div className="profile-picture">
                    </div>
                </div>
                </>
            )}
        </div>
    );
};

export default UserSpecificSettings;