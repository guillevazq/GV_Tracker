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

const Login = props => {
    const {logIn, isLogged, setNewCurrentNavigationMenu} = useContext(AuthenticationContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const handleClickShowPassword = () => {
        setPasswordVisibility(!passwordVisibility);
    };

    const handleMouseDownPassword = e => {
        e.preventDefault();
    };

    const logInUser = e => {
        e.preventDefault();
        if (username !== "" && password !== "") {
            logIn(username, password);
        };
    };

    useEffect(() => {
        setNewCurrentNavigationMenu("login");
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
                    <form className="form-login" action="POST" onSubmit={logInUser}>
                        <h3>Log In</h3>
                        <div className="form-fields">
                            <TextField variant="outlined" id="username" label="Username" value={username} onChange={e => setUsername(e.target.value)} />
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <OutlinedInput type={passwordVisibility ? "text" : "password"} id="password" value={password}
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
                            <Button type="submit" variant="contained" color="primary">Login</Button>
                        </div>
                        <div className="help-anchortags">
                            <a href="/forgotpassword">Forgot Password?</a>
                            <p>Don't have an account? <a href="/register">Register</a></p>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default Login;