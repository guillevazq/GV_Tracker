import {createTheme} from "@material-ui/core";

export const darkModeColors = [
  "white",
  "white",
  "white",
  "white",
  "white",
  "white",
  "white",
  "white",
  "white",
  "white",
  "white",
  "white",
  "white",
];

export const lightModeColors = [
  "black",
  "black",
  "black",
  "black",
  "black",
  "black",
  "black",
  "black",
  "black",
  "black",
  "black",
  "black",
  "black",
];

export const colors = [
  "#dba203",
  "#cfc204",
  "#47d17e",
  "#ad75fc",
  "#e2733c",
];

export const getColor = index => {
    while (index > colors.length - 1) {
        index -= colors.length;
    };

    return colors[index];
};

export const theme = createTheme({
  typography: {
    fontSize: 16,
  },
  palette: {
    primary: {
      main: "#3069c0",
    },
    secondary: {
      main: "#FFB84B",
    },
  },
});


export const darkTheme = createTheme({
  typography: {
    fontSize: 16,
  },
  palette: {
    type: "dark",
    primary: {
      main: "#3069c0",
    },
    secondary: {
      main: "#FFB84B",
    },
  },
});


// Darkmode
export const darkModeGraph = {
    tooltip: {
        theme: "dark",
    },
    title: {
      style: {
        color: "white"
      }
    },
    legend: {
        labels: {
            colors: darkModeColors,
        }
    },
    dataLabels: {
      name: {
        color: "white",
      },
      value: {
        color: "white",
      },
      total: {
        color: "white",
      },
    },
    xaxis: {
        axisTicks: {
          color: "white",
        },
        title: {
          style: {
            color: "white",
          }
        },
        labels: {
            style: {
                colors: darkModeColors,
            },
        },
        axisBorder: {
            color: 'white',
        },
        axisTicks: {
            color: 'white',
        },
        title: {
            style: {
                color: "white",
            },
        },
      },
    yaxis: {
        title: {
          style: {
            color: "white",
          }
        },
        labels: {
            style: {
                colors: darkModeColors,
            },
        },
    },
};


// Lightmode
export const lightModeGraph = {
    tooltip: {
        theme: "light",
    },
    title: {
      style: {
        color: "black"
      }
    },
    dataLabels: {
      name: {
        color: "black",
      }
    },
    legend: {
        labels: {
            colors: lightModeColors,
        }
    },
    xaxis: {
        axisTicks: {
          color: "black",
        },
        title: {
          style: {
            color: "black",
          }
        },
        labels: {
            style: {
                color: lightModeColors,
            },
        },
    },
    yaxis: {
        title: {
          style: {
            color: "black",
          }
        },
        labels: {
            style: {
                colors: lightModeColors,
            },
        },
    },
};