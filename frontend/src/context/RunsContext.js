import React, {createContext, useReducer, useContext} from "react"; 
import axios from "axios";
import {NotificationContext} from "./NotificationContext";

export const RunsContext = createContext(); 

const reducer = (state, action) => {
    switch (action.type) {
        case "RECENTLY_ADDED_RUN":
            return {...state, recentlyAdded: true};
        case "REMOVE_RECENTLY_ADDED_RUN":
            return {...state, recentlyAdded: false};
        case "SET_RUNS":
            return {...state, runs: action.payload.runs};
        default:
            return {...state};
    };
};

const RunState = props => {
    const notificationContext = useContext(NotificationContext);
    const {handleError, addAlert} = notificationContext;

    const initialState = {
        recentlyAdded: false,
        runs: null,
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const removeRecentlyAdded = () => {
        dispatch({type: "REMOVE_RECENTLY_ADDED_RUN"});
    };

    const addRun = (minutes, seconds, distance) => {
        let currentToken = localStorage.getItem("authentication-token");
        currentToken = "Token " + currentToken;

        minutes = parseInt(minutes);
        seconds = parseInt(seconds);
        distance = parseFloat(distance);

        axios.post("http://localhost:8000/runs/", {minutes, seconds, distance}, {
            headers: {
                "Content-Type": "application/json",
                Authorization: currentToken,
            },
        }).then(response => {
            dispatch({type: 'RECENTLY_ADDED_RUN'});
            addAlert("Run added succesfully!", "Your run was submitted correctly", "success", "top-center");
        }).catch(error => {
            handleError(error);
        });
    };

    const getRuns = () => {
        let currentToken = localStorage.getItem("authentication-token");
        currentToken = "Token " + currentToken;

        axios.get("http://localhost:8000/runs/", {headers: {Authorization: currentToken}}).then(response => {
            dispatch({type: 'SET_RUNS', payload: {runs: response.data}});
        }).catch(error => {
            console.log(error);
        });
    };

    return (
        <RunsContext.Provider value={{
            recentlyAdded: state.recentlyAdded,
            runs: state.runs,
            addRun,
            removeRecentlyAdded,
            getRuns,
        }}>
            {props.children}
        </RunsContext.Provider>
    );
}; 

export default RunState;