import React from "react";
import ReactApexChart from "react-apexcharts";
import ColorPalette from "../ColorPalette";

const DonutRunDistance = () => {
    let series = [44, 55, 13, 33];

    let options = {
        colors: ColorPalette,
        chart: {
            type: "donut",
        },
        labels: ["5K-10K", "1K-5K", "10K-15K", ">15K"],
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
                                return value + " Runs";
                            }
                        },
                    }
                }
            }
        }
    }

  return(
    <ReactApexChart
      options = {options}
      series = {series}
      type = "donut"
                />
  );
    };

    export default DonutRunDistance;
