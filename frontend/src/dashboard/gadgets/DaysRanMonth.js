import React from 'react';

import ReactApexChart from "react-apexcharts";
import {daysRanMonthOptions} from '../../graph_settings/GraphSettings';

const DaysRanMonth = ({runs}) => {
    let total = 100, step = 10, series = [], solidity = 0.8153345;

    let today = new Date();
    today.setUTCHours(23,59,59,999);

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

    let daysAgo, position, currentSet, currentSetPosition;
    runs.forEach(run => {
        daysAgo = Math.floor((today.getTime() / 1000 - run.unix_date) / 3600 / 24);
        position = total - daysAgo - 1;
        if (position >= 0 && position <= 99) {
            currentSet = Math.floor(position / 10);
            currentSetPosition = (position - (currentSet * 10));
            if (series[currentSet]["data"][currentSetPosition]["y"] === solidity) {
                series[currentSet]["data"][currentSetPosition]["y"] = 0;
            };
            series[currentSet]["data"][currentSetPosition]["y"] += run.distance;
        };
    });

    series.reverse();
    daysRanMonthOptions.tooltip.y.formatter = value => {
        if (value === solidity) {
            return 0;
        };
        return value.toFixed(2);
    };

    return (
        <div className="heatmap-runs">
            <ReactApexChart options={daysRanMonthOptions} series={series} type="heatmap" />
        </div>
    );
};

export default DaysRanMonth;