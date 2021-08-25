import React, {useContext} from 'react';
import AnimatedNumber from "animated-number-react";
import {RunsContext} from '../../context/RunsContext';
import {getColor} from "../ColorPalette";

const AccumulativeStatsGadget = ({totalNumber, nameOfStat, iconImageClassName, iconColor, backgroundColor, minutes, seconds, unit, index}) => {

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

    let duration = 500;
    let timeoutEachNumber = 400;
    let currentDelay = duration + timeoutEachNumber * index;
    let easing = "linear";

    return (
        <div style={{backgroundColor: backgroundColor}} className="icon_stat_gadget">
            <div className="stat_number_name">
                <div className="total_number">
                    {totalNumber ? (
                        <>
                            <AnimatedNumber easing={easing} duration={currentDelay} formatValue={formatDistance} value={totalNumber} />
                            <small style={{fontSize: '1.0rem', marginLeft: '3px'}}>{unit}</small>
                        </>
                    ) : (
                        <p>
                            <AnimatedNumber easing={easing} duration={currentDelay} formatValue={formatTime} value={minutes} />:
                            <AnimatedNumber easing={easing} duration={currentDelay} formatValue={formatTime} value={seconds} />
                            <small style={{fontSize: '1.0rem', marginLeft: '3px'}}>{unit}</small>
                        </p>
                    )}
                </div>
                <div className="name_of_stat">
                    <p>{nameOfStat}</p>
                </div>
            </div>
            <div className="icon_stat">
                <i style={{color: "white"}} className={iconImageClassName}></i>
            </div>
        </div>
    );
};

const SetAccumulativeStatsGadget = () => {
    const runsContext = useContext(RunsContext);
    const {runs, secondsToRawHMS} = runsContext;

    let speedArr = [];
    let distance = 0;
    let totalTime = 0;
    let sumSpeed = 0;
    runs.forEach(run => {
        let speed = (run.minutes + run.seconds / 60) / run.distance;
        sumSpeed += speed;
        speedArr.push(speed);
        distance = distance + run.distance;
        totalTime = totalTime + (run.minutes * 60 + run.seconds);
    });

    let [totalHours, totalMinutes, totalSeconds] = secondsToRawHMS(totalTime);

    let max_speed = Math.min(...speedArr);
    let averageSpeed = (sumSpeed / speedArr.length);
    let [averageHours, averageMinutes, averageSeconds] = secondsToRawHMS(averageSpeed * 60);
    averageMinutes = averageMinutes + (averageHours * 60);
    let minutes = Math.floor(max_speed);
    let seconds = Math.round((max_speed - minutes) * 60);

    let icons = [
        {
            title: "Best speed",
            nameOfClass: "fas fa-fighter-jet fa-4x",
            color: "black",
            backgroundColor: getColor(0),
            stat: null,
            minutes: minutes,
            seconds: seconds,
            unit: "MIN/KM",
            iconColor: "white",
        },
        {
            title: "Total distance",
            nameOfClass: "fas fa-running fa-4x",
            color: "black",
            backgroundColor: getColor(1),
            stat: distance,
            minutes: null,
            seconds: null,
            unit: "KM",
            iconColor: "white",
        },
        {
            title: "Average speed",
            nameOfClass: "fas fa-flag-checkered fa-4x",
            color: "black",
            backgroundColor: getColor(2),
            stat: null,
            minutes: averageMinutes,
            seconds: averageSeconds,
            iconColor: "white",
            unit: 'MIN/KM',
        },
        {
            title: "Total time",
            nameOfClass: "far fa-clock fa-4x",
            color: "black",
            backgroundColor: getColor(3),
            stat: null,
            minutes: totalHours,
            seconds: totalMinutes,
            unit: "HRS",
            iconColor: "white",
        },
        {
            title: "Percentile",
            nameOfClass: "fas fa-medal fa-4x",
            color: "black",
            backgroundColor: getColor(4),
            stat: 100.0,
            minutes: null,
            seconds: null,
            unit: "%",
            iconColor: "white",
        }
 
    ]

    return (
        <React.Fragment>
            {icons.map((icon, index) => {
                const {backgroundColor, stat, title, nameOfClass, minutes, seconds, unit, color} = icon;
                return (
                    <div key={index}>
                        <AccumulativeStatsGadget 
                            backgroundColor={backgroundColor} 
                            totalNumber={stat} 
                            nameOfStat={title} 
                            iconImageClassName={nameOfClass} 
                            minutes={minutes}
                            seconds={seconds}
                            index={index}
                            unit={unit}
                            iconColor={color} />
                    </div>
                );
            })}
        </React.Fragment>
    );
};

export default SetAccumulativeStatsGadget;