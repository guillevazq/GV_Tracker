import React from 'react';

import ReactApexChart from "react-apexcharts";
import {distanceTimeBarOptions, distanceTimeBarSeries} from '../../graph_settings/GraphSettings';

const DistanceTimeBar = ({runs}) => {
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthNumber, monthString, months = {};

    for (let i = 6; i > 0; i -= 1) {
        monthNumber = new Date(new Date().getFullYear(), new Date().getMonth() - i + 1, 1).getMonth();
        monthString = monthNames[monthNumber];
        months[monthString] = 0;
    };

    let monthOfRunNumber, monthOfRunString;
    runs.forEach(run => {
        if (run.unix_date - new Date().getTime() / 1000 < 3600 * 24 * 31 * 6) {
            monthOfRunNumber = new Date(run.unix_date * 1000).getMonth();
            monthOfRunString = monthNames[monthOfRunNumber];
            if (typeof(months[monthOfRunString]) === "number") {
                months[monthOfRunString] += run.distance;
            };
        };
    });

    let last_months = [], last_months_distances = [];
    for (const [monthName, monthDistance] of Object.entries(months)) {
        last_months.push(monthName);
        last_months_distances.push(monthDistance.toFixed(3));
    };

    distanceTimeBarOptions.xaxis.categories = last_months;
    distanceTimeBarSeries[0].data = last_months_distances;

    return <ReactApexChart type="bar" series={distanceTimeBarSeries} options={distanceTimeBarOptions} />;
};

export default DistanceTimeBar;