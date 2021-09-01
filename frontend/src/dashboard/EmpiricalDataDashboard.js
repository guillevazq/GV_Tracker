import React, {useContext, useEffect} from 'react';

// Graphs
import LineTrackHistory from './graphs/LineTrackHistory';
import DonutRunDistance from './graphs/DonutRunDistance';
import DistanceTimeBar from './graphs/DistanceTimeBar';
import SpeedDistanceScatter from "./graphs/SpeedDistanceScatter";
import RecentRuns from './gadgets/RecentRuns';
import DaysRanMonth from './gadgets/DaysRanMonth';
import SyncedPaceDistance from './graphs/SyncedPaceDistance';
import TreeMapDistances from './graphs/TreeMapDistances';

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
    const {recentlyAdded, removeRecentlyAdded, getRuns, personalRuns, followingRuns, followingRunsVisibility, seeFollowingRuns, unseeFollowingRuns} = runsContext;

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
        {(isLogged && personalRuns && followingRuns) ? (
            <div className="empirical_data_dashboard">
                <div className="top_gadgets">
                    <SetAccumulativeStatsGadget runs={personalRuns} />
                </div>
                <div className="top_charts">
                    <div className="line_track_history">
                        <LineTrackHistory
                            personalRuns={personalRuns}
                            followingRuns={followingRuns}
                            followingRunsVisibility={followingRunsVisibility} />
                    </div>
                    <div className="donut_run_distance">
                        <DonutRunDistance
                            personalRuns={personalRuns}
                            followingRuns={followingRuns}
                            followingRunsVisibility={followingRunsVisibility} />
                    </div>
                </div>
                <div className="mid_charts">
                    <div className="distance_time_bar">
                        <DistanceTimeBar
                            personalRuns={personalRuns}
                            followingRuns={followingRuns}
                            followingRunsVisibility={followingRunsVisibility} />
                    </div>
                    <RecentRuns
                        cap={4}
                        title="Latest runs"
                        runs={personalRuns}
                        editCapability={false}
                        personalRuns={personalRuns}
                        followingRuns={followingRuns}
                        followingRunsVisibility={followingRunsVisibility} />
                </div>
                <div className="bottom_charts">
                    <SpeedDistanceScatter
                        personalRuns={personalRuns}
                        followingRuns={followingRuns}
                        followingRunsVisibility={followingRunsVisibility} />
                    <TreeMapDistances
                        personalRuns={personalRuns}
                        followingRuns={followingRuns}
                        followingRunsVisibility={followingRunsVisibility} />
                </div>
                <h3>Personal</h3>
                <div className="last_charts">
                    <DaysRanMonth runs={personalRuns} />
                    <SyncedPaceDistance runs={personalRuns} />
                </div>
            </div>
        ) : (
            <Loader />
        )}
        </>
   );
};

export default EmpiricalDataDashboard;