import React from 'react';

import ReactApexChart from "react-apexcharts";
import {SpeedDistanceScatterOptions} from "../../graph_settings/GraphSettings";

const SpeedDistanceScatter = ({abreviatedUnit, personalRuns, followingRuns, followingRunsVisibility}) => {
    let runs;
    if (followingRunsVisibility) {
        runs = followingRuns;
    } else {
        runs = personalRuns; 
    };

    let series = [];
    let usernames = [];
    runs.forEach(run => {
        if (!(usernames.includes(run.username))) {
            usernames.push(run.username);
        };
    });

    usernames.forEach(username => {
        series.push({name: username, data: []});
    });

    runs.forEach(run => {
        let indexOfUsername = usernames.indexOf(run.username);
        series[indexOfUsername].data.push([run.distance, run.seconds / 60]);
    });

    SpeedDistanceScatterOptions.xaxis.labels.formatter = value => {
        return parseFloat(value).toFixed(2) + abreviatedUnit;
    };

    return (
        <div className="speed-distance-scatter">
            <ReactApexChart options={SpeedDistanceScatterOptions} series={series} type="scatter" height={460} />
        </div>
    );
};

export default SpeedDistanceScatter;