import React, {useContext} from 'react';

import ReactApexChart from 'react-apexcharts';
import {syncedOptionsArea, syncedOptionsArea2} from '../../graph_settings/GraphSettings';

import {RunsContext} from "../../context/RunsContext";

const SyncedPaceDistance = ({abreviatedUnit, runs, unit}) => {
    let seriesArea = [{name: "Pace", data: []}];
    let seriesArea2 = [{name: "Distance", data: []}];
    const {getNumberRunsChart} = useContext(RunsContext);

    let numberOfRuns = getNumberRunsChart();

    let minutes_per_unit;
    runs.forEach((run, index) => {
        minutes_per_unit = (run.seconds / 60 / run.distance).toFixed(2);
        let cap = numberOfRuns;
        if (index < cap) {
            seriesArea[0].data.push([cap - index, minutes_per_unit]);
            seriesArea2[0].data.push([cap - index, run.distance]);
        };
    });

    syncedOptionsArea.title.text = "Minutes / " + abreviatedUnit;
    syncedOptionsArea2.title.text = " Total " + unit;
    syncedOptionsArea.yaxis.labels.formatter = value => {
        return value.toFixed(2);
    };
    syncedOptionsArea.dataLabels.formatter = value => {
        return value.toFixed(2);
    };

    syncedOptionsArea2.yaxis.labels.formatter = value => {
        return value.toFixed(2);
    };
    syncedOptionsArea2.dataLabels.formatter = value => {
        return value.toFixed(2);
    };

    return (
        <div className="synced-charts">
            <div id="synced-charts">
                <div id="chart-area">
                    <ReactApexChart options={syncedOptionsArea} series={seriesArea} type="area" height={250} className="synced-charts-width"/>
                </div>
                <div id="chart-area">
                    <ReactApexChart options={syncedOptionsArea2} series={seriesArea2} type="area" height={250} className="synced-charts-width"/>
                </div>
            </div>
        </div>
    );
};

export default SyncedPaceDistance;