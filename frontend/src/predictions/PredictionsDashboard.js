import React, {useEffect, useContext} from 'react';

// Context
import {RunsContext} from '../context/RunsContext';
import {AuthenticationContext} from "../context/AuthenticationContext";
import {SocialContext} from "../context/SocialContext";

// Graphs
import PaceTimePredictions from './PaceTimePredictions';
import WeeklyGoal from "./WeeklyGoal";

// UI
import Loader from "../ui/Loader";

const PredictionsDashboard = props => {

    const {isLogged} = useContext(AuthenticationContext);
    const {personalRuns, getRuns} = useContext(RunsContext);
    const {abreviatedUnit} = useContext(SocialContext);

    useEffect(() => {
        getRuns();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    <PaceTimePredictions abreviatedUnit={abreviatedUnit} runs={personalRuns} />
                    <div className="goals">
                        <WeeklyGoal abreviatedUnit={abreviatedUnit} runs={personalRuns} />
                    </div>
                </div>
            ): (
                <Loader />
            )}
        </>
    );
};

export default PredictionsDashboard;