import React, {useContext} from "react";
import ReactApexChart from "react-apexcharts";
import {colors} from "../ColorPalette";
import {RunsContext} from "../../context/RunsContext";

const DonutRunDistance = () => {
    const runsContext = useContext(RunsContext);
    const {runs, labelRun} = runsContext;

    let allRanges = {};
    let values = [];
    let series = [];

    runs.forEach(run => {
        let currentLabel = labelRun(run.distance);
        if (allRanges[currentLabel]) {
            allRanges[currentLabel] += 1;
        } else {
            allRanges[currentLabel] = 1;
        }
    });
    for (const [key, value] of Object.entries(allRanges)) {
        series.push(value);
        values.push(key);
    };

    let options = {
        colors: colors,
        chart: {
            type: "donut",
        },
        labels: values,
        dataLabels: {
            enabled: false,
            formatter: function (val) {
                return parseFloat(val ).toFixed(2) + "%";
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        value: {
                            show: true,
                            formatter: function (value) {
                                if (runs.length === 0) {
                                    return "Runs: 0";
                                };
                                return "Runs: " + value;
                            }
                        },
                    }
                }
            }
        }
    }

    let dummyOptions = {...options};

    let dummySeries = [1];
    dummyOptions.labels = ["No runs yet"];

    return (
        runs.length !== 0 ? (
            <ReactApexChart type = "donut" series = {series} options = {options} />
        ) : (
            <ReactApexChart type = "donut" series = {dummySeries} options = {dummyOptions} />
        )
    );
};

    export default DonutRunDistance;
