import React, {useContext} from 'react';

import {RunsContext} from '../../context/RunsContext';

import ReactApexChart from 'react-apexcharts';
import {lineTrackHistoryOptions} from '../../graph_settings/GraphSettings';

const LineTrackHistory = ({runs}) => {
    
    const {secondsToPace, labelRun} = useContext(RunsContext);
    let daysSpeedDict = {};

    runs.map(run => {
        let {seconds, distance} = run;
        let daysPassed = Math.floor((new Date().getTime() - new Date(run.unix_date * 1000).getTime()) / 1000 / 3600 / 24);
        let currentSpeed = secondsToPace(seconds, distance, true);
        let label = labelRun(distance);
        let dayPosition = 60 - daysPassed;
        if (dayPosition >= 0) {
            if (daysSpeedDict[label]) {
                if (daysSpeedDict[label][dayPosition]) {
                    daysSpeedDict[label][dayPosition].push(currentSpeed);
                } else {
                    daysSpeedDict[label][dayPosition] = [currentSpeed];
                }
            } else {
                daysSpeedDict[label] = {};
                daysSpeedDict[label][dayPosition] = [currentSpeed];
            }
        }
    });

    let series = [];
    for (const [distancesRange, dayPositions] of Object.entries(daysSpeedDict)) {
        let currentSeries = [];
        for (const [currentDay, times] of Object.entries(dayPositions)) {
            times.map(time => {
                currentSeries.push({x:parseInt(currentDay), y:parseFloat(time.toFixed(2))});
            });
        };
        series.push({name: distancesRange, type: "line", data: currentSeries});
    };

    return <ReactApexChart options={lineTrackHistoryOptions} series={series} type="line" height={400} />;
};

export default LineTrackHistory;