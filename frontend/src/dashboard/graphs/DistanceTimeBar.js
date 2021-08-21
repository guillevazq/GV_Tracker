import React from 'react';
import ReactApexChart from "react-apexcharts";
import ColorPalette from "../ColorPalette";

const DistanceTimeBar = () => {

    let series = [{
        name: "Total KM",
        data: [400, 430, 448, 470, 540, 580],
    }];

    let options = {
        colors: ColorPalette,
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
            categories: ["January", "February", "March", "April", "June", "July"],
        }
    };

    return<ReactApexChart type = "bar" series = { series } options = { options } />;
};

export default DistanceTimeBar;