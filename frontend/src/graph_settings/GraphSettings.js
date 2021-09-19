import {colors} from "../dashboard/ColorPalette";

export let distanceTimeBarOptions = {
    title: {
        text: "",
    },
    chart: {
        type: 'bar',
        height: 430,
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false,
        },
    },
    plotOptions: {
        bar: {
            horizontal: false,
            dataLabels: {
                enabled: false,
            },
        }
    },
    dataLabels: {
        enabled: false,
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
        type: "category",
        categories: [],
        labels: {
            style: {
                fontSize: "1.0rem"
            }
        }
    },
    yaxis: {
        labels: {
            style: {
                fontSize: "1.0rem"
            }
        },
    },
    // responsive: [{
    //     breakpoint: 500,
    //     options: {
    //         xaxis: {
    //             labels: {
    //                 style: {
    //                     fontSize: "0.8rem"
    //                 }
    //             }
    //         },
    //         yaxis: {
    //             labels: {
    //                 style: {
    //                     fontSize: "0.8rem"
    //                 }
    //             }
    //         }
    //     }
    // }]
}

export let lineTrackHistoryLegend = {
    show: true,
    showForSingleSeries: true,
    showForNullSeries: true,
    showForZeroSeries: true,
    position: 'bottom',
    horizontalAlign: 'center',
    floating: false,
    fontSize: '17px',
    fontFamily: 'Helvetica, Arial',
    fontWeight: 400,
    formatter: undefined,
    inverseOrder: false,
    width: undefined,
    height: undefined,
    tooltipHoverFormatter: undefined,
    customLegendItems: [],
    offsetX: 0,
    offsetY: 8,
    labels: {
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
    },
};

export let lineTrackHistoryOptions = {
    colors: colors,
    title: {},
    xaxis: {
        tickAmount: 3,
        type: 'numeric',
        decimalsInFloat: 0,
        labels: {
            formatter: value => {
                return "Day " + Math.round(value);
            },
            style: {
                fontSize: "1rem"
            }
        },
    },
    yaxis: {
        type: 'numeric',
        title: {
            rotate: 0,
            offsetX: -20,
            style : {
                fontSize: '0.9rem',
            },
        },
        labels: {
            rotate: 0,
            style: {
                fontSize: "1.0rem",
            },
        },
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
    // responsive: [{
    //     breakpoint: 570,
    //     options: {
    //         yaxis: {
    //             labels: {
    //                 style: {
    //                     fontSize: "0.75rem"
    //                 }
    //             }
    //         }
    //     }
    // }]
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
    },
    legend: {
        fontSize: "16px",
        position: "bottom",
    },
}



export let SpeedDistanceScatterOptions = {
    title: {
        text: "Minutes",
    },
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
            style: {
                fontSize: "1.0rem",
            },
        },
    },
    xaxis: {
        tickAmount: 3,
        labels: {
            style: {
                fontSize: "1.0rem",
            },
        },
    },
};


