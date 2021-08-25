import React, {useEffect, useContext} from 'react';
import PaceTimePredictions from './PaceTimePredictions';
import {RunsContext} from '../context/RunsContext';
import {AuthenticationContext} from "../context/AuthenticationContext";

const PredictionsDashboard = props => {

    const authenticationContext = useContext(AuthenticationContext);
    const {isLogged} = authenticationContext;

    const runsContext = useContext(RunsContext);
    const {runs, getRuns} = runsContext;

    useEffect(() => {
        if (isLogged === false) {
            props.history.push("/login");
        }
    }, [isLogged, props.history]);

    useEffect(() => {
        getRuns();
    }, [])

    return (
        <div className="predictions-dashboard">
            <PaceTimePredictions />
        </div>
    );
};

export default PredictionsDashboard;