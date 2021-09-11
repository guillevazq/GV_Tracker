import React, {useContext} from 'react';

import ReactApexChart from 'react-apexcharts';

import {RunsContext} from "../context/RunsContext";

import {weeklyGoalOptions, monthlyGoalOptions} from '../graph_settings/GraphSettings';

const WeeklyGoal = ({abreviatedUnit, weeklyGoal, monthlyGoal}) => {
    const {getDistanceRanThisWeek, getDistanceRanThisMonth} = useContext(RunsContext);

    if (abreviatedUnit === " Mi") {
        weeklyGoal *= 0.6213712;
        monthlyGoal *= 0.6213712;
    };

    let weeklyGoalProgress = [(100 / weeklyGoal * getDistanceRanThisWeek(abreviatedUnit)).toFixed(2)];
    let monthlyGoalProgress = [(100 / monthlyGoal * getDistanceRanThisMonth(abreviatedUnit)).toFixed(2)];

    weeklyGoalOptions.labels = [`${getDistanceRanThisWeek(abreviatedUnit)} / ${weeklyGoal.toFixed(2)} ${abreviatedUnit}`];
    monthlyGoalOptions.labels = [`${getDistanceRanThisMonth(abreviatedUnit)} / ${monthlyGoal.toFixed(2)} ${abreviatedUnit}`];

    return (
        <div className="goals-predictions">
            <ReactApexChart options={weeklyGoalOptions} series={weeklyGoalProgress} type="radialBar" height={350} />
            <ReactApexChart options={monthlyGoalOptions} series={monthlyGoalProgress} type="radialBar" height={350} />
        </div>
    );
};

export default WeeklyGoal;