import React, {createContext, useReducer, useContext} from 'react';

// Http client
import axios from 'axios';

// Notification context
import {NotificationContext} from './NotificationContext';

export const AuthenticationContext = createContext();

const reducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {...state, token: action.payload.token, isLogged: true};
        case 'REGISTER':
            return {...state, token: action.payload.token, isLogged: true};
        case 'SET_TOKEN':
            return {...state, token: action.payload.token, isLogged: true};
        case 'CLEAN_USER':
            return {...state, token: null, isLogged:false};
        default:
            return state;
    };
};

const AuthenticationState = props => { 

    // Initialize alert context
    const notificationContext = useContext(NotificationContext);
    const {addAlert} = notificationContext;

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
            // Check if token is valid 
            checkForTokenValidity(tokenLS);
        }
    }

    const checkForTokenValidity = token => {
        return axios.get("http://localhost:8000/users/user/", {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + token + "",
            },
        }).then(() => {
            // Is valid
            dispatch({type: 'SET_TOKEN', payload: {token}});
        }).catch(() => {
            // Isn't valid
            dispatch({type: 'CLEAN_USER'});
        });
    };

    const logout = () => {
        // request to logout
        localStorage.removeItem("authentication-token");
        dispatch({type: 'CLEAN_USER'});
    };
    
    const setTokenInLS = token => {
        localStorage.setItem("authentication-token", token);
    }

    const removeToken = () => {
        localStorage.removeItem("authentication-token");
    }

    const getToken = () => {
        return localStorage.getItem("authentication-token")
    }

    const handleError = error => {
        if (error.response.data.non_field_errors) {
            error.response.data.non_field_errors.forEach(current_err => {
                addAlert("Error", current_err + " (" + error.response.status + ")", "danger", "top-center")
            });
        } else if (typeof(error.response.data) === "object") {
            let error_field = Object.keys(error.response.data)[0];
            let error_description = error.response.data[error_field][0]
            addAlert("Error in " + error_field, error_description, "danger", "top-center");
        } else {
            addAlert("Unknown Server Error", "An unexpected server error has ocurred", "danger", "top-center");
        }
    }

    const register = (username, email, password1, password2) => {
        if (password1 !== password2) {
            addAlert("Passwords don't match!", "The password fields didn't match", "danger", "top-center");
        } else {
            axios.post('http://localhost:8000/users/registration/', {username, email, password1, password2}, requestJSONConfig).then(response => {
                dispatch({type: 'REGISTER', payload:{token: response.data.token}});
                setTokenInLS(state.token);
                addAlert("Welcome guillermo!", "Your account was created succesfully", "success", "top-center");
            }).catch(error => {
                handleError(error);
            });
        }
    };

    const logIn = (username, password) => {
        axios.post('http://localhost:8000/users/login/', {username, password}, requestJSONConfig).then(response => {
            setTokenInLS(response.data.key);
            dispatch({type: 'LOGIN', payload: {token: response.data.key}});
            addAlert("Hi guillermo!", "You've succesfully logged into your account", "success", "top-center");
        }).catch(error => {
            handleError(error);
        });
    };

    return (
        <AuthenticationContext.Provider value={{
            token: state.token,
            isLogged: state.isLogged,
            logIn,
            register,
            setTokenFromLS,
        }}>
            {props.children}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationState;