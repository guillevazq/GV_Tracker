import React from 'react';

// Components
import SingleRun from './SingleRun';

// UI
import {getColor} from "../ColorPalette";

const RecentRuns = ({personalRuns, followingRuns, followingRunsVisibility, title, cap, editCapability=false, toggleEditForm=false}) => {
    let runs;
    if (followingRunsVisibility) {
        runs = followingRuns;
    } else {
        runs = personalRuns;
    };
    return (
        <div className="recent-runs-box">
            <h4>{title}</h4>
            <div className="title-runs">
                {cap && <p>Runner</p>}
                <p>Ran</p>
                <p>Pace</p>
                <p>Distance</p>
                <p>Time</p>
            </div>
            {runs.length === 0 ? (
                <div className="actual-recent-runs dummy-recent">
                    <hr />
                    {[...Array(4).keys()].map((index) => (
                        <SingleRun
                        dataKey={index}
                        key={index}
                        dummy={true}
                        editCapability={editCapability} />
                    ))}
                </div>
            ) : ( <>
                <div className="actual-recent-runs">
                    <hr />
                    {runs.slice(0, cap).map((run, index) => (
                        <>
                            <SingleRun 
                                key={run.id} 
                                dataKey={run.id} 
                                color={getColor(index)} 
                                dateRun={run.unix_date} 
                                distance={run.distance} 
                                seconds={run.seconds}
                                currentDate={new Date().getTime()}
                                editCapability={editCapability}
                                toggleEditForm={toggleEditForm}
                                authorUsername={run.username}
                                cap={cap}
                            />
                        </>
                    ))}
                </div>
            </> )}
        </div>
    );
};

export default RecentRuns;