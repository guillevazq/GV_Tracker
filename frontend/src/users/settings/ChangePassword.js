import React, {useState, useContext} from 'react';

// Context
import {AuthenticationContext} from '../../context/AuthenticationContext';

// UI
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const ChangePassword = () => {
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const authenticationContext = useContext(AuthenticationContext);
    const {resetPasswordInAccount} = authenticationContext;

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = e => {
        e.preventDefault();
    };

    const resetPassword = e => {
        e.preventDefault();
        if (password1 !== "" && password2 !== "") {
            resetPasswordInAccount(password1, password2);
            setShowPassword(false);
            setTimeout(() => {
                setPassword1("");
                setPassword2("");
            }, 400);
        };
    };

    return (
        <div>
            <h4 className="title-settings">Change Password</h4>
            <hr />
            <form onSubmit={resetPassword} className="password-settings">
                <div className="password-fields">
                    <div className="password-change-field">
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="password">New Password</InputLabel>
                            <OutlinedInput type={showPassword ? "text" : "password"} id="password" value={password1}
                                onChange={e => setPassword1(e.target.value)} labelWidth={123}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton edge="end" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}> 
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                } 
                            />
                        </FormControl>
                    </div>
                    <div className="password-change-field">
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="password2">New Password Confirmation</InputLabel>
                            <OutlinedInput type={showPassword ? "text" : "password"} id="password2" value={password2}
                                onChange={e => setPassword2(e.target.value)} labelWidth={235}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton edge="end" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}> 
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                } 
                            />
                        </FormControl>
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