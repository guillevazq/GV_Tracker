import React, {useContext, useEffect, useState} from 'react';
import {RunsContext} from "../../context/RunsContext";
import {getColor} from "../ColorPalette";

const SingleRun = ({dateRun, distance, minutes, seconds, color, dataKey, dummy=false, edit, setEditMode, editMode}) => {
    const [cursorIcons, setCursorIcons] = useState("pointer");
    const [iconStyleHover, setIconStyleHover] = useState("");

    let runsContext = useContext(RunsContext);
    const {
        deleteRun, 
        getSpeedMinKM, 
        representTimedeltaInPrettyString,
        minutesSecondsToStringHMS,
    } = runsContext;

    let timeAgo = representTimedeltaInPrettyString(dateRun);
    let [minutes_per_km, seconds_per_km] = getSpeedMinKM(minutes, seconds, distance);
    let [hoursFormatted, minutesFormatted, secondsFormatted] = minutesSecondsToStringHMS(minutes, seconds);

    const deleteItem = e => {
        if (!editMode) {
            let itemId = e.target.parentElement.parentElement.parentElement.getAttribute("data-key");
            deleteRun(itemId);
        }
    }

    if (seconds_per_km < 10) {
        seconds_per_km = "0" + seconds_per_km;
    }

    const setRunInEditMode = e => {
        if (!editMode) {
            setEditMode({minutes, seconds, distance, dateRun, id: dataKey});
        }
    };

    useEffect(() => {
        if (!editMode) {
            setCursorIcons("pointer");
            setIconStyleHover("");
        } else {
            setCursorIcons("not-allowed");
            setIconStyleHover("not-allowed-icons");
        };
    }, [editMode]);

    return (
        <>
        {dummy ? (
            <div data-key={dataKey} className="single-run">
                <div className="important-stat days-ago">
                    <p>Empty</p>
                </div>
                <div className="important-stat pace-single-run">
                    <p style={{color: "black"}}>Empty</p>
                </div>
                <div className="important-stat total_distance">
                    <p>Empty</p>
                </div>
                <div className="important-stat total_time-bold">
                    <p>Empty</p>
                </div>
                <div className="icons" >
                    <div className="edit-icon">
                        <i className="far fa-edit"></i>
                    </div>
                    <div className="delete-icon">
                        <i className="far fa-trash-alt"></i>
                    </div>
                </div>
            </div>
        ): (
            <div data-key={dataKey} className="single-run">
                <div className="important-stat days-ago">
                    <p>{timeAgo}</p>
                </div>
                <div className="important-stat pace-single-run">
                    <p style={{backgroundColor: color}}>{minutes_per_km}:{seconds_per_km} Min / KM</p>
                </div>
                <div className="important-stat total_distance">
                    <p>{distance.toFixed(2)} KM</p>
                </div>
                <div className="important-stat total_time-bold">
                    <p>{hoursFormatted}:{minutesFormatted}:{secondsFormatted}</p>
                </div>
                <div className={"icons " + iconStyleHover} >
                    {edit && setEditMode && (
                        <div className="edit-icon">
                            <i style={{cursor: cursorIcons}} onClick={setRunInEditMode} className="far fa-edit"></i>
                        </div>
                    )}
                    <div className="delete-icon">
                        <i style={{cursor: cursorIcons}} onClick={deleteItem} className="far fa-trash-alt"></i>
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

const RecentRuns = ({title, setEditMode, editMode, cap=false}) => {
    let runsContext = useContext(RunsContext);
    const {runs} = runsContext;
    let currentDate = (new Date()).getTime();

    return (
        <div className="recent-runs-box">
            <h4>{title}</h4>
            <div className="title-runs">
                <p>Ran</p>
                <p>Pace</p>
                <p>Distance</p>
                <p>Time</p>
            </div>
                {runs.length === 0 ? (
                    <>
                    <div className="actual-recent-runs dummy-recent">
                        <hr />
                        <SingleRun dataKey={1} key={1} dummy={true}/>
                        <SingleRun dataKey={2} key={2} dummy={true}/>
                        <SingleRun dataKey={3} key={3} dummy={true}/>
                        <SingleRun dataKey={4} key={4} dummy={true}/>
                    </div>
                    </>
                ) : (
                <>
                    <div className="actual-recent-runs">
                        <hr />
                        {cap ? (
                                <>
                                    {runs.slice(0, cap).map((run, index) => (
                                        <SingleRun 
                                            key={run.id} 
                                            dataKey={run.id} 
                                            color={getColor(index)} 
                                            dateRun={run.unix_date} 
                                            distance={run.distance} 
                                            minutes={run.minutes} 
                                            seconds={run.seconds}
                                            currentDate={currentDate}
                                            edit={false}
                                            setEditMode={setEditMode}
                                            editMode={editMode}
                                        />
                                    ))}
                                </>
                            ) : (
                                <>
                                    {runs.map((run, index) => (
                                    <SingleRun 
                                        key={run.id} 
                                        dataKey={run.id} 
                                        color={getColor(index)} 
                                        dateRun={run.unix_date} 
                                        distance={run.distance} 
                                        minutes={run.minutes} 
                                        seconds={run.seconds}
                                        currentDate={currentDate}
                                        edit={true}
                                        setEditMode={setEditMode}
                                        editMode={editMode}
                                    />
                                    ))}
                                </>
                            )
                        }
                    </div>
                </>
            )}
        </div>
    );
};

export default RecentRuns;