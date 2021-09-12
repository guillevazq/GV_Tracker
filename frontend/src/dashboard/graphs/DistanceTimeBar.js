import React, {useState, useEffect} from 'react';

import ReactApexChart from "react-apexcharts";

import {distanceTimeBarOptions} from '../../graph_settings/GraphSettings';

const DistanceTimeBar = ({abreviatedUnit, personalRuns, followingRuns, followingRunsVisibility, timeRangeDistanceMonths, favoriteRunners}) => {
    let distanceTimeBarSeries = []
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthNumber, monthString, months = {}, full_months={};
    const [chartOptions, setChartOptions] = useState(distanceTimeBarOptions);

    let runs;
    if (followingRunsVisibility) {
        runs = followingRuns;
    } else {
        runs = personalRuns; 
    };

    for (let i = timeRangeDistanceMonths; i > 0; i -= 1) {
        monthNumber = new Date(new Date().getFullYear(), new Date().getMonth() - i + 1, 1).getMonth();
        monthString = monthNames[monthNumber];
        months[monthString] = 0;
    };

    runs.forEach(run => {
        if (!full_months[run.username]) {
            full_months[run.username] = {...months};        
        };
    });

    let monthOfRunNumber, monthOfRunString;
    runs.forEach(run => {
        if (run.unix_date - new Date().getTime() / 1000 < 3600 * 24 * 31 * 6) {
            monthOfRunNumber = new Date(run.unix_date * 1000).getMonth();
            monthOfRunString = monthNames[monthOfRunNumber];
            if (typeof(months[monthOfRunString]) === "number") {
                full_months[run.username][monthOfRunString] += run.distance;
            };
        };
    });

    let i = 0;
    let last_months = [];
    for (const [username, data] of Object.entries(full_months)) {
        let last_months_distances = [];
        last_months = [];
        for (const [monthName, monthDistance] of Object.entries(data)) {
            last_months.push(monthName);
            last_months_distances.push(monthDistance.toFixed(3));
        };
        distanceTimeBarSeries[i] = {};
        distanceTimeBarSeries[i].name = username;
        distanceTimeBarSeries[i].data = last_months_distances;
        i++;
    };

    for (let i = 0; distanceTimeBarSeries.length >= 4; i++) {
        let current_user_data = distanceTimeBarSeries[i];
        if (!favoriteRunners.includes(current_user_data.name)) {
            let index = distanceTimeBarSeries.indexOf(current_user_data);
            if (index > -1) {
                distanceTimeBarSeries.splice(index, 1);
            };
        };
    };

    useEffect(() => {
        setChartOptions({...chartOptions, xaxis: {categories: last_months}});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeRangeDistanceMonths]);

    distanceTimeBarOptions.yaxis.labels.formatter = value => {
        return value + abreviatedUnit;
    };

    return <ReactApexChart xaxis={{categories: []}} type="bar" series={distanceTimeBarSeries} options={chartOptions} height={450} />;
};

export default DistanceTimeBar;