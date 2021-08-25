import React, {useState, useContext, useEffect} from 'react';
import {RunsContext} from '../context/RunsContext';

const RunSubmissionForm = () => {
    // Instantiating the context
    const runsContext = useContext(RunsContext);

    // Destructure it
    const {addRun} = runsContext;

    let now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    let today = now.toISOString().slice(0,16);

    // Controlled inputs
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [distance, setDistance] = useState(0);
    const [dateRun, setDateRun] = useState(today);

    const submitRun = e => {
        e.preventDefault();
        addRun(minutes, seconds, distance, parseInt(new Date(dateRun).getTime() / 1000));
    };

    const handleHours = e => {
        if (e.target.value >= 0 && e.target.value < 100){
            setHours(Math.floor(e.target.value).toFixed(0));
        };
    };
    const handleMinutes = e => {
        if (e.target.value < 60 && e.target.value >= 0){
            setMinutes(Math.floor(e.target.value).toFixed(0));
        };
    };
    const handleSeconds = e => {
        if (e.target.value < 60 && e.target.value >= 0){
            setSeconds(Math.floor(e.target.value).toFixed(0));
        };
    };

    const handleDistance = e => {
        setDistance(e.target.value);
    }

    return (
        <div className="login-div add-run-div">
            <form className="form-login" action="POST" onSubmit={e => submitRun(e)}>
                <h3>Submit Run</h3>
                <div className="form-fields form-fields-add-run">
                    <div className="hms-input">
                        <div className="username-field">
                            <small>Hours</small>
                            <input className="input-time" required step={"1"} min={0} max={59} type="number" name="hours" id="hours" value={hours} onChange={handleHours} />
                        </div>
                        <div className="username-field">
                            <small>Minutes</small>
                            <input className="input-time" required step={"1"} min={1} max={59} type="number" name="minutes" id="minutes" value={minutes} onChange={handleMinutes} />
                        </div>
                        <div className="username-field">
                            <small>Seconds</small>
                            <input className="input-time" required step={"1"} min={0} max={59} type="number" name="seconds" id="seconds" value={seconds} onChange={handleSeconds} />
                        </div>
                    </div>
                    <div className="password-field distance-input-div">
                        <small>Distance (KM)</small>
                        <input required step={"0.000000000000001"} min={0} type="number" name="distance" id="distance" value={distance} onChange={handleDistance}/>
                    </div>
                    <input max={today} value={dateRun} onChange={e => setDateRun(e.target.value)} type="datetime-local" name="date" id="date" />
                    <button className="submit-btn-form" type="submit">Add</button>
                </div>
            </form>
        </div>
    )
}

export default RunSubmissionForm;