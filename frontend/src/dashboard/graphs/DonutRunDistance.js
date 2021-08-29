import React, {useContext} from "react";

import ReactApexChart from "react-apexcharts";
import {donutRunDistanceOptions} from "../../graph_settings/GraphSettings";

import {RunsContext} from "../../context/RunsContext";

const DonutRunDistance = ({runs}) => {
    const {labelRun} = useContext(RunsContext);

    let allRanges = {}, runRangeNames = [], series = [];

    runs.forEach(run => {
        let currentLabel = labelRun(run.distance);
        if (allRanges[currentLabel]) {
            allRanges[currentLabel] += 1;
        } else {
            allRanges[currentLabel] = 1;
        }
    });

    for (let [runRangeName, runCount] of Object.entries(allRanges)) {
        series.push(runCount);
        runRangeNames.push(runRangeName);
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
