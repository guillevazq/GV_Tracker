import React from 'react';

import ReactApexChart from "react-apexcharts";
import {SpeedDistanceScatterOptions} from "../../graph_settings/GraphSettings";

const SpeedDistanceScatter = ({personalRuns, followingRuns, followingRunsVisibility}) => {
    let runs;
    if (followingRunsVisibility) {
        runs = followingRuns;
    } else {
        runs = personalRuns; 
    };

    let series = [];
    let usernames = [];
    runs.map(run => {
        if (!(usernames.includes(run.username))) {
            usernames.push(run.username);
        };
    });

    usernames.map(username => {
        series.push({name: username, data: []});
    });

    runs.map(run => {
        let indexOfUsername = usernames.indexOf(run.username);
        series[indexOfUsername].data.push([run.distance, run.seconds / 60]);
    });
    return (
        <div className="speed-distance-scatter">
            <ReactApexChart options={SpeedDistanceScatterOptions} series={series} type="scatter" height={350} />
        </div>
    );
};

export default SpeedDistanceScatter;