import React, {useState, useContext} from 'react';

// Context
import {AuthenticationContext} from '../../context/AuthenticationContext';

// UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const ChangePassword = () => {
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const authenticationContext = useContext(AuthenticationContext);
    const {resetPasswordInAccount} = authenticationContext;

    const resetPassword = e => {
        e.preventDefault();
        if (password1 !== "" && password2 !== "") {
            resetPasswordInAccount(password1, password2);
        }
    };

    return (
        <div>
            <h4 className="title-settings">Change Password</h4>
            <hr />
            <form onSubmit={resetPassword} className="password-settings">
                <div className="password-fields">
                    <div className="password-change-field">
                        <TextField variant="outlined" id="password" label="New Password" value={password1} onChange={e => setPassword1(e.target.value)} />
                    </div>
                    <div className="password-change-field">
                        <TextField variant="outlined" id="password2" label="New Password Confirmation" value={password2} onChange={e => setPassword2(e.target.value)} />
                    </div>
                    <div className="save-btn-div">
                        <Button type="submit" variant="contained" color="primary">Reset Password</Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;