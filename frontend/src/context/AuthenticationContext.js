import React, {createContext, useReducer, useContext} from 'react';

// Http client
import axios from 'axios';

// Notification context
import {NotificationContext} from './NotificationContext';

export const AuthenticationContext = createContext();

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_TOKEN':
            return {...state, token: action.payload.token, isLogged: true};
        case 'SET_USER_INFO':
            return {...state, username:action.payload.username, email: action.payload.email, pk: action.payload.pk};
        case 'CLEAN_USER':
            return {...state, token: null, isLogged:false, username: null};
        case 'SET_EMAIL':
            return {...state, email: action.payload.email};
        case 'SET_USERNAME':
            return {...state, username: action.payload.username};
        default:
            return state;
    };
};

const AuthenticationState = props => { 

    // Initialize alert context
    const notificationContext = useContext(NotificationContext);
    const {addAlert, handleError} = notificationContext;

    const initialState = {
        token: null,
        isLogged: null,
        username: null,
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const requestJSONConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    } 

    const setTokenFromLS = () => {
        let tokenLS = localStorage.getItem("authentication-token");
        if (tokenLS) {
            checkForTokenValidity(tokenLS);
        } else {
            dispatch({type: 'CLEAN_USER'});
        }
    }

    const checkForTokenValidity = (token, greetUserTitle=false, greetUserMessage=false) => {
        axios.get("http://localhost:8000/users/user/", {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + token + "",
            },
        }).then(response => {
            dispatch({type: 'SET_TOKEN', payload: {token}});
            dispatch({type: 'SET_USER_INFO', payload: {username: response.data.username, email: response.data.email, pk: response.data.pk}});
            if (greetUserTitle && greetUserMessage) {
                addAlert(`${greetUserTitle} ${response.data.username}!`, greetUserMessage, "success", "top-center");
            };
        }).catch(() => {
            // Isn't valid
            dispatch({type: 'CLEAN_USER'});
        });
    };

    const logout = () => {
        axios.post("http://localhost:8000/users/logout/", {}, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + state.token + "",
            },
        }).then(response => {
            // Is valid
            localStorage.removeItem("authentication-token");
            dispatch({type: 'CLEAN_USER'});
        }).catch(error => {
            // Isn't valid
            localStorage.removeItem("authentication-token");
            dispatch({type: 'CLEAN_USER'});
        });
    };
    
    const setTokenInLS = token => {
        localStorage.setItem("authentication-token", token);
    }

    const register = (username, email, password1, password2) => {
        if (password1 !== password2) {
            addAlert("Passwords don't match!", "The password fields didn't match", "danger", "top-center");
        } else {
            axios.post('http://localhost:8000/users/registration/', {username, email, password1, password2}, requestJSONConfig).then(response => {
                setTokenInLS(response.data.key);
                checkForTokenValidity(response.data.key, "Welcome", "Your account was created succesfully");
            }).catch(error => {
                handleError(error);
            });
        }
    };

    const logIn = (username, password) => {
        axios.post('http://localhost:8000/users/login/', {username, password}, requestJSONConfig).then(response => {
            setTokenInLS(response.data.key);
            checkForTokenValidity(response.data.key, "Hi", "You've succesfully logged into your account");
        }).catch(error => {
            handleError(error);
        });
    };

    const sendResetPasswordEmail = email => {
        axios.post("http://localhost:8000/users/password/reset/", {email}, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => {
            addAlert("Email sent!", `An email has been sent to ${email}`, "success", "top-center");
        }).catch(error => {
            handleError(error);
        });
    };

    const resetPasswordInAccount = (new_password1, new_password2) => {
        let token = localStorage.getItem("authentication-token");
        axios.post("http://localhost:8000/users/password/change/", {new_password1, new_password2}, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + token + "",
            }
        }).then(response => {
            addAlert("Password reset", "Password was reset successfully", "success", "top-center")
            checkForTokenValidity(token);
        }).catch(error => {
            handleError(error, true);
        });
    };

    const changeUsername = username => {
        let token = localStorage.getItem("authentication-token");
        axios.put("http://localhost:8000/users/user/", {username}, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + token + "",
            }
        }).then(response => {
            addAlert("Username changed!", "Your username was changed succesfully", "success", "top-center");
            dispatch({type: 'SET_USERNAME', payload: {username: response.data.username}});
        }).catch(error => {
            handleError(error);
        });
    };

    return (
        <AuthenticationContext.Provider value={{
            token: state.token,
            isLogged: state.isLogged,
            username: state.username,
            email: state.email,
            logIn,
            register,
            setTokenFromLS,
            logout,
            handleError,
            sendResetPasswordEmail,
            resetPasswordInAccount,
            changeUsername,
        }}>
            {props.children}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationState;