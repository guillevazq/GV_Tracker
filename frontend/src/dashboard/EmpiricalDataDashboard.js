import React, {useContext, useEffect} from 'react';

// Graphs
import LineTrackHistory from './graphs/LineTrackHistory';
import DonutRunDistance from './graphs/DonutRunDistance';
import DistanceTimeBar from './graphs/DistanceTimeBar';
import RecentRuns from './gadgets/RecentRuns';

// Gadgets
import SetAccumulativeStatsGadget from './gadgets/SetAccumulativeStatsGadget';

// Context
import {AuthenticationContext} from "../context/AuthenticationContext";

const EmpiricalDataDashboard = props => {

    const authenticationContext = useContext(AuthenticationContext);
    const {isLogged} = authenticationContext;

    useEffect(() => {
        if (isLogged === false) {
            props.history.push("/login");
        }
    }, [isLogged, props.history]);

    return (
        <>
        {isLogged && (
            <div className="empirical_data_dashboard">
                <div className="top_gadgets">
                    <SetAccumulativeStatsGadget />
                </div>
                <div className="top_charts">
                    <div className="line_track_history">
                        <LineTrackHistory />
                    </div>
                    <div className="donut_run_distance">
                        <DonutRunDistance />
                    </div>
                </div>
                <div className="mid_charts">
                    <div className="distance_time_bar">
                        <DistanceTimeBar />
                    </div>
                    <RecentRuns />
                </div>
            </div>
        )}
        </>
   );
};

export default EmpiricalDataDashboard;