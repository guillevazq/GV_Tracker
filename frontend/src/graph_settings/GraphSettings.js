import {colors} from "../dashboard/ColorPalette";

export let distanceTimeBarSeries = [];

export let distanceTimeBarOptions = {
    chart: {
        type: 'bar',
        height: 430
    },
    plotOptions: {
        bar: {
            horizontal: true,
            dataLabels: {
                position: 'top',
            },
        }
    },
    dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
            fontSize: '12px',
            colors: ['#fff']
        },
    },
    stroke: {
        show: true,
        width: 1,
        colors: ['#fff']
    },
    tooltip: {
        shared: true,
        intersect: false
    },
    xaxis: {
        categories: [],
    },
};

export let lineTrackHistoryLegend = {
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
    tooltip: {
        intersect: false,
    }
};

export let lineTrackHistoryOptions = {
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
        zoom: {
            enabled: false
        },
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
        intersect: false,
    },
    legend: lineTrackHistoryLegend,
};


export let donutRunDistanceOptions = {
    colors: colors,
    chart: {
        zoom: {
            enabled: false
        },
        type: "donut",
    },
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
                    },
                }
            }
        }
    }
}



export let SpeedDistanceScatterOptions = {
    chart: {
        zoom: {
            enabled: false
        },
        height: 350,
        type: 'scatter',
        toolbar: {
            show: false
        },
    },
    yaxis: {
        labels: {
            formatter: function (val) {
                return parseFloat(val).toFixed(2)
            }
        }
    },
    xaxis: {
        labels: {
            formatter: function (val) {
                return parseFloat(val).toFixed(2)
            }
        }
    },
};


export let daysRanMonthOptions = {
    xaxis: {
        position: "top",
        labels: {
            show: false,
        },
    },
    yaxis: {
        show: true,
    },
    chart: {
        zoom: {
            enabled: false
        },
        type: 'heatmap',
        toolbar: {
            show: false,
        }
    },
    dataLabels: {
        enabled: false
    },
    colors: ["#008FFB"],
    title: {
        text: 'Last 100 Days'
    },
    tooltip: {
        enabled: true,
        style: {
            fontFamily: 'Roboto'
        },
        x: {
            show: false,
        },
        y: {},
        marker: {
            show: false,
        },
    },
};

   
export let syncedOptionsArea = {
    chart: {
        zoom: {
            enabled: false
        },
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

export let syncedOptionsArea2 = {
    chart: {
        zoom: {
            enabled: false
        },
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


let paceTimePredictionsLegend = {
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

export let paceTimePredictionsOptions = { 
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
        zoom: {
            enabled: false
        },
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
    legend: paceTimePredictionsLegend,
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


export let weeklyGoalOptions1 = {
    options: {
        chart: {
            zoom: {
                enabled: false
            },
            height: 350,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '70%',
                }
            },
        },
        labels: ['Cricket'],
    }
};


export let weeklyGoalOptions2 = {
    options: {
        chart: {
            zoom: {
                enabled: false
            },
            height: 350,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '70%',
                }
            },
        },
        labels: ['Cricket'],
    }
};

export let treeMapDistancesOptions = {
    legend: {
        show: false
    },
    chart: {
        height: 350,
        type: 'treemap',
        toolbar: {
            show: false,
        },
    },
    title: {
        text: 'Distances',
        align: 'center'
    },
    yaxis: {
        labels: {
            formatter: value => parseFloat(value).toFixed(2)
        },
    },
    colors: colors,
    plotOptions: {
        treemap: {
            distributed: true,
            enableShades: false,
        },
    },
};