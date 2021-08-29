import React, {useContext, useEffect} from 'react';

import ReactApexChart from 'react-apexcharts';
import {paceTimePredictionsOptions} from '../graph_settings/GraphSettings';

import {RunsContext} from "../context/RunsContext";

const PaceTimePredictions = ({runs}) => {
    const runsContext = useContext(RunsContext);
    const {getPredictionFunction, predictionFunction, secondsToPace, labelRun} = runsContext;

    useEffect(() => {
        getPredictionFunction();
    }, []);

    let series = [];
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
                };
            } else {
                daysSpeedDict[label] = {};
                daysSpeedDict[label][dayPosition] = [currentSpeed];
            };
        };
    });

    for (const [distancesRange, dayPositions] of Object.entries(daysSpeedDict)) {
        let currentSeries = [];
        for (const [currentDay, times] of Object.entries(dayPositions)) {
            times.map(time => {
                currentSeries.push({x:parseInt(currentDay), y:parseFloat(time.toFixed(2))});
            });
        };
        series.push({name: distancesRange + " Past Performance", type: "scatter", data: currentSeries});
    };


    if (predictionFunction) {
        for (const [key, current_range] of Object.entries(predictionFunction)) {
            let currentSeries = [];
            current_range.map((index, single_value) => {
                currentSeries.push({x: single_value, y:index});
            });
            series.push({name: key + " KM Future predicted performance", type: "line", data: currentSeries});
        };
    };

    return (
        <div className="main-graph-predictions">
            <h1>Predictions for the next 60 Days</h1>
            <ReactApexChart options={paceTimePredictionsOptions} series={series} height={450} />
        </div>
    );
};

export default PaceTimePredictions;