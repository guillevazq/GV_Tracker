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
        case "SET_FUNCTION":
            return {...state, predictionFunction: action.payload.predictionFunction};
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
        predictionFunction: null,
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const removeRecentlyAdded = () => {
        dispatch({type: "REMOVE_RECENTLY_ADDED_RUN"});
    };

    const addRun = (minutes, seconds, distance, dateRun) => {
        let currentToken = localStorage.getItem("authentication-token");
        currentToken = "Token " + currentToken;

        minutes = parseInt(minutes);
        seconds = parseInt(seconds);
        distance = parseFloat(distance);

        axios.post("http://localhost:8000/runs/", {minutes, seconds, distance, unix_date: dateRun}, {
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

    const deleteRun = id => {
        let currentToken = localStorage.getItem("authentication-token");
        currentToken = "Token " + currentToken;

        axios.delete("http://localhost:8000/runs/" + id, {headers: {Authorization: currentToken}}).then(response => {
            getRuns();
        }).catch(error => {
            handleError(error);
        });
    }

    const getSpeedMinKM = (minutes, seconds, distance, decimal=false) => {
        let minutes_per_km_raw = (minutes + (seconds / 60)) / distance;
        if (decimal) {
            return minutes_per_km_raw;    
        }
        let full_minutes_per_km = Math.floor(minutes_per_km_raw);
        let full_seconds_per_km = Math.round((minutes_per_km_raw - full_minutes_per_km) * 60)
        return [full_minutes_per_km, full_seconds_per_km];
    };

    const labelRun = (distance, step=3) => {
        for (let i = 1; i < step * 11; i = i + step) {
            if (distance < i) {
                return `${i - step}-${i} KM`;
            };
        };
    };

    const representTimedeltaInPrettyString = runDate => {
        runDate = (new Date(runDate * 1000));
        let timeAgo = (((new Date()).getTime()) - runDate.getTime()) / 1000 / 60;
        let hoursDecimal;
        let hours;
        let days;

        if (timeAgo >= 60) {
            hoursDecimal = timeAgo / 60
            hours = Math.floor(hoursDecimal)
            if (hours >= 24) {
                days = Math.floor(hours / 24);
                if (days === 1) {
                    timeAgo = `${days} day ago`
                } else {
                    timeAgo = `${days} days ago`
                }
            }
            else if (hours === 1) {
                timeAgo = `${hours} hour ago`
            } else {
                timeAgo = `${hours} hours ago`
            }
        } else {
            if (Math.floor(timeAgo) !== 1) {
                timeAgo = `${Math.floor(timeAgo)} minutes ago`
            } else {
                timeAgo = `${Math.floor(timeAgo)} minute ago`
            }
        } 

        return timeAgo;
    };

    const minutesSecondsToStringHMS = (minutesTransform, secondsTransform) => {
        // Duration
        let hoursDuration = 0;
        if (minutesTransform >= 60) {
            hoursDuration = Math.floor(minutesTransform / 60);
        };
        if (hoursDuration < 10) {
            hoursDuration = "0" + hoursDuration;
        };
        if (secondsTransform < 10) {
            secondsTransform = "0" + secondsTransform;
        };
        while (minutesTransform >= 60) {
            minutesTransform = minutesTransform - 60;
        };
        if (minutesTransform < 10) {
            minutesTransform = "0" + minutesTransform;
        };
        return [hoursDuration, minutesTransform, secondsTransform];
    };

    const secondsToRawHMS = seconds => {
        seconds = Number(seconds);
        let h = Math.floor(seconds / 3600);
        let m = Math.floor(seconds % 3600 / 60);
        let s = Math.floor(seconds % 3600 % 60);

        return [h, m, s]; 
    };

    const editRun = (minutes, seconds, distance, date, id) => {
        let currentToken = localStorage.getItem("authentication-token");
        axios.put(`http://localhost:8000/runs/${id}/`, {minutes, seconds, distance, unix_date: date}, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + currentToken,
            },
        }).then(response => {
            getRuns();
            addAlert("Succesfully edited run!", "Your run was changed correctly", "success", "top-center");
        }).catch(error => {
            handleError(error);
        });
    };

    const getPredictionFunction = () => {
        let currentToken = localStorage.getItem("authentication-token");
        axios.get("http://localhost:8000/runs/prediction_function/", {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + currentToken,
            },
        }).then(response => {
            dispatch({type: 'SET_FUNCTION', payload: {predictionFunction: response.data.data}});
        }).catch(error => {
            console.log(error);
        });
    };

    return (
        <RunsContext.Provider value={{
            recentlyAdded: state.recentlyAdded,
            runs: state.runs,
            predictionFunction: state.predictionFunction,
            addRun,
            removeRecentlyAdded,
            getRuns,
            deleteRun,
            getSpeedMinKM,
            labelRun,
            representTimedeltaInPrettyString,
            minutesSecondsToStringHMS,
            secondsToRawHMS,
            editRun,
            getPredictionFunction,
        }}>
            {props.children}
        </RunsContext.Provider>
    );
}; 

export default RunState;