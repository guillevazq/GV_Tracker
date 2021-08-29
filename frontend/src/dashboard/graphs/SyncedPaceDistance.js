import React from 'react';

import ReactApexChart from 'react-apexcharts';
import {syncedOptionsArea, syncedOptionsArea2} from '../../graph_settings/GraphSettings';

const SyncedPaceDistance = ({runs}) => {
    let seriesArea = [{name: "Pace", data: []}];
    let seriesArea2 = [{name: "Distance", data: []}];

    let minutes_per_unit;
    runs.map((run, index) => {
        minutes_per_unit = (run.seconds / 60 / run.distance).toFixed(2);
        if (index <= 10) {
            seriesArea[0].data.push([index, minutes_per_unit]);
            seriesArea2[0].data.push([index, run.distance]);
        };
    });

    return (
        <div>
            <div id="synced-charts">
                <div id="chart-area">
                    <ReactApexChart options={syncedOptionsArea} series={seriesArea} type="area" height={160} />
                </div>
                <div id="chart-area">
                    <ReactApexChart options={syncedOptionsArea2} series={seriesArea2} type="area" height={160} />
                </div>
            </div>
        </div>
    );
};

export default SyncedPaceDistance;