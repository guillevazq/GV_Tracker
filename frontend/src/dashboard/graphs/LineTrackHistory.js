import React, {useContext} from 'react';

import {RunsContext} from '../../context/RunsContext';

import ReactApexChart from 'react-apexcharts';
import {lineTrackHistoryOptions} from '../../graph_settings/GraphSettings';

const LineTrackHistory = ({personalRuns, followingRuns, followingRunsVisibility}) => {
    
    const {secondsToPace, labelRun} = useContext(RunsContext);
    let daysSpeedDict = {};

    let runs;
    if (followingRunsVisibility) {
        runs = followingRuns;
    } else {
        runs = personalRuns;
    };

    runs.map(run => {
        let {seconds, distance} = run;
        let daysPassed = Math.floor((new Date().getTime() - new Date(run.unix_date * 1000).getTime()) / 1000 / 3600 / 24);
        let currentSpeed = secondsToPace(seconds, distance, true);
        let label = labelRun(distance);
        let dayPosition = 60 - daysPassed;
        if (dayPosition >= 0) {
            if (daysSpeedDict[run.username]) {
                if (daysSpeedDict[run.username][label]) {
                    if (daysSpeedDict[run.username][label][dayPosition]) {
                        daysSpeedDict[run.username][label][dayPosition].push(currentSpeed);
                    } else {
                        daysSpeedDict[run.username][label][dayPosition] = [currentSpeed];
                    }
                } else {
                    daysSpeedDict[run.username][label] = {};
                    daysSpeedDict[run.username][label][dayPosition] = [currentSpeed];
                }
            } else {
                daysSpeedDict[run.username] = {};
                daysSpeedDict[run.username][label] = {};
                daysSpeedDict[run.username][label][dayPosition] = [currentSpeed];
            };
        };
    });

    let series = [];
    for (const [username, data] of Object.entries(daysSpeedDict)) {
        for (const [distancesRange, dayPositions] of Object.entries(data)) {
            let currentSeries = [];
            for (const [currentDay, times] of Object.entries(dayPositions)) {
                times.map(time => {
                    currentSeries.push({x:parseInt(currentDay), y:parseFloat(time.toFixed(2))});
                });
            };
            series.push({name: `${distancesRange} - ${username}`, type: "line", data: currentSeries});
        };
    };

    return <ReactApexChart options={lineTrackHistoryOptions} series={series} type="line" height={400} />;
};

export default LineTrackHistory;