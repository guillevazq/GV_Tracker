import React, {useContext} from 'react';
import ReactApexChart from "react-apexcharts";

import {RunsContext} from "../../context/RunsContext";

const DaysRanMonth = () => {

    let runsContext = useContext(RunsContext);
    const {runs} = runsContext;

    let currentUnixDate = new Date().getTime() / 1000;

    let total = 100;
    let step = 10;
    let series = [];

    let solidity = 0.8153345;

    for (let i = 0; i < total; i += step) {
        let nameOfSeries = i + "-" + (i + step);
        series.push({name: nameOfSeries, data: []});
        for (let index = i; index < i + step; index++) {
            series.forEach(singleSeries => {
                if (singleSeries.name === nameOfSeries) {
                    singleSeries.data.push({x: solidity, y: solidity});
                };
            });
        };
    };

    runs.forEach(run => {
        let daysAgo = Math.floor((currentUnixDate - run.unix_date) / 3600 / 24);
        let position = total - daysAgo;
        let currentSet = Math.floor(position / 10);
        let currentSetPosition = (position - (currentSet * 10));
        series[currentSet]["data"][currentSetPosition]["y"] = run.distance;
    });

    series.reverse();

    let options = {
        xaxis: {
            position: "top",
            labels: {
                show: false,
            },
        },
        yaxis: {
            show: true,
        },
        chart: {
            type: 'heatmap',
            toolbar: {
                show: false,
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ["#008FFB"],
        title: {
            text: 'Last 100 Days'
        },
        tooltip: {
            enabled: true,
            style: {
                fontFamily: 'Roboto'
            },
            x: {
                show: false,
            },
            y: {
                formatter:(value) => {
                    if (value === solidity) {

                        return "0KM";
                    }
                    return `${value}KM`;
                },
            },
            marker: {
                show: false,
            },
        },
    };

    return (
        <div className="heatmap-runs">
            <ReactApexChart options={options} series={series} type="heatmap" height={350} />
        </div>
    );
};

export default DaysRanMonth;