export let daysRanMonthOptions = {
    plotOptions: {
        heatmap: {
            useFillColorAsStroke: false,
            distributed: false,
            // reverseNegativeShade: true,
        },
    },
    xaxis: {
        position: "top",
        labels: {
            show: false,
        },
    },
    yaxis: {
        show: true,
        labels: {
            style: {
                fontSize: "0.9rem",
            },
        }
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
        text: 'Distance on the last 100 Days',
        offsetY: 10,
        style: {
            fontSize: "1.2rem",
        },
    },
    tooltip: {
        enabled: true,
        followCursor: true,
        shared: false,
        onDatasetHover: {
          highlightDataSeries: true,
        },
        style: {
            fontFamily: 'Roboto'
        },
        x: {
            show: false,
        },
        y: {
            formatter: value => {
                return value;
            }
        },
        marker: {
            show: true,
        },
    },
    responsive: [{
        breakpoint: 500,
        options: {
            title: {
                text: 'Distance on the last 100 Days',
            },
            chart: {
                height: "300px",
            }
        }
    }]
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
    },
    title: {
        text: "Pace",
        rotate: 0,
        offsetY: 20,
        style: {
            fontSize: "1.2rem",
        },
        align: 'center'
    },
    colors: [colors[0]],
    yaxis: {
        labels: {
            offsetX: -17,
            style: {
                fontSize: "1.0rem",
            },
        },
    },
    xaxis: {
        labels: {
            formatter: value => {
                return "Run " + value;
            },
            style: {
                fontSize: "1.0rem",
            },
        },
    },
    dataLabels: {
        style: {
            fontSize: "1.2rem",
        },
    },
    responsive: [{
        breakpoint: 500,
        options: {
            dataLabels: {
                style: {
                    fontSize: "0.7rem"
                }
            },
            xaxis: {
                labels: {
                    offsetY: 10,
                    style: {
                        fontSize: "0.8rem",
                    }
                }
            },
            yaxis: {
                labels: {
                    offsetX: -10,
                    style: {
                        fontSize: "0.8rem"
                    },
                    formatter: value => {
                        return value.toFixed(2);
                    }
                }
            }
        }
    }],
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
    title: {
        offsetY: 20,
        text: "Distance",
        rotate: 0,
        offsetX: -15,
        align: 'center',
        style: {
            fontSize: "1.2rem",
        },
    },
    yaxis: {
        labels: {
            offsetX: -17,
            style: {
                fontSize: "1.0rem",
            },
            formatter: value => {
                return value.toFixed(2);
            }
        },
    },
    xaxis: {
        labels: {
            formatter: value => {
                return "Run " + value;
            },
        },
    },
    dataLabels: {
        style: {
            fontSize: "1.2rem",
        },
    },
    responsive: [{
        breakpoint: 500,
        options: {
            dataLabels: {
                style: {
                    fontSize: "0.7rem"
                }
            },
            xaxis: {
                labels: {
                    offsetY: 10,
                    style: {
                        fontSize: "0.8rem",
                    }
                }
            },
            yaxis: {
                labels: {
                    offsetX: -10,
                    style: {
                        fontSize: "0.8rem"
                    },
                    formatter: value => {
                        return value.toFixed(2);
                    }
                }
            }
        }
    }],
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
    offsetY: 5,
    labels: {
        colors: colors,
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
            offsetY: -10,
            offsetX: 0,
            style: {
                fontSize: "1.0rem"
            }
        },
        labels: {
            style: {
                fontSize: "1.0rem",
            },
            formatter: value => {
                return "Day " + value.toFixed(0);
            },
        },
    },
    yaxis: {
        decimalsInFloat: 2,
        title: {
            rotate: 0,
            offsetX: -20,
        },
        labels: {
            style : {
                fontSize: '1rem',
            },
            offsetX: -10,
            rotate: 0,
        }
    },
    chart: {
        type: "line",
        height: 350,
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false,
        },
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
        },
    },
    fill: {
        type: 'solid',
    },
    markers: {},
    tooltip: {
        shared: false,
        intersect: true,
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
    },
    title: {},
    responsive: [{
        breakpoint: 685,
        options: {
            xaxis: {
                tickAmount: 3,
            }
        }
    }]
};


export let weeklyGoalOptions = {
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
    }
};


export let monthlyGoalOptions = {
    options: {
        chart: {
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
        // text: 'Total Distance',
        align: 'left'
    },
    yaxis: {labels: {}},
    colors: colors,
    plotOptions: {
        treemap: {
            distributed: true,
            enableShades: false,
        },
    },
    responsive: [{
        breakpoint: 500,
        options: {
            chart: {
                height: "200px",
            }
        }
    }]
};

export const MeasurementUnits = [
  {
    value: 'Kilometers',
    label: 'Kilometers',
  },
  {
    value: 'Miles',
    label: 'Miles',
  },
];

export const Languages = [
  {
    value: 'English',
    label: 'English',
  },
//   {
//     value: 'Spanish',
//     label: 'Spanish',
//   },
];