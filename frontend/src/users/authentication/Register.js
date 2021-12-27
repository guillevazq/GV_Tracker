import React, {useState, useContext, useEffect} from 'react';

// UI
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';

// Context
import {AuthenticationContext} from '../../context/AuthenticationContext';

const Register = props => {

    const {register, isLogged, setNewCurrentNavigationMenu} = useContext(AuthenticationContext);

    const registerUser = e => {
        e.preventDefault();
        if (username !== "" && password1 !== "" && password2 !== "" && email !== "") {
            register(username, email, password1, password2);
        };
    };

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const handleMouseDownPassword = e => {
        e.preventDefault();
    };

    const handleClickShowPassword = () => {
        setPasswordVisibility(!passwordVisibility);
    };

    useEffect(() => {
        setNewCurrentNavigationMenu("register");
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
                <div className="register-div">
                    <form className="form-register" action="POST" onSubmit={registerUser}>
                        <h3>Register</h3>
                        <div className="form-fields form-fields-register">
                            <div className="username-field">
                                <TextField required variant="outlined" id="username" label="Username" value={username} onChange={e => setUsername(e.target.value)} />
                                {(username.length < 4 || username.length > 40) ? (
                                    <div className="length-username-red">{username.length}/40</div>
                                ): (
                                    <div className="length-username-green">{username.length}/40</div>
                                )}
                            </div>
                            <div className="email-field">
                                <TextField required variant="outlined" id="email" label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="password-field">
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <OutlinedInput required type={passwordVisibility ? "text" : "password"} id="password" value={password1}
                                        labelWidth={83}
                                        onChange={e => setPassword(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton edge="end" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}> 
                                                    {passwordVisibility ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        } 
                                    />
                                </FormControl>
                            </div>
                            <div className="password-field">
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <OutlinedInput required type={passwordVisibility ? "text" : "password"} id="password1" value={password2}
                                        labelWidth={83}
                                        onChange={e => setPassword2(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton edge="end" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}> 
                                                    {passwordVisibility ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        } 
                                    />
                                </FormControl>
                            </div>
                            <Button className="register-btn" type="submit" variant="contained" color="primary">Register</Button>
                        </div>
                        <div className="help-anchortags">
                            <p>Already have an Account? <a href="/login">Log in</a></p>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default Register;