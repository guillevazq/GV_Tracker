import React, {useEffect, useContext, useState} from 'react';

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
    const {abreviatedUnit, weekly_goal, unit} = useContext(SocialContext);

    const [weeklyGoal, setWeeklyGoal] = useState(null);
    const [monthlyGoal, setMonthlyGoal] = useState(null);

    useEffect(() => {
        if (weekly_goal) {
            setWeeklyGoal(weekly_goal);
            setMonthlyGoal(weekly_goal / 7 * 30);
        }
    }, [weekly_goal]);

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
            {(isLogged && personalRuns && weeklyGoal && monthlyGoal) ? (
                <div className="predictions-dashboard">
                    <PaceTimePredictions unit={unit} abreviatedUnit={abreviatedUnit} runs={personalRuns} />
                    <div className="goals">
                        <WeeklyGoal
                            weeklyGoal={weeklyGoal}
                            monthlyGoal={monthlyGoal}
                            abreviatedUnit={abreviatedUnit}
                            runs={personalRuns} />
                    </div>
                </div>
            ): (
                <Loader />
            )}
        </>
    );
};

export default PredictionsDashboard;