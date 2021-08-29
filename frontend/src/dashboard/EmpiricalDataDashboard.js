import React, {useContext, useEffect} from 'react';

// Graphs
import LineTrackHistory from './graphs/LineTrackHistory';
import DonutRunDistance from './graphs/DonutRunDistance';
import DistanceTimeBar from './graphs/DistanceTimeBar';
import SpeedDistanceScatter from "./graphs/SpeedDistanceScatter";
import RecentRuns from './gadgets/RecentRuns';
import DaysRanMonth from './gadgets/DaysRanMonth';
import SyncedPaceDistance from './graphs/SyncedPaceDistance';

// UI
import Loader from '../ui/Loader';

// Gadgets
import SetAccumulativeStatsGadget from './gadgets/SetAccumulativeStatsGadget';

// Context
import {AuthenticationContext} from "../context/AuthenticationContext";
import {RunsContext} from '../context/RunsContext';

const EmpiricalDataDashboard = props => {
    const authenticationContext = useContext(AuthenticationContext);
    const {isLogged} = authenticationContext;

    const runsContext = useContext(RunsContext);
    const {recentlyAdded, removeRecentlyAdded, getRuns, runs} = runsContext;

    useEffect(() => {
        getRuns();
    }, []);

    useEffect(() => {
        if (isLogged === false) {
            props.history.push("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogged]);

    useEffect(() => {
        if (recentlyAdded) {
            removeRecentlyAdded();
        };
    }, [recentlyAdded]);


    return (
        <>
        {(isLogged && runs) ? (
            <div className="empirical_data_dashboard">
                <div className="top_gadgets">
                    <SetAccumulativeStatsGadget runs={runs} />
                </div>
                <div className="top_charts">
                    <div className="line_track_history">
                        <LineTrackHistory runs={runs} />
                    </div>
                    <div className="donut_run_distance">
                        <DonutRunDistance runs={runs} />
                    </div>
                </div>
                <div className="mid_charts">
                    <div className="distance_time_bar">
                        <DistanceTimeBar runs={runs} />
                    </div>
                    <RecentRuns cap={4} title="Latest runs" runs={runs} />
                </div>
                <div className="bottom_charts">
                    <SpeedDistanceScatter runs={runs} />
                    <DaysRanMonth runs={runs} />
                </div>
                <div className="last_charts">
                    <SyncedPaceDistance runs={runs} />
                </div>
            </div>
        ) : (
            <Loader />
        )}
        </>
   );
};

export default EmpiricalDataDashboard;