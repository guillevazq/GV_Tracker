import React, {useState, useContext, useEffect} from 'react';
import {AuthenticationContext} from '../context/AuthenticationContext';
import {RunsContext} from '../context/RunsContext';

const RunSubmission = props => {

    // Instantiating the context
    const authenticationContext = useContext(AuthenticationContext);
    const runsContext = useContext(RunsContext);

    // Destructure it
    const {isLogged} = authenticationContext;
    const {addRun, recentlyAdded} = runsContext;

    // Controlled inputs
    const [minutes, setMinutes] = useState("");
    const [seconds, setSeconds] = useState("");
    const [distance, setDistance] = useState("");

    useEffect(() => {
        if (isLogged === false) {
            props.history.push("/login");
        }
    }, [isLogged]);

    useEffect(() => {
        if (recentlyAdded) {
            props.history.push("/");
        };
    }, [recentlyAdded]);

    const submitRun = e => {
        e.preventDefault();
        addRun(minutes, seconds, distance);
    }

    return (
        <div className="login-div">
            <form className="form-login" action="POST" onSubmit={e => submitRun(e)}>
                <h3>Submit Run</h3>
                <div className="form-fields form-fields-add-run">
                    <div className="username-field">
                        <small>Minutes</small>
                        <input required step={"1"} min={1} max={4320} type="number" name="minutes" id="minutes" value={minutes} onChange={e => setMinutes(e.target.value)} />
                    </div>
                    <div className="username-field">
                        <small>Seconds</small>
                        <input required step={"1"} min={0} max={59} type="number" name="seconds" id="seconds" value={seconds} onChange={e => setSeconds(e.target.value)} />
                    </div>
                    <div className="password-field">
                        <small>Distance (KM)</small>
                        <input required min={0} type="number" name="distance" id="distance" value={distance} onChange={e => setDistance(e.target.value)}/>
                    </div>
                    <button className="submit-btn-form" type="submit">Add</button>
                </div>
            </form>
        </div>
    );
};
export default RunSubmission;