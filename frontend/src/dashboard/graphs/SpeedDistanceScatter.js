import React, {useContext} from 'react';
import ReactApexChart from "react-apexcharts";
import {RunsContext} from "../../context/RunsContext";

const SpeedDistanceScatter = () => {
    const runsContext = useContext(RunsContext);
    const {runs} = runsContext;

    let series = [{name: "Minutes", data: []}];
    runs.map(run => {
        series[0].data.push([run.distance, run.minutes + run.seconds / 60]);
    });

    let options = {
        chart: {
            height: 350,
            type: 'scatter',
            toolbar: {
                show: false
            },
        },
        xaxis: {
            // tickAmount: 10,
            labels: {
                formatter: function (val) {
                    return parseFloat(val).toFixed(2)
                }
            }
        },
        yaxis: {
            // tickAmount: 20
        }
    };
    return (
        <div className="speed-distance-scatter">
            <ReactApexChart options={options} series={series} type="scatter" height={350} />
        </div>
    );
};

export default SpeedDistanceScatter;