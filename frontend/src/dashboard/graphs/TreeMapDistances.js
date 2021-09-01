import React from 'react';

import ReactApexChart from "react-apexcharts";

// Graph settings
import {treeMapDistancesOptions} from '../../graph_settings/GraphSettings';

const TreeMapDistances = ({personalRuns, followingRuns, followingRunsVisibility}) => {
    let runs_dict = {};
    let total_runs;
    let series = [{data: []}];

    if (followingRunsVisibility) {
        total_runs = followingRuns;
    } else {
        total_runs = personalRuns;
    };

    total_runs.map(run => {
        if (runs_dict[run.username]) {
            runs_dict[run.username] += run.distance;
        } else {
            runs_dict[run.username] = run.distance;
        };
    });


    for (const [username, distance_ran] of Object.entries(runs_dict)) {
        series[0].data.push({x: username, y: distance_ran});
    };

    return (
        <div>
            <ReactApexChart options={treeMapDistancesOptions} series={series} type="treemap" height={350} />
        </div>
    );
};

export default TreeMapDistances;