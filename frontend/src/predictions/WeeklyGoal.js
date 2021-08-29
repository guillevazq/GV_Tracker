import React, {useState, useEffect} from 'react';

import ReactApexChart from 'react-apexcharts';
import {weeklyGoalOptions1, weeklyGoalOptions2} from '../graph_settings/GraphSettings';

const WeeklyGoal = () => {
    const [weeklyGoal, setWeeklyGoal] = useState();
    const [monthlyGoal, setMonthlyGoal] = useState();

    let series1 = [70], series2 = [70];

    useEffect(() => {
        setMonthlyGoal(Math.floor(weeklyGoal / 7 * 30.5));
    }, [weeklyGoal]);

    return (
        <div className="goals-predictions">
            <ReactApexChart options={weeklyGoalOptions1} series={series1} type="radialBar" height={350} />
            <ReactApexChart options={weeklyGoalOptions2} series={series2} type="radialBar" height={350} />
            <div className="input-goal"></div>
        </div>
    );
};

export default WeeklyGoal;