import React, {useContext} from 'react';

import ReactApexChart from 'react-apexcharts';

import {SocialContext} from "../context/SocialContext";
import {RunsContext} from "../context/RunsContext";

import {weeklyGoalOptions, monthlyGoalOptions} from '../graph_settings/GraphSettings';

const WeeklyGoal = ({abreviatedUnit}) => {
    const {weekly_goal} = useContext(SocialContext);
    const {getDistanceRanThisWeek, getDistanceRanThisMonth} = useContext(RunsContext);

    let weeklyGoal = weekly_goal;
    let monthlyGoal = weekly_goal / 7 * 30;

    let weeklyGoalProgress = [(100 / weeklyGoal * getDistanceRanThisWeek()).toFixed(2)];
    let monthlyGoalProgress = [(100 / monthlyGoal * getDistanceRanThisMonth()).toFixed(2)];

    weeklyGoalOptions.labels = [`${getDistanceRanThisWeek()} / ${weeklyGoal.toFixed(2)} ${abreviatedUnit}`];
    monthlyGoalOptions.labels = [`${getDistanceRanThisMonth()} / ${monthlyGoal.toFixed(2)} ${abreviatedUnit}`];

    return (
        <div className="goals-predictions">
            <ReactApexChart options={weeklyGoalOptions} series={weeklyGoalProgress} type="radialBar" height={350} />
            <ReactApexChart options={monthlyGoalOptions} series={monthlyGoalProgress} type="radialBar" height={350} />
            <div className="input-goal"></div>
        </div>
    );
};

export default WeeklyGoal;