import React from 'react';
import ReactApexChart from 'react-apexcharts';
import ColorPalette from "../ColorPalette";


const LineTrackHistory = () => {

    const getDateDaysAgo = days => {
        let d = new Date();
        d.setDate(d.getDate() - days);
        let utc = d.toJSON().slice(0, 10).replace(/-/g, '/');
        return utc;
    }

    getDateDaysAgo(30);

    let runs_5k = {
        7: 5,
        13: 4.9,
        17: 5.1,
        23: 5.2,
        33: 5,
        43: 4.8,
        53: 4.7,
        59: 4.9,
    }

    let runs_10k = {
        4: 6,
        11: 5.5,
        18: 5.7,
        25: 5.8,
        30: 6.1,
        47: 5.8,
        50: 5.6,
        57: 5.9,
    }

    const generateGraphReadyArr = runs => {
        let graphArr = [];
        for (const [key, value] of Object.entries(runs)) {
            graphArr.push({ x: parseInt(key), y: value });
        };
        return graphArr;
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
        colors: ColorPalette,
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

    let runs5k_dict = generateGraphReadyArr(runs_5k);
    let runs10k_dict = generateGraphReadyArr(runs_10k);

    let series = [
        {
            name: "5K",
            type: 'line',
            data: runs5k_dict,
        },
        {
            name: "10K",
            type: 'line',
            data: runs10k_dict,
        },
    ]

    return <ReactApexChart labels={["this", "that", "thiose", "these"]} legend={legend} responsive={responsive} options={options} series={series} type="line" height={400} />;
};

export default LineTrackHistory;