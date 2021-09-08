import React, {useContext} from "react";

import ReactApexChart from "react-apexcharts";
import {donutRunDistanceOptions} from "../../graph_settings/GraphSettings";

import {RunsContext} from "../../context/RunsContext";

const DonutRunDistance = ({abreviatedUnit, personalRuns, followingRuns, followingRunsVisibility}) => {
    const {labelRun} = useContext(RunsContext);

    let allRanges = {}, runRangeNames = [], series = [];

    let runs;
    if (followingRunsVisibility) {
        runs = followingRuns;
    } else {
        runs = personalRuns;
    };

    runs.forEach(run => {
        let currentLabel = labelRun(run.distance, abreviatedUnit);
        if (allRanges) {
            if (allRanges[currentLabel]) {
                allRanges[currentLabel] += 1;
            } else {
                allRanges[currentLabel] = 1;
            };
        } else {
            allRanges = {};
            allRanges[currentLabel] = 1;
        };
    });

    for (let [runRangeName, runCount] of Object.entries(allRanges)) {
        series.push(runCount);
        runRangeNames.push(`${runRangeName}`);
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
            <ReactApexChart type="donut" series={series} options={donutRunDistanceOptions} height={450} />
        ) : (
            <ReactApexChart type="donut" series={dummySeries} options={dummyOptions} height={450} />
        )
    );
};

export default DonutRunDistance;
