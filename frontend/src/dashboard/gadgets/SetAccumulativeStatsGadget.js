import React, {useContext} from 'react';

// Context
import {RunsContext} from "../../context/RunsContext";

// Number animations
import AnimatedNumber from "animated-number-react";

// Colors
import {getColor} from "../ColorPalette";

const SetAccumulativeStatsGadget = ({runs}) => {
    const runsContext = useContext(RunsContext);
    const {
        secondsToMinutesSeconds,
        secondsToHoursMinutes
    } = runsContext;

    let speedArr = [], totalDistance = 0, totalTime = 0, totalSpeed = 0, speed = 0;

    runs.forEach(run => {
        // Speed in seconds/unit
        speed = run.seconds / run.distance;

        // Get total distance and time
        totalDistance += run.distance;
        totalTime += run.seconds;
        totalSpeed += speed;

        speedArr.push(speed);
    });

    let [totalHoursRan, totalMinutesRan] = secondsToHoursMinutes(totalTime);

    if (runs.length === 0) {
        speedArr = [0];
    };

    let [averageSpeedMinutes, averageSpeedSeconds] = secondsToMinutesSeconds(totalSpeed / speedArr.length);
    let [maxSpeedMinutes, maxSpeedSeconds] = secondsToMinutesSeconds(Math.min(...speedArr));

    let titles = ["Best Speed", "Total Distance", "Average Speed", "Total Time", "Percentile"];
    let icons = ["fighter-jet", "running", "flag-checkered", "clock", "medal"];
    let units = ["MIN/KM", "KM", "MIN/KM", "HRS", "%"];
    let stats = [null, totalDistance, null, null, 100.0];
    let minutes = [maxSpeedMinutes, null, averageSpeedMinutes, totalHoursRan, null];
    let seconds = [maxSpeedSeconds, null, averageSpeedSeconds, totalMinutesRan, null];

    return (
        <>
            {titles.map((title, index) => {
                return (<AccumulativeStatsGadget 
                    title={title} 
                    stat={stats[index]}
                    unit={units[index]} 
                    icon={icons[index]}  
                    minutes={minutes[index]}
                    seconds={seconds[index]} 
                    index={index}
                    key={index}
                    />
                );
            })}
        </>
    );
};

const AccumulativeStatsGadget = ({title, stat, unit, icon, minutes, seconds, index}) => {

    const formatTime = value => {
        value = parseInt(value).toFixed(0);
        if (value < 10) {
            value = "0" + value;
        };
        return value;
    };
    const formatDistance = value => {
        return value.toFixed(2)
    };

    let duration = 800;
    let timeoutEachNumber = 200;
    let currentDelay = duration + timeoutEachNumber * index;
    let easing = "linear";

    return (
        <div style={{backgroundColor: getColor(index)}} className="icon_stat_gadget">
            <div className="stat_number_name">
                <div className="total_number">
                    {stat ? (
                        <>
                            <AnimatedNumber easing={easing} duration={currentDelay} formatValue={formatDistance} value={stat} />
                            <small style={{fontSize: '1.0rem', marginLeft: '3px'}}>{unit}</small>
                        </>
                    ) : (
                        <p>
                            <AnimatedNumber easing={easing} duration={currentDelay} formatValue={formatTime} value={minutes} />
                            :
                            <AnimatedNumber easing={easing} duration={currentDelay} formatValue={formatTime} value={seconds} />
                            <small style={{fontSize: '1.0rem', marginLeft: '3px'}}>{unit}</small>
                        </p>
                    )}
                </div>
                <div className="name_of_stat">
                    <p>{title}</p>
                </div>
            </div>
            <div className="icon_stat">
                <i style={{color: "white"}} className={"fas fa-" + icon + " fa-4x"}></i>
            </div>
        </div>
    );
};

export default SetAccumulativeStatsGadget;