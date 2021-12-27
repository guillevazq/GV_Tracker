import React, {useState, useContext, useEffect} from 'react';

// UI
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

// Context
import {AuthenticationContext} from '../../context/AuthenticationContext';
import {SocialContext} from '../../context/SocialContext';

const ForgotPassword = props => {
    const {isLogged} = useContext(AuthenticationContext);
    const {getFollows, sendResetPasswordMail, verifyChangePasswordCode} = useContext(SocialContext);
    const [emailSent, setEmailSent] = useState(false);
    const [code, setCode] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {setShowPassword(!showPassword)};

    const handleMouseDownPassword = e => {e.preventDefault()};

    const resendEmail = async () => {
        if (email !== "") {
            sendResetPasswordMail(email);
            for (let i = 5; i > 0; i--) {
                setEmailSent(i);
                await new Promise(r => setTimeout(r, 1000)); 
            };
            setEmailSent(false);
        };
    };

    useEffect(() => {
        getFollows();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isLogged) {
            props.history.push("/");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogged]);

    return (
        <>
            {isLogged === false && (
                <div className="login-div">
                    <form className="form-login">
                        <h3>Set New Password</h3>
                        <div className="form-fields verify-acc">
                            <TextField required variant="outlined" id="email" type="email" label="Email" value={email} onChange={e => setEmail(e.target.value)} />
                            <div className="btns-verification">
                                <Button endIcon={emailSent ? emailSent : <SendIcon>send</SendIcon>} style={{
                                    cursor: emailSent ? "not-allowed" : "pointer",
                                    gridColumn: "span 2",
                                }} disabled={emailSent && true} onClick={resendEmail} type="button" variant="contained" color="inherit">Send Email</Button>
                            </div>
                            <TextField variant="outlined" id="code" label="Verification Code" value={code} onChange={e => setCode(e.target.value)} />
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
                                    <InputLabel htmlFor="password2">Password Confirmation</InputLabel>
                                    <OutlinedInput type={showPassword ? "text" : "password"} id="password2" value={password2}
                                        onChange={e => setPassword2(e.target.value)} labelWidth={195}
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
                            <div className="btns-verification">
                                <Button style={{
                                    gridColumn: "span 2",
                                }} onClick={() => verifyChangePasswordCode(email, code, password1, password2, () => props.history.push("/"))} type="button" variant="contained" color="primary">Change Password</Button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default ForgotPassword;