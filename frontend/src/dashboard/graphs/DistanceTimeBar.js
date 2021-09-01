import React from 'react';

import ReactApexChart from "react-apexcharts";
import {distanceTimeBarOptions, distanceTimeBarSeries} from '../../graph_settings/GraphSettings';

const DistanceTimeBar = ({personalRuns, followingRuns, followingRunsVisibility}) => {
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthNumber, monthString, months = {}, full_months={};

    let runs;
    if (followingRunsVisibility) {
        runs = followingRuns;
    } else {
        runs = personalRuns; 
    };

    for (let i = 6; i > 0; i -= 1) {
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
    for (const [username, data] of Object.entries(full_months)) {
        let last_months = [], last_months_distances = [];
        for (const [monthName, monthDistance] of Object.entries(data)) {
            last_months.push(monthName);
            last_months_distances.push(monthDistance.toFixed(3));
        };
        distanceTimeBarSeries[i] = {};
        distanceTimeBarSeries[i].name = username;
        distanceTimeBarSeries[i].data = last_months_distances;
        distanceTimeBarOptions.xaxis.categories = last_months;
        i++;
    };

    return <ReactApexChart type="bar" series={distanceTimeBarSeries} options={distanceTimeBarOptions} />;
};

export default DistanceTimeBar;