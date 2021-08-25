import React, {useContext} from 'react';
import ReactApexChart from "react-apexcharts";
import {colors} from "../ColorPalette";
import {RunsContext} from '../../context/RunsContext';

const DistanceTimeBar = () => {

    const runsContext = useContext(RunsContext);
    const {runs} = runsContext;

    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let today = new Date();
    let d;
    let months = {};

    for(let i = 6; i > 0; i -= 1) {
        d = new Date(today.getFullYear(), today.getMonth() - i + 1, 1);
        let month = monthNames[d.getMonth()];
        months[month] = 0;
    }

    runs.forEach(run => {
        if (new Date(run.unix_date * 1000).getFullYear() === today.getFullYear()) {
            let monthOfRunNumber = (new Date(run.unix_date * 1000)).getMonth();
            let monthOfRun = monthNames[monthOfRunNumber];
            months[monthOfRun] += run.distance;
        }
    });

    let last_months = [];
    let last_months_values = [];
    for (const [key, value] of Object.entries(months)) {
        last_months.push(key);
        last_months_values.push(value.toFixed(3));
    }


    let series = [{
        name: "Total KM",
        data: last_months_values,
    }];

    let options = {
        colors: colors,
        chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                show: false,
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: false,
            }
        },
        dataLabels: {
            enabled: false,
            formatter: function (value) {
                return value + " KM"
            },
        },
        xaxis: {
            categories: last_months,
        }
    };

    return<ReactApexChart type = "bar" series = { series } options = { options } />;
};

export default DistanceTimeBar;