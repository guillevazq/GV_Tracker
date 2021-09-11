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
        personalRuns: null,
        followingRuns: null,
        predictionFunction: null,
        submitFormVisibility: false,
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

    const addRun = (hours, minutes, seconds, distance, dateRun) => {
        let currentToken = localStorage.getItem("authentication-token");
        currentToken = "Token " + currentToken;

        seconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
        distance = parseFloat(distance);

        axios.post("http://localhost:8000/runs/get/true/", {seconds, distance, unix_date: dateRun}, {
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
        axios.get("http://localhost:8000/runs/get/true/", {headers: {Authorization: currentToken}}).then(response => {
            dispatch({type: 'SET_FOLLOWING_RUNS', payload: {runs: response.data}});
        }).catch(error => {
            console.log(error);
        });
    };

    const getPersonalRuns = () => {
        let currentToken = localStorage.getItem("authentication-token");
        currentToken = "Token " + currentToken;

        axios.get("http://localhost:8000/runs/get/false/", {headers: {Authorization: currentToken}}).then(response => {
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

    const labelRun = (distance, abreviatedUnit) => {
        let step = parseInt(getRunRange());
        for (let i = 1; i < 1000; i += step) {
            if (distance < i) {
                return `${i - step}-${i} ${abreviatedUnit}`;
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
        hms.forEach(measure => {
            if (measure < 10) {
                measure = "0" + measure;
            };
            formattedHMS.push(measure);
        });
        return formattedHMS;
    };

    const secondsToStringHMSNoArray = seconds => {
        let arrHMS = secondsToStringHMS(seconds);
        return `${arrHMS[0]}:${arrHMS[1]}:${arrHMS[2]}`;
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

    const secondsToHours = seconds => {
        let hoursMinutes = secondsToHoursMinutes(seconds);
        let fullHours = hoursMinutes[0];
        let decimalHours = hoursMinutes[1] / 60;
        return (fullHours + decimalHours).toFixed(2);
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

    const getRunRange = () => {
        let runRange = localStorage.getItem("d-r");
        if (!runRange) {
            runRange = 3;
        } 
        return runRange;
    };

    const getTimeRangeLine = () => {
        let timeRangeLine = localStorage.getItem("t-r");
        if (!timeRangeLine) {
            timeRangeLine = 2;
        } 
        return timeRangeLine;
    };

    const getTimeRangeLineDistanceMonths = () => {
        let timeRangeLine = localStorage.getItem("t-r-m");
        if (!timeRangeLine) {
            timeRangeLine = 6;
        } 
        return timeRangeLine;
    };

    const getNumberRunsChart = () => {
        let timeRangeLine = localStorage.getItem("n-r-s");
        if (!timeRangeLine) {
            timeRangeLine = 5;
        } 
        return timeRangeLine;
    };


    const getDistanceRanThisWeek = currentUnit => {
        let today = new Date();
        let day = today.getDay() || 7;
        if (day !== 1) {
            today.setHours(-24 * (day - 1));
        };
        let firstDayOfTheWeek = today.getTime() / 1000;
        let totalDistance = 0;
        state.personalRuns.forEach(run => {
            if (run.unix_date - firstDayOfTheWeek >= 0) {
                totalDistance += run.distance;
            };
        });
        if (currentUnit === " Mi") {
            totalDistance *= 0.6213712;
        };
        return totalDistance.toFixed(2);
    };

    const getDistanceRanThisMonth = currentUnit => {
        let today = new Date();
        let firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getTime() / 1000;
        let totalDistance = 0;
        state.personalRuns.forEach(run => {
            if (run.unix_date - firstDayOfMonth >= 0) {
                totalDistance += run.distance;
            };
        });
        if (currentUnit === " Mi") {
            totalDistance *= 0.6213712;
        };
        return totalDistance.toFixed(2);
    };

    const convertRunsToMiles = (runs, unit) => {
        if (unit === "Miles") {
            runs.forEach(run => {
                run.distance = run.distance * 0.62137;
            });
        };
    };

    return (
        <RunsContext.Provider value={{
            personalRuns: state.personalRuns,
            followingRuns: state.followingRuns,
            predictionFunction: state.predictionFunction,
            followingRunsVisibility: state.followingRunsVisibility,
            submitFormVisibility: state.submitFormVisibility,
            editFormVisibility: state.editFormVisibility,
            editFormData: state.editFormData,
            addRun,
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
            unseeFollowingRuns,
            secondsToHours,
            secondsToStringHMSNoArray,
            getRunRange,
            getTimeRangeLine,
            getTimeRangeLineDistanceMonths,
            getNumberRunsChart,
            getDistanceRanThisWeek,
            getDistanceRanThisMonth,
            convertRunsToMiles,
        }}>
            {props.children}
        </RunsContext.Provider>
    );
}; 

export default RunState;