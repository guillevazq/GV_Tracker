import React, {useContext} from 'react';
import ReactApexChart from 'react-apexcharts';
import {colors} from "../ColorPalette";
import {RunsContext} from '../../context/RunsContext';


const LineTrackHistory = () => {
    
    const runsContext = useContext(RunsContext);
    const {runs, getSpeedMinKM, labelRun} = runsContext;
    let daysSpeedDict = {};

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

    let series = [];
    for (const [distancesRange, dayPositions] of Object.entries(daysSpeedDict)) {
        let currentSeries = [];
        for (const [currentDay, times] of Object.entries(dayPositions)) {
            times.map(time => {
                currentSeries.push({x:parseInt(currentDay), y:parseFloat(time.toFixed(2))});
            });
        };
        series.push({name: distancesRange, type: "line", data: currentSeries});
    };

    const responsive = [{
        breakpoint: undefined,
        options: {},
    }];

    let legend = {
        show: true,
        showForSingleSeries: true,
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
                text: "Last 60 days",
                offsetY: -10,
                offsetX: 0,
            }
        },
        yaxis: {
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
            type: '',
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
            size: [6, 6]
        },
        tooltip: {
            shared: false,
            intersect: true,
        },
        legend: legend,
    };

    return <ReactApexChart legend={legend} responsive={responsive} options={options} series={series} type="line" height={400} />;
};

export default LineTrackHistory;