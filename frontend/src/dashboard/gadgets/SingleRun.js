import React, {useContext, useEffect, useState} from 'react';
import {AuthenticationContext} from '../../context/AuthenticationContext';

const SingleRun = ({runFunctions, abreviatedUnit, dateRun, distance, seconds, color, dataKey, dummy=false, editCapability, toggleEditForm, authorUsername, cap=false}) => {
    const [backgroundRun, setBackgroundRun] = useState("");
    let {username} = useContext(AuthenticationContext);

    const {
        deleteRun,
        secondsToPace,
        representTimedeltaInPrettyString,
        secondsToStringHMS,
        secondsToMinutesSeconds,
        populateEditFormData,
        editFormData,
    } = runFunctions;

    let timeAgo = representTimedeltaInPrettyString(dateRun);
    let [minutes_per_km, seconds_per_km] = secondsToPace(seconds, distance);
    let [hoursFormatted, minutesFormatted, secondsFormatted] = secondsToStringHMS(seconds);

    const deleteItem = e => {
        let itemId = e.target.parentElement.parentElement.parentElement.getAttribute("data-key");
        deleteRun(itemId);
    }

    if (seconds_per_km < 10) {
        seconds_per_km = "0" + seconds_per_km;
    }

    const setRunInEditMode = e => {
        let [minutesState, secondsState] = secondsToMinutesSeconds(seconds);
        populateEditFormData(minutesState, secondsState, distance.toFixed(2), dateRun, dataKey);
        toggleEditForm();
    };

    useEffect(() => {
        if (editFormData) {
            if (editFormData.id === dataKey) {
                setBackgroundRun("selected-editing")
            } else {
                setBackgroundRun("");
            };
        } else {
            setBackgroundRun("");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editFormData]);

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
                    {editCapability && (
                        <div className="edit-icon">
                            <i className="far fa-edit"></i>
                        </div>
                    )}
                    <div className="delete-icon">
                        <i className="far fa-trash-alt"></i>
                    </div> 
                </div>
            </div>
        ) : (
            <>
                <div data-key={dataKey} className={"single-run " + backgroundRun + " desktop-run"}>
                    {cap && (
                        <div className="important-stat">
                            {authorUsername === username ? (
                                <p>You</p>
                            ) : (
                                <p>{authorUsername}</p>
                            )}
                        </div>
                    )}
                    <div className="important-stat days-ago">
                        <p>{timeAgo}</p>
                    </div>
                    <div className="important-stat pace-single-run">
                        <p style={{backgroundColor: color}}>{minutes_per_km}:{seconds_per_km} Min /{abreviatedUnit}</p>
                    </div>
                    <div className="important-stat total_distance">
                        <p>{distance.toFixed(2)} {abreviatedUnit}</p>
                    </div>
                    <div className="important-stat total_time-bold">
                        <p>{hoursFormatted}:{minutesFormatted}:{secondsFormatted}</p>
                    </div>
                    <div className="icons" >
                        {editCapability && (
                            <div className="edit-icon">
                                <i style={{cursor: "pointer"}} onClick={setRunInEditMode} className="far fa-edit"></i>
                            </div>
                        )}
                        {authorUsername === username && !cap && (
                            <div className="delete-icon">
                                <i style={{cursor: "pointer"}} onClick={deleteItem} className="far fa-trash-alt"></i>
                            </div>
                        )}
                    </div>
                </div>
                <div data-key={dataKey} className={"single-run " + backgroundRun + " mobile-run"}>
                    {cap && (
                        <div className="important-stat">
                            {authorUsername === username ? (
                                <p>You</p>
                            ) : (
                                <p>{authorUsername}</p>
                            )}
                        </div>
                    )}
                    <div className="important-stat days-ago">
                        <p>{timeAgo}</p>
                    </div>
                    <div className="distance-pace-div">
                        <div className="important-stat total_distance">
                            <p>{distance.toFixed(2)} {abreviatedUnit}</p>
                        </div>
                        <div className="important-stat pace-single-run">
                            <p style={{backgroundColor: color}}>{minutes_per_km}:{seconds_per_km} Min /{abreviatedUnit}</p>
                        </div>
                    </div>
                    <div className="important-stat total_time-bold">
                        <p>{hoursFormatted}:{minutesFormatted}:{secondsFormatted}</p>
                    </div>
                    <div className="icons" >
                        {editCapability && (
                            <div className="edit-icon">
                                <i style={{cursor: "pointer"}} onClick={setRunInEditMode} className="far fa-edit"></i>
                            </div>
                        )}
                        {authorUsername === username && !cap && (
                            <div className="delete-icon">
                                <i style={{cursor: "pointer"}} onClick={deleteItem} className="far fa-trash-alt"></i>
                            </div>
                        )}
                    </div>
                </div>
            </>
        )}
        </>
    );
};

export default SingleRun;