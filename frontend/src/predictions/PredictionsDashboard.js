import React, {useEffect, useContext} from 'react';
import {RunsContext} from '../context/RunsContext';
import {AuthenticationContext} from "../context/AuthenticationContext";

// Graphs
import PaceTimePredictions from './PaceTimePredictions';
import WeeklyGoal from "./WeeklyGoal";

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
            <div className="goals">
                <WeeklyGoal />
            </div>
        </div>
    );
};

export default PredictionsDashboard;