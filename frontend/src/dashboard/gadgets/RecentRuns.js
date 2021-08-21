import React, {useContext} from 'react';
import ColorPalette from '../ColorPalette';
import {RunsContext} from "../../context/RunsContext";

const SingleRun = ({daysAgo, distance, minutes, seconds, color, currentDate}) => {
    // minutes
    let timeAgo = (currentDate - new Date(daysAgo).getTime()) / 1000 / 60;

    let hoursDecimal;
    let hours;
    let days;

    if (timeAgo >= 60) {
        hoursDecimal = timeAgo / 60
        hours = Math.floor(hoursDecimal)
        if (hours >= 24) {
            days = Math.floor(hours / 24);
            if (days === 1) {
                timeAgo = `${days} day ago`
            } else {
                timeAgo = `${days} days ago`
            }
        }
        else if (hours === 1) {
            timeAgo = `${hours} hour ago`
        } else {
            timeAgo = `${hours} hours ago`
        }
    } else {
        timeAgo = `${Math.floor(timeAgo)} minutes ago`
    } 

    let time_per_km = (minutes + (seconds / 60)) / distance;
    let minutes_per_km = Math.floor(time_per_km);
    let seconds_per_km = Math.round((time_per_km - minutes_per_km) * 60)

    // Duration
    let hoursDuration = 0;
    if (minutes >= 60) {
        hoursDuration = Math.floor(minutes / 60);
    }
    if (hoursDuration < 10) {
        hoursDuration = "0" + hoursDuration;
    } 
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    while (minutes >= 60) {
        minutes = minutes - 60;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (seconds_per_km < 10) {
        seconds_per_km = "0" + seconds_per_km;
    }

    return (
        <div className="single-run">
            <div className="days-ago">
                <p>{timeAgo}</p>
            </div>
            <div className="pace-single-run">
                <p style={{backgroundColor: color}}>{minutes_per_km}:{seconds_per_km} Min / KM</p>
            </div>
            <div className="total_distance">
                <p>{distance.toFixed(2)} KM</p>
            </div>
            <div className="total_time-bold">
                <p>{hoursDuration}:{minutes}:{seconds}</p>
            </div>
        </div>
    );
};

const RecentRuns = () => {
    let runsContext = useContext(RunsContext);
    const {runs} = runsContext;
    let currentDate = (new Date()).getTime();

    return (
        <div className="recent-runs-box">
            <h4>Recent Runs</h4>
            <div className="title-runs">
                <p>Date</p>
                <p>Pace</p>
                <p>Distance</p>
                <p>Time</p>
            </div>
            <div className="actual-recent-runs">
                <hr />
                    {runs.slice(0, 4).map((run, index) => (
                    <SingleRun 
                        key={run.id} 
                        color={ColorPalette[index]} 
                        daysAgo={run.date} 
                        distance={run.distance} 
                        minutes={run.minutes} 
                        seconds={run.seconds}
                        currentDate={currentDate}
                    />
                    ))}
            </div>
        </div>
    );
};

export default RecentRuns;