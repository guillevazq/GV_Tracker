import React, {useContext} from 'react';
import {colors} from "../ColorPalette";
import ReactApexChart from 'react-apexcharts';

import {RunsContext} from '../../context/RunsContext';

const SyncedPaceDistance = () => {

    const runsContext = useContext(RunsContext);
    const {runs} = runsContext;

    let seriesArea = [{
        name: "Pace",
        data: [], 
    }];

    let seriesArea2 = [{
        name: "Distance",
        data: [], 
    }];

    if (runs) {
        runs.map((run, index) => {
            let minutes_per_kilometer = ((run.minutes + run.seconds / 60) / run.distance).toFixed(2);
            if (index <= 10) {
                seriesArea[0].data.push([index, minutes_per_kilometer]);
                seriesArea2[0].data.push([index, run.distance]);
            };
        });
    };

    let optionsArea = {
        chart: {
            toolbar: {
                show: false,
            },
            id: 'yt',
            group: 'social',
            type: 'area',
            height: 160
        },
        yaxis: {
            title: {
                text: "Pace (Min/KM)",
                rotate: 0,
                offsetX: -30,
            }
        },
        colors: [colors[0]],
    };
    let optionsArea2 = {
        chart: {
            toolbar: {
                show: false,
            },
            id: 'yt',
            group: 'social',
            type: 'area',
            height: 160
        },
        colors: [colors[2]],
        yaxis: {
            title: {
                text: "Distance",
                rotate: 0,
                offsetX: -15,
            }
        },
    };

    return (
        <div>
            <div id="synced-charts">
                <div id="chart-area">
                    <ReactApexChart options={optionsArea} series={seriesArea} type="area" height={160} />
                </div>
                <div id="chart-area">
                    <ReactApexChart options={optionsArea2} series={seriesArea2} type="area" height={160} />
                </div>
            </div>
        </div>
    );
};

export default SyncedPaceDistance
