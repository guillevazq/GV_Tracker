import React from 'react';

import ReactApexChart from "react-apexcharts";
import {SpeedDistanceScatterOptions} from "../../graph_settings/GraphSettings";

const SpeedDistanceScatter = ({runs}) => {
    let series = [{name: "Minutes", data: []}];
    runs.map(run => {
        series[0].data.push([run.distance, run.seconds / 60]);
    });
    return (
        <div className="speed-distance-scatter">
            <ReactApexChart options={SpeedDistanceScatterOptions} series={series} type="scatter" height={350} />
        </div>
    );
};

export default SpeedDistanceScatter;