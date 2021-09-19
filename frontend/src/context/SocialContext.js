import React, {useReducer, createContext, useContext} from "react";

import {NotificationContext} from "./NotificationContext";

import axios from "axios";

export const SocialContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_FOLLOWS":
            return {...state, ...action.payload};
        case "SET_SETTINGS":
            let abreviatedUnit;
            if (action.payload.unit === "Kilometers") {
                abreviatedUnit = " KM";
            } else if (action.payload.unit === "Miles") {
                abreviatedUnit = " Mi";
            };
            return {...state, ...action.payload, abreviatedUnit: abreviatedUnit}
        default:
            return {...state};
    };
};

const SocialState = props => {
    const {addAlert, handleError} = useContext(NotificationContext);

    const initialState = {
        followers: null,
        following: null,
        recieved_follow_requests: null,
        sent_follow_requests: null,
        language: null,
        weekly_goal: null,
        unit: null,
        abreviatedUnit: null,
        is_verified: null,
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const getFollows = () => {
        axios.get("http://localhost:8000/users/follows/me/follows/", generateHeader()).then(response => {
            const {follower_data, following_data, recieved_requests_data, sent_requests_data, is_account_verified} = response.data;
            dispatch({type: "SET_FOLLOWS", payload: {
                followers: follower_data,
                following: following_data,
                recieved_follow_requests: recieved_requests_data,
                sent_follow_requests: sent_requests_data,
                is_verified: is_account_verified,
            }});
        }).catch(error => {
            console.log(error);
        });
    };

    const generateHeader = () => {
        let token = localStorage.getItem("authentication-token");
        return ({headers: {
            "Content-Type": "application/json", 
            Authorization: `Token ${token}`
        }});
    };

    const followUser = async username => {
        return axios.get(`http://localhost:8000/users/follows/${username}/follow-user/`, generateHeader()).then(response => {
            if (response.data.detail === "You've already sent a follow request to this user") {
                addAlert("Request warning", "You've already sent a follow request to this user", "warning", "top-center");
            } else if (response.data.detail === "Follow request sent succesfully") {
                addAlert("Request sent!", `A follow request was sent to ${username}`, "success", "top-center");
            } else {
                addAlert("Request warning", response.data.detail, "warning", "top-center");
            };
        }).catch(error => {
            console.log(error);
            handleError(error);
        });
    };

    const unfollowUser = async username => {
        return axios.get(`http://localhost:8000/users/follows/${username}/unfollow-user/`, generateHeader()).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error.response);
        });
    };

    const cancelRequest = async username => {
        return axios.get(`http://localhost:8000/users/follows/${username}/cancel-follow-request/`, generateHeader()).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    };

    const acceptFriendRequest = async username => {
        return axios.get(`http://localhost:8000/users/follows/${username}/accept-follow-request/`, generateHeader()).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    };

    const rejectUserRequest = async username => {
        return axios.get(`http://localhost:8000/users/follows/${username}/reject-follow-request/`, generateHeader()).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    };

    const removeFollower = async username => {
        return axios.get(`http://localhost:8000/users/follows/${username}/remove-follower/`, generateHeader()).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    };

    const addFavoriteUser = async username => {
        return axios.get(`http://localhost:8000/users/follows/${username}/add-favorite-user/`, generateHeader()).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    };

    const removeFavoriteUser = async username => {
        return axios.get(`http://localhost:8000/users/follows/${username}/remove-favorite-user/`, generateHeader()).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    };


    const doActionAndGetFollows = async (action, username) => {
        await action(username);
        getFollows();
    };

    const getSettings = () => {
        axios.get(`http://localhost:8000/users/settings/`, generateHeader()).then(response => {
            dispatch({type: 'SET_SETTINGS', payload: {...response.data}});
        }).catch(error => {
            console.log(error);
        });
    };

    const updateSettings = async settingsObject => {
        return axios.put(`http://localhost:8000/users/settings/`, settingsObject, generateHeader()).then(response => {
            dispatch({type: 'SET_SETTINGS', payload: {...response.data}});
            addAlert("Settings changed!", "You've succesfully changed your settings", "success", "top-center")
        }).catch(error => {
            console.log(error);
        });
    };

    const verifyCode = async code => {
        return axios.post(`http://localhost:8000/users/verification-code/`, {code}, generateHeader()).then(response => {
            getFollows();
            addAlert("Account Verified", "You've succesfully verified your account", "success", "top-center")
            // dispatch({type: 'SET_SETTINGS', payload: {...response.data}});
        }).catch(error => {
            handleError(error);
        });
    };

    const sendVerificationMail = async () => {
        axios.get(`http://localhost:8000/users/send-verification-mail/`, generateHeader()).then(response => {
        }).catch(error => {
            console.log(error);
        });
    };

    const getUnit = () => state.unit;

    return (
        <SocialContext.Provider value={{
            followers: state.followers,
            following: state.following,
            recievedFollowRequests: state.recieved_follow_requests,
            sentFollowRequests: state.sent_follow_requests,
            language: state.language,
            weekly_goal: state.weekly_goal,
            unit: state.unit,
            abreviatedUnit: state.abreviatedUnit,
            isVerified: state.is_verified,
            doActionAndGetFollows,
            getFollows,
            followUser,
            unfollowUser,
            cancelRequest,
            acceptFriendRequest,
            rejectUserRequest,
            removeFollower,
            addFavoriteUser,
            removeFavoriteUser,
            getSettings,
            updateSettings,
            getUnit,
            verifyCode,
            sendVerificationMail,
        }}>
            {props.children}
        </SocialContext.Provider>
    );
};

export default SocialState;