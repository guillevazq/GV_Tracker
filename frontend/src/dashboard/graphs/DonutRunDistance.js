import React, {useContext} from "react";

import ReactApexChart from "react-apexcharts";
import {donutRunDistanceOptions} from "../../graph_settings/GraphSettings";

import {RunsContext} from "../../context/RunsContext";

const DonutRunDistance = ({personalRuns, followingRuns, followingRunsVisibility}) => {
    const {labelRun} = useContext(RunsContext);

    let allRanges = {}, runRangeNames = [], series = [];

    let runs;
    if (followingRunsVisibility) {
        runs = followingRuns;
    } else {
        runs = personalRuns;
    };

    runs.forEach(run => {
        let currentLabel = labelRun(run.distance);
        if (allRanges[run.username]) {
            if (allRanges[run.username][currentLabel]) {
                allRanges[run.username][currentLabel] += 1;
            } else {
                allRanges[run.username][currentLabel] = 1;
            };
        } else {
            allRanges[run.username] = {};
            allRanges[run.username][currentLabel] = 1;
        };
    });

    for (let [username, data] of Object.entries(allRanges)) {
        for (let [runRangeName, runCount] of Object.entries(data)) {
            series.push(runCount);
            runRangeNames.push(`${runRangeName} - ${username}`);
        };
    };

    donutRunDistanceOptions.labels = runRangeNames;
    donutRunDistanceOptions.plotOptions.pie.donut.labels.value.formatter = value => {
        if (runs.length === 0) {
            return "Runs: 0";
        };
        return "Runs: " + value;
    };

    let dummyOptions = {...donutRunDistanceOptions};
    let dummySeries = [1];
    dummyOptions.labels = ["No runs yet"];

    return (
        runs.length !== 0 ? (
            <ReactApexChart type="donut" series={series} options={donutRunDistanceOptions} />
        ) : (
            <ReactApexChart type="donut" series={dummySeries} options={dummyOptions} />
        )
    );
};

export default DonutRunDistance;
