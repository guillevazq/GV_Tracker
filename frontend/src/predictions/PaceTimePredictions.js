import React, {useContext, useState} from 'react';

import ReactApexChart from 'react-apexcharts';
import {paceTimePredictionsOptions} from '../graph_settings/GraphSettings';

import {RunsContext} from "../context/RunsContext";

const PaceTimePredictions = ({abreviatedUnit, runs, unit, predictionFunction}) => {
    const {secondsToPace, labelRun} = useContext(RunsContext);
    const [enoughRuns, setEnoughRuns] = useState(false);

    let series = [];
    let daysSpeedDict = {};

    runs.forEach(run => {
        let distance = run.distance;
        if (unit === "Miles") {
            distance *= 0.6213712;
        };
        let {seconds} = run;
        let daysPassed = Math.floor((new Date().getTime() - new Date(run.unix_date * 1000).getTime()) / 1000 / 3600 / 24);
        let currentSpeed = secondsToPace(seconds, distance, true);
        let label = labelRun(distance, abreviatedUnit);
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
            times.forEach(time => {
                currentSeries.push({x:parseInt(currentDay), y:parseFloat(time.toFixed(2))});
            });
        };
        series.push({name: distancesRange + " Past Performance", type: "scatter", data: currentSeries});
    };


    if (predictionFunction) {
        for (const [key, current_range] of Object.entries(predictionFunction)) {
            let currentSeries = [];
            current_range.forEach((index, single_value) => {
                currentSeries.push({x: single_value, y:index});
            });
            series.push({name: key + abreviatedUnit + " Future predicted performance", type: "line", data: currentSeries});
        };
    };

    paceTimePredictionsOptions.title.text = " Minutes / " + abreviatedUnit;

    if (predictionFunction) {
        let markerSizes = [];
        for (let i = 0; i < series.length; i++) {
            if (series[i].type === "scatter") {
                markerSizes.push(9);
            } else if (series[i].type === "line") {
                markerSizes.push(0);
            };
        };
        paceTimePredictionsOptions.markers.size = markerSizes;
    };

    if (enoughRuns) {
        paceTimePredictionsOptions.xaxis.title.text = "Future 60 Days";
    };

    if (!enoughRuns) {
        series.forEach(singleSeries => {
            if (singleSeries.data.length >= 5) {
                setEnoughRuns(true);
            };
        });
    };

    return (
        <>
            {predictionFunction && (
                <div className="main-graph-predictions">
                    <h1>Predictions for the next 60 Days</h1>
                    {!enoughRuns && <h3 className="warning-txt-pred">To see some predictions you must have at least 5 different runs of the same distance range</h3>}
                    <ReactApexChart options={paceTimePredictionsOptions} series={series} type="line" height={450} />
                </div>
            )}
        </>
    );
};

export default PaceTimePredictions;