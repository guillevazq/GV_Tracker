import React, {useState, useContext, useEffect} from "react";

// Context
import {RunsContext} from '../context/RunsContext';

// UI
import Button from '@material-ui/core/Button';

const RunSubmissionForm = ({setTransformToUnit, unit}) => {
    const {addRun, toggleSubmitForm, submitFormVisibility} = useContext(RunsContext);

    let now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    let today = now.toISOString().slice(0,16);

    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [distance, setDistance] = useState(0);
    const [dateRun, setDateRun] = useState(today);

    const resetAllFields = () => {
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        setDistance(0);
        setDateRun(today);
    };

    useEffect(() => {
        setDateRun(today);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!submitFormVisibility) {
            setTimeout(() => {resetAllFields()}, 200);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submitFormVisibility]);

    const submitRun = e => {
        e.preventDefault();
        let convertedDistance = distance;
        if (unit === "Miles") {
            convertedDistance = parseFloat(convertedDistance) * 1.609344;
        };
        addRun(hours, minutes, seconds, convertedDistance, parseInt(new Date(dateRun).getTime() / 1000));
        setTransformToUnit(false);
    };

    const handleNumericInput = (e, max, min, changeFunction) => {
        if (e.target.value <= max && e.target.value >= min){
            changeFunction(Math.floor(e.target.value).toFixed(0));
        };
    };

    const cancelSubmission = () => {
        toggleSubmitForm();
        setTimeout(() => {resetAllFields()}, 200);
    };

    return (
        <div className="login-div add-run-div">
            <form className="form-login" action="POST" onSubmit={submitRun}>
                <h3>Submit Run</h3>
                <div className="form-fields form-fields-add-run">
                    <div className="hms-input">
                        <div className="username-field">
                            <small>Hours</small>
                            <input className="input-time" required 
                                step={"1"} 
                                min={0}
                                max={99}
                                type="number"
                                name="hours"
                                id="hours"
                                value={hours}
                                onChange={e => handleNumericInput(e, 100, 0, setHours)}
                                />
                        </div>
                        <div className="username-field">
                            <small>Minutes</small>
                            <input className="input-time" required step={"1"} min={0} max={59} type="number" name="minutes" id="minutes"
                            value={minutes} onChange={e => handleNumericInput(e, 59, 0, setMinutes)} />
                        </div>
                        <div className="username-field">
                            <small>Seconds</small>
                            <input className="input-time" required step={"1"} min={0} max={59} type="number" name="seconds" id="seconds"
                            value={seconds} onChange={e => handleNumericInput(e, 59, 0, setSeconds)} />
                        </div>
                    </div>
                    <div className="password-field distance-input-div">
                        <small>Distance ({unit})</small>
                        <input required step={"0.000000000000001"} min={0} type="number" name="distance" id="distance" value={distance}
                        onChange={e => setDistance(e.target.value)}/>
                    </div>
                    <input max={today} value={dateRun} onChange={e => setDateRun(e.target.value)} type="datetime-local" name="date" id="date" />
                    <div className="buttons-div-edit">
                        <Button onClick={cancelSubmission} variant="contained">Cancel</Button>
                        <Button type="submit" variant="contained" color="primary">Add</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RunSubmissionForm;