import React, {useState, useContext, useEffect} from 'react';
import {RunsContext} from '../context/RunsContext';

const RunEditForm = ({editMode, setEditMode}) => {

    let initialMinutes = editMode["minutes"];
    let initialSeconds = editMode["seconds"];
    let initialDistance = editMode["distance"];
    let initialDate = new Date(editMode["dateRun"] * 1000);
    initialDate.setMinutes(initialDate.getMinutes() - initialDate.getTimezoneOffset());
    initialDate = initialDate.toISOString().slice(0,16);

    let initialHours = 0;

    let now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    let today = now.toISOString().slice(0,16);

    while (initialMinutes >= 60) {
        initialMinutes -= 60;
        initialHours += 1;
    };

    // Instantiating the context
    const runsContext = useContext(RunsContext);

    // Destructure it
    const {addRun, editRun} = runsContext;

    // Controlled inputs
    const [hours, setHours] = useState(initialHours);
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);
    const [distance, setDistance] = useState(initialDistance);
    const [dateRun, setDateRun] = useState(initialDate);

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

    const cancelEdit = e => {
        setEditMode(false);
    };

    const submitEditedRun = e => {
        e.preventDefault();
        editRun(
            hours * 60 + parseInt(minutes),
            parseInt(seconds), 
            parseFloat(distance),
            new Date(dateRun).getTime() / 1000,
            editMode.id
        );
        setEditMode(false);
    };

    return (
        <div className="login-div add-run-div">
            <form className="form-login edit-form" action="POST" onSubmit={submitEditedRun}>
                <h3>Edit Run</h3>
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
                    <div className="buttons-div-edit">
                        <button className="submit-btn-form" type="submit">Save Edit</button>
                        <button onClick={cancelEdit} className="submit-btn-form cancel-btn" type="button">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default RunEditForm;