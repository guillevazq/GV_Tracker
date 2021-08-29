import React, {useContext, useEffect, useState} from 'react';
import {RunsContext} from "../../context/RunsContext";

const SingleRun = ({dateRun, distance, seconds, color, dataKey, dummy=false, editCapability, toggleEditForm}) => {
    const [cursorIcons, setCursorIcons] = useState("pointer");
    const [iconStyleHover, setIconStyleHover] = useState("");
    const [backgroundRun, setBackgroundRun] = useState("");

    let runsContext = useContext(RunsContext);

    const {
        deleteRun,
        secondsToPace,
        representTimedeltaInPrettyString,
        secondsToStringHMS,
        secondsToMinutesSeconds,
        populateEditFormData,
        editFormData,
    } = runsContext;

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
        populateEditFormData(minutesState, secondsState, distance, dateRun, dataKey);
        toggleEditForm();
    };

    useEffect(() => {
        if (editFormData) {
            if (editFormData.id === dataKey) {
                setBackgroundRun("#FFD697")
            } else {
                setBackgroundRun("");
            };
        } else {
            setBackgroundRun("");
        };
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
                    <div className="edit-icon">
                        <i className="far fa-edit"></i>
                    </div>
                    <div className="delete-icon">
                        <i className="far fa-trash-alt"></i>
                    </div>
                </div>
            </div>
        ): (
            <div style={{backgroundColor: backgroundRun}} data-key={dataKey} className="single-run">
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
                    {editCapability && (
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

export default SingleRun;