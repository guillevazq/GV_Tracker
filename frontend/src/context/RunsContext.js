import React, {createContext, useReducer, useContext} from "react"; 
import axios from "axios";
import {NotificationContext} from "./NotificationContext";

export const RunsContext = createContext(); 

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_PERSONAL_RUNS":
            return {...state, personalRuns: action.payload.runs};
        case "SET_FOLLOWING_RUNS":
            return {...state, followingRuns: action.payload.runs};
        case "SET_FUNCTION":
            return {...state, predictionFunction: action.payload.predictionFunction};
        case "TOGGLE_SUBMISSION_FORM":
            return {...state, submitFormVisibility: !state.submitFormVisibility};
        case "TOGGLE_EDIT_FORM":
            return {...state, editFormVisibility: !state.editFormVisibility};
        case "POPULATE_EDIT_FORM_DATA":
            return {...state, editFormData: {...action.payload}};
        case "CLEAN_EDIT_FORM_DATA":
            return {...state, editFormData: null};
        case "SEE_FOLLOWING_RUNS":
            return {...state, followingRunsVisibility: true};
        case "UNSEE_FOLLOWING_RUNS":
            return {...state, followingRunsVisibility: false};
        default:
            return {...state};
    };
};

const RunState = props => {
    const {handleError, addAlert} = useContext(NotificationContext);

    const initialState = {
        recentlyAdded: false,
        personalRuns: null,
        followingRuns: null,
        predictionFunction: null,
        submitFormVisibility: false,
        submitFormData: {
            minutes: 0
        },
        editFormVisibility: false,
        editFormData: null,
        followingRunsVisibility: true,
    };

    const toggleSubmitForm = () => {
        dispatch({type: "TOGGLE_SUBMISSION_FORM"});
    };

    const toggleEditForm = () => {
        dispatch({type: "TOGGLE_EDIT_FORM"});
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const removeRecentlyAdded = () => {
        dispatch({type: "REMOVE_RECENTLY_ADDED_RUN"});
    };

    const addRun = (minutes, seconds, distance, dateRun) => {
        let currentToken = localStorage.getItem("authentication-token");
        currentToken = "Token " + currentToken;

        minutes = parseInt(minutes);
        seconds = minutes * 60 + parseInt(seconds);
        distance = parseFloat(distance);

        axios.post("http://localhost:8000/runs/", {seconds, distance, unix_date: dateRun}, {
            headers: {
                "Content-Type": "application/json",
                Authorization: currentToken,
            },
        }).then(response => {
            getRuns();
            toggleSubmitForm();
            addAlert("Run added correctly!", "Your run was submitted correctly", "success", "top-center")
        }).catch(error => {
            handleError(error);
        });
    };

    const getRuns = () => {
        getPersonalRuns();
        getFollowingRuns();
    };

    const getFollowingRuns = () => {
        let currentToken = localStorage.getItem("authentication-token");
        currentToken = "Token " + currentToken;
        axios.get("http://localhost:8000/runs/true/", {headers: {Authorization: currentToken}}).then(response => {
            dispatch({type: 'SET_FOLLOWING_RUNS', payload: {runs: response.data}});
        }).catch(error => {
            console.log(error);
        });
    };

    const getPersonalRuns = () => {
        let currentToken = localStorage.getItem("authentication-token");
        currentToken = "Token " + currentToken;

        axios.get("http://localhost:8000/runs/false/", {headers: {Authorization: currentToken}}).then(response => {
            dispatch({type: 'SET_PERSONAL_RUNS', payload: {runs: response.data}});
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

    const secondsToPace = (seconds, distance, raw=false) => {
        let decimal_mins_per_unit = seconds / 60 / distance;
        if (raw) {
            return decimal_mins_per_unit;
        }
        let full_minutes_pace = Math.floor(decimal_mins_per_unit);
        let full_seconds_pace = Math.round((decimal_mins_per_unit - full_minutes_pace) * 60);
        return [full_minutes_pace, full_seconds_pace];
    };

    const labelRun = (distance, step=3) => {
        for (let i = 1; i < 1000; i = i + step) {
            if (distance < i) {
                return `${i - step}-${i} KM`;
            };
        };
    };

    const representTimedeltaInPrettyString = runDate => {
        runDate = new Date(runDate * 1000);
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

    const secondsToStringHMS = seconds => {
        let hms = secondsToHoursMinutesSeconds(seconds);
        let formattedHMS = [];
        hms.map(measure => {
            if (measure < 10) {
                measure = "0" + measure;
            };
            formattedHMS.push(measure);
        });
        return formattedHMS;
    };

    const secondsToHoursMinutesSeconds = secondsHMS => {
        let hoursHMS = Math.floor(secondsHMS / 3600);
        let minutesHMS = Math.floor(secondsHMS % 3600 / 60);
        secondsHMS = Math.floor(secondsHMS % 3600 % 60);

        return [hoursHMS, minutesHMS, secondsHMS]; 
    };

    const secondsToMinutesSeconds = seconds => {
        let minutes = 0;
        while (seconds >= 60) {
            minutes += 1;
            seconds -= 60;
        };
        return [minutes, seconds];
    };

    const secondsToHoursMinutes = seconds => {
        let minutes = 0, hours = 0;
        while (seconds >= 3600) {
            hours += 1;
            seconds -= 3600;
        };

        while (seconds >= 60) {
            minutes += 1;
            seconds -= 60;
        };

        return [hours, minutes];
    };

    const editRun = (seconds, distance, date, id) => {
        let currentToken = localStorage.getItem("authentication-token");
        axios.put(`http://localhost:8000/runs/${id}/`, {seconds, distance, unix_date: date}, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + currentToken,
            },
        }).then(response => {
            getRuns();
            addAlert("Succesfully edited run!", "Your run was changed correctly", "success", "top-center");
            toggleEditForm();
            cleanEditFormData();
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

    const populateEditFormData = (minutes, seconds, distance, dateRun, id) => {
        dispatch({type: "POPULATE_EDIT_FORM_DATA", payload: {minutes, seconds, distance, dateRun, id}});
    };

    const cleanEditFormData = () => {
        dispatch({type: "CLEAN_EDIT_FORM_DATA"});
    };

    const seeFollowingRuns = () => {
        dispatch({type: 'SEE_FOLLOWING_RUNS'});
    };

    const unseeFollowingRuns = () => {
        dispatch({type: 'UNSEE_FOLLOWING_RUNS'});
    };

    return (
        <RunsContext.Provider value={{
            recentlyAdded: state.recentlyAdded,
            personalRuns: state.personalRuns,
            followingRuns: state.followingRuns,
            predictionFunction: state.predictionFunction,
            followingRunsVisibility: state.followingRunsVisibility,
            submitFormVisibility: state.submitFormVisibility,
            submitFormData: state.submitFormData,
            editFormVisibility: state.editFormVisibility,
            editFormData: state.editFormData,
            addRun,
            removeRecentlyAdded,
            getRuns,
            deleteRun,
            secondsToPace,
            labelRun,
            representTimedeltaInPrettyString,
            secondsToStringHMS,
            secondsToHoursMinutesSeconds,
            editRun,
            getPredictionFunction,
            secondsToMinutesSeconds,
            secondsToHoursMinutes,
            toggleSubmitForm,
            toggleEditForm,
            populateEditFormData,
            cleanEditFormData,
            seeFollowingRuns,
            unseeFollowingRuns
        }}>
            {props.children}
        </RunsContext.Provider>
    );
}; 

export default RunState;