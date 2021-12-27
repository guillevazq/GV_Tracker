import React, {useContext, useEffect, useState} from 'react';

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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

// Gadgets
import SetAccumulativeStatsGadget from './gadgets/SetAccumulativeStatsGadget';

// Context
import {AuthenticationContext} from "../context/AuthenticationContext";
import {RunsContext} from '../context/RunsContext';
import {SocialContext} from '../context/SocialContext';

const EmpiricalDataDashboard = props => {
    const {isLogged, setNewCurrentNavigationMenu} = useContext(AuthenticationContext);
    const {abreviatedUnit, getSettings, unit, isVerified, getFollows} = useContext(SocialContext);

    const {
        favoriteRunners,
        getRuns,
        personalRuns,
        followingRuns,
        followingRunsVisibility,
        seeFollowingRuns,
        unseeFollowingRuns,
        getTimeRangeLine,
        getTimeRangeLineDistanceMonths,
        getNumberRunsChart,
        convertRunsToMiles,
        getFavoriteRunners,
    } = useContext(RunsContext);

    const [seeFriends, setSeeFriends] = useState(false);
    const [timeRange, setTimeRange] = useState(getTimeRangeLine());
    const [timeRangeDistanceMonths, setTimeRangeDistanceMonths] = useState(getTimeRangeLineDistanceMonths());
    const [numberOfRuns, setNumberOfRuns] = useState(getNumberRunsChart());
    const [transformToUnit, setTransformToUnit] = useState(false);

    useEffect(() => {
        setNewCurrentNavigationMenu("home");
        getSettings();
        getRuns();
        getFavoriteRunners();
        getFollows();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (personalRuns && followingRuns && unit && !transformToUnit) {
            convertRunsToMiles(personalRuns, unit);
            convertRunsToMiles(followingRuns, unit);
            setTransformToUnit(true);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unit, personalRuns, followingRuns]);

    useEffect(() => {
        if (localStorage.getItem("s-f") !== null) {
            setSeeFriends(JSON.parse(localStorage.getItem("s-f")));
            if (JSON.parse(localStorage.getItem("s-f"))) {
                seeFollowingRuns();
            } else {
                unseeFollowingRuns();
            };
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isLogged === false) {
            props.history.push("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogged]);

    useEffect(() => {
        if (isVerified === false) {
            props.history.push("/verify-email");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVerified]);
    
    const handleChangeSeeFriends = e => {
        localStorage.setItem("s-f", e.target.checked);
        setSeeFriends(e.target.checked);
        if (e.target.checked) {
            seeFollowingRuns();
        } else {
            unseeFollowingRuns();
        };
    };

    const handleTimeRangeChange = e => {
        localStorage.setItem("t-r", e.target.value);
        setTimeRange(e.target.value);
    };

    const handleTimeRangeChangeDistanceMonths = e => {
        localStorage.setItem("t-r-m", e.target.value);
        setTimeRangeDistanceMonths(e.target.value);
    };

    const handleNumberOfRunsToSee = e => {
        localStorage.setItem("n-r-s", e.target.value);
        setNumberOfRuns(e.target.value);
    };

    return (
        <>
        {(isLogged && personalRuns && followingRuns && unit && transformToUnit && favoriteRunners && isVerified) ? (
            <div className="empirical_data_dashboard">
                <div className="general-settings">
                    <div className="see-friends-activity">
                        <FormControlLabel
                            control={<Switch color="primary" checked={seeFriends} onChange={handleChangeSeeFriends} name="see-friends" />}
                            label="See Friends Activity" />
                    </div>
                </div>
                <div className="top_gadgets">
                    <SetAccumulativeStatsGadget abreviatedUnit={abreviatedUnit} runs={personalRuns} />
                </div>
                <div className="time-range-selector">
                    <Select variant="filled" labelId="time-range-label" id="time-range-selector" value={timeRange} onChange={handleTimeRangeChange}>
                        <MenuItem value={1}>Last Month</MenuItem>
                        <MenuItem value={2}>Last 2 Months</MenuItem>
                        <MenuItem value={3}>Last 3 Months</MenuItem>
                        <MenuItem value={6}>Last 6 Months</MenuItem>
                        <MenuItem value={12}>Last Year</MenuItem>
                    </Select>
                </div>
                <div className="top_charts">
                    <div className="line_track_history">
                        <LineTrackHistory
                            abreviatedUnit={abreviatedUnit}
                            personalRuns={personalRuns}
                            followingRuns={followingRuns}
                            followingRunsVisibility={followingRunsVisibility} />
                    </div>
                    {followingRunsVisibility ? ( 
                        <TreeMapDistances
                            abreviatedUnit={abreviatedUnit}
                            personalRuns={personalRuns}
                            followingRuns={followingRuns}
                            followingRunsVisibility={followingRunsVisibility} />
                    ) : (
                        <div className="donut_run_distance">
                            <h3 className="title-mobile-donut">Runs per distance range</h3>
                            <DonutRunDistance
                                abreviatedUnit={unit}
                                personalRuns={personalRuns}
                                followingRuns={followingRuns}
                                followingRunsVisibility={followingRunsVisibility} />
                        </div>
                    )}
                    </div>
                <div className="mid_charts">
                    <SpeedDistanceScatter
                        abreviatedUnit={abreviatedUnit}
                        personalRuns={personalRuns}
                        followingRuns={followingRuns}
                        followingRunsVisibility={followingRunsVisibility} />
                    <RecentRuns
                        cap={4}
                        title="Latest runs"
                        editCapability={false}
                        abreviatedUnit={abreviatedUnit}
                        personalRuns={personalRuns}
                        followingRuns={followingRuns}
                        followingRunsVisibility={followingRunsVisibility} />
                </div>
                <div className="bottom_charts">
                    <div className="time-range-selector">
                        <Select variant="filled" labelId="time-range-label" id="time-range-selector" value={timeRangeDistanceMonths} onChange={handleTimeRangeChangeDistanceMonths}>
                            <MenuItem value={3}>Last 3 Months</MenuItem>
                            <MenuItem value={6}>Last 6 Months</MenuItem>
                            <MenuItem value={12}>Last Year</MenuItem>
                        </Select>
                    </div>
                    <div className="distance_time_bar">
                        <DistanceTimeBar
                            favoriteRunners={favoriteRunners}
                            abreviatedUnit={unit}
                            personalRuns={personalRuns}
                            followingRuns={followingRuns}
                            timeRangeDistanceMonths={timeRangeDistanceMonths}
                            followingRunsVisibility={followingRunsVisibility} />
                    </div>
                </div>
                <h3 className="personal-runs-title">Personal</h3>
                <div className="options-runs">
                    <div className="runs-number-view">
                        <Select variant="filled" labelId="numbers-label" id="numbers-selector" value={numberOfRuns} onChange={handleNumberOfRunsToSee}>
                            <MenuItem value={3}>Last 3 Runs</MenuItem>
                            <MenuItem value={5}>Last 5 Runs</MenuItem>
                            <MenuItem value={10}>Last 10 Runs</MenuItem>
                        </Select>
                    </div>
                </div>
                <div className="last_charts">
                    <SyncedPaceDistance runs={personalRuns} abreviatedUnit={abreviatedUnit} unit={unit} />
                    <DaysRanMonth  runs={personalRuns} abreviatedUnit={abreviatedUnit} />
                </div>
            </div>
        ) : (
            <Loader />
        )}
        </>
   );
};

export default EmpiricalDataDashboard;