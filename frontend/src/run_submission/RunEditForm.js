import React, {useState, useContext} from 'react';

// Context
import {RunsContext} from '../context/RunsContext';
import {NotificationContext} from '../context/NotificationContext';

// UI
import Button from '@material-ui/core/Button';

const RunEditForm = ({toggleEditForm, unit, setTransformToUnit}) => {

    const {editRun, editFormData, cleanEditFormData} = useContext(RunsContext);
    const {addAlert} = useContext(NotificationContext);

    let initialMinutes = editFormData["minutes"];
    let initialSeconds = editFormData["seconds"];
    let initialDistance = editFormData["distance"];
    let initialDate = new Date(editFormData["dateRun"] * 1000);
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

    const [hours, setHours] = useState(initialHours);
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);
    const [distance, setDistance] = useState(initialDistance);
    const [dateRun, setDateRun] = useState(initialDate);

    const handleDistance = e => {
        setDistance(e.target.value);
    };

    const handleNumericInput = (e, max, min, changeFunction) => {
        if (e.target.value <= max && e.target.value >= min){
            changeFunction(Math.floor(e.target.value).toFixed(0));
        };
    };

    const cancelEdit = e => {
        cleanEditFormData();
        toggleEditForm();
    };

    const submitEditedRun = e => {
        e.preventDefault();
        let timeVerification = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
        if (timeVerification <= 0) {
            return addAlert("Run Time Error", "The run must be at least 1 second", "danger", "top-center");
        };
        if (distance < 0.1) {
            return addAlert("Invalid distance", "The distance has to be at least 0.1", "danger", "top-center");
        };
        let dateVerified = new Date(dateRun).getTime();
        if (isNaN(dateVerified)) {
            return addAlert("Invalid date", "The date entered was invalid", "danger", "top-center");
        }
        let convertedDistance = distance;
        if (unit === "Miles") {
            convertedDistance = parseFloat(convertedDistance) * 1.609344;
        };
        editRun(hours * 3600 + minutes * 60 + parseInt(seconds), convertedDistance, new Date(dateRun).getTime() / 1000, editFormData.id);
        setTransformToUnit(false);
    };

    return (
        <div className="submission-div add-run-div">
            <form className="form-login edit-form" action="POST" onSubmit={submitEditedRun}>
                <h3>Edit Run</h3>
                <div className="form-fields form-fields-add-run">
                    <div className="hms-input">
                        <div className="username-field">
                            <small>Hours</small>
                            <input className="input-time" required step={"1"} min={0} max={100} type="number" name="hours" id="hours"
                            value={hours}
                            onChange={e => handleNumericInput(e, 100, 0, setHours)} />
                        </div>
                        <div className="username-field">
                            <small>Minutes</small>
                            <input className="input-time" required step={"1"} min={0} max={59} type="number" name="minutes" id="minutes"
                            value={minutes}
                            onChange={e => handleNumericInput(e, 59, 0, setMinutes)} />
                        </div>
                        <div className="username-field">
                            <small>Seconds</small>
                            <input className="input-time" required step={"1"} min={0} max={59} type="number" name="seconds" id="seconds"
                            value={seconds}
                            onChange={e => handleNumericInput(e, 59, 0, setSeconds)} />
                        </div>
                    </div>
                    <div className="password-field distance-input-div">
                        <small>Distance ({unit})</small>
                        <input required step={"0.000000000000001"} min={0} type="number" name="distance" id="distance" value={distance} onChange={handleDistance}/>
                    </div>
                    <input max={today} value={dateRun} onChange={e => setDateRun(e.target.value)} type="datetime-local" name="date" id="date" />
                    <div className="buttons-div-edit">
                        <Button onClick={cancelEdit} variant="contained">Cancel</Button>
                        <Button type="submit" variant="contained" color="secondary">Save</Button>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default RunEditForm;