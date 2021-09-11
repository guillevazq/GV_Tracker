import React, {useContext} from 'react';

import {RunsContext} from '../../context/RunsContext';
import {AuthenticationContext} from '../../context/AuthenticationContext';

import ReactApexChart from 'react-apexcharts';
import {lineTrackHistoryOptions} from '../../graph_settings/GraphSettings';

const LineTrackHistory = ({abreviatedUnit, personalRuns, followingRuns, followingRunsVisibility}) => {
    const {secondsToPace, labelRun, getTimeRangeLine} = useContext(RunsContext);
    const {username} = useContext(AuthenticationContext);

    let daysSpeedDict = {};
    let days = getTimeRangeLine() * 30;

    let runs = followingRunsVisibility ? followingRuns : personalRuns;

    runs.forEach(run => {
        let {seconds, distance} = run;
        let daysPassed = Math.floor((new Date().getTime() - new Date(run.unix_date * 1000).getTime()) / 1000 / 3600 / 24);
        let currentSpeed = secondsToPace(seconds, distance, true);
        let label = labelRun(distance, abreviatedUnit);
        let dayPosition = days - daysPassed;
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
    for (let [currentUsername, data] of Object.entries(daysSpeedDict)) {
        for (const [distancesRange, dayPositions] of Object.entries(data)) {
            let currentSeries = [];
            for (const [currentDay, times] of Object.entries(dayPositions)) {
                times.forEach(time => {
                    currentSeries.push({x:parseInt(currentDay), y:parseFloat(time.toFixed(2))});
                });
            };
            let nameOfCategory;
            if (!followingRunsVisibility) {
                nameOfCategory = `${distancesRange}`;
            } else {
                if (currentUsername === username) {
                    currentUsername = "You";
                };
                nameOfCategory = `${distancesRange} - ${currentUsername}`;
            };
            series.push({name: nameOfCategory, type: "line", data: currentSeries});
        };
    };

    lineTrackHistoryOptions.yaxis.labels.formatter = value => {
        return value + " Minutes / " + abreviatedUnit;
    };

    return <ReactApexChart options={lineTrackHistoryOptions} series={series} type="line" height={400} />;
};

export default LineTrackHistory;