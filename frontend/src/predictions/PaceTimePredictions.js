import React, {useState, useContext, useEffect} from 'react';
import ReactApexChart from 'react-apexcharts';
import {colors} from "../dashboard/ColorPalette";
import {RunsContext} from "../context/RunsContext";

const PaceTimePredictions = () => {
    const runsContext = useContext(RunsContext);
    const {getPredictionFunction, runs, predictionFunction, getSpeedMinKM, labelRun} = runsContext;

    const [calculationReady, setCalculationReady] = useState(false);

    useEffect(() => {
        getPredictionFunction();
    }, []);

    let series = [];
    let daysSpeedDict = {};

    if (runs) {
        runs.map(run => {
            let {minutes, seconds, distance} = run;
            let daysPassed = Math.floor((new Date().getTime() - new Date(run.unix_date * 1000).getTime()) / 1000 / 3600 / 24);
            let currentSpeed = getSpeedMinKM(minutes, seconds, distance, true);
            let label = labelRun(distance);
            let dayPosition = 60 - daysPassed;
            if (dayPosition >= 0) {
                if (daysSpeedDict[label]) {
                    if (daysSpeedDict[label][dayPosition]) {
                        daysSpeedDict[label][dayPosition].push(currentSpeed);
                    } else {
                        daysSpeedDict[label][dayPosition] = [currentSpeed];
                    }
                } else {
                    daysSpeedDict[label] = {};
                    daysSpeedDict[label][dayPosition] = [currentSpeed];
                }
            }
        });

        for (const [distancesRange, dayPositions] of Object.entries(daysSpeedDict)) {
            let currentSeries = [];
            for (const [currentDay, times] of Object.entries(dayPositions)) {
                times.map(time => {
                    currentSeries.push({x:parseInt(currentDay), y:parseFloat(time.toFixed(2))});
                });
            };
            series.push({name: distancesRange + " Past Performance", type: "scatter", data: currentSeries});
        };


        if (predictionFunction) {
            for (const [key, current_range] of Object.entries(predictionFunction)) {
                let currentSeries = [];
                current_range.map((index, single_value) => {
                    currentSeries.push({x: single_value, y:index});
                });
                series.push({name: key + " KM Future predicted performance", type: "line", data: currentSeries});
            };

        }
    }


    const responsive = [{
        breakpoint: undefined,
        options: {},
    }];

    let legend = {
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        position: 'bottom',
        horizontalAlign: 'center',
        floating: false,
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial',
        fontWeight: 400,
        formatter: undefined,
        inverseOrder: false,
        width: undefined,
        height: undefined,
        tooltipHoverFormatter: undefined,
        customLegendItems: [],
        offsetX: 0,
        offsetY: 0,
        labels: {
            colors: undefined,
            useSeriesColors: false
        },
        markers: {
            width: 12,
            height: 12,
            strokeWidth: 0,
            strokeColor: '#fff',
            fillColors: undefined,
            radius: 12,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0
        },
        itemMargin: {
            horizontal: 5,
            vertical: 0
        },
        onItemClick: {
            toggleDataSeries: true
        },
        onItemHover: {
            highlightDataSeries: true
        },
    }

    let options = { 
        colors: colors,
        xaxis: {
            type: 'numeric',
            decimalsInFloat: 0,
            title: {
                text: "Future 60 days",
                offsetY: -10,
                offsetX: 0,
            }
        },
        yaxis: {
            decimalsInFloat: 2,
            title: {
                rotate: 0,
                offsetX: -20,
                text: 'MIN / KM',
                style : {
                    fontSize: '0.9rem',
                }
            },
            labels: {
                rotate: 0,
            }
        },
        chart: {
            height: 350,
            type: 'line',
            toolbar: {
                show: false,
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
            }
        },
        fill: {
            type: 'solid',
        },
        markers: {
            size: [6, 0]
        },
        tooltip: {
            shared: false,
            intersect: false,
        },
        legend: legend,
        annotations: {
            xaxis: [{
                x: 60,
                strokeDashArray: 0,
                borderColor: "#775DD0",
                label: {
                    borderColor: "#775DD0",
                    style: {color: "#fff", background: "#775DD0"},
                    text: "Today",
                }
            }],
        }
    };


    return (
        <div className="main-graph-predictions">
            <h1>Predictions for the next 60 Days</h1>
            <ReactApexChart legend={legend} responsive={responsive} options={options} series={series} height={400} />
        </div>
    );
};

export default PaceTimePredictions;