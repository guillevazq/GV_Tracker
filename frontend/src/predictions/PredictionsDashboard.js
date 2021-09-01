import React, {useEffect, useContext} from 'react';

// Context
import {RunsContext} from '../context/RunsContext';
import {AuthenticationContext} from "../context/AuthenticationContext";

// Graphs
import PaceTimePredictions from './PaceTimePredictions';
import WeeklyGoal from "./WeeklyGoal";

// UI
import Loader from "../ui/Loader";

const PredictionsDashboard = props => {

    const authenticationContext = useContext(AuthenticationContext);
    const {isLogged} = authenticationContext;

    const runsContext = useContext(RunsContext);
    const {personalRuns, getRuns} = runsContext;

    useEffect(() => {
        getRuns();
    }, []);

    useEffect(() => {
        if (isLogged === false) {
            props.history.push("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogged]);


    return (
        <>
            {(isLogged && personalRuns) ? (
                <div className="predictions-dashboard">
                    <PaceTimePredictions runs={personalRuns} />
                    <div className="goals">
                        <WeeklyGoal runs={personalRuns} />
                    </div>
                </div>
            ): (
                <Loader />
            )}
        </>
    );
};

export default PredictionsDashboard;