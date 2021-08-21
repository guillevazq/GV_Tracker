import React from 'react';
import AnimatedNumber from "animated-number-react";
import ColorPalette from "../ColorPalette";

const AccumulativeStatsGadget = ({totalNumber, nameOfStat, iconImageClassName, iconColor, backgroundColor, minutes, seconds, unit, index}) => {

    const formatTime = value => value.toFixed(0);
    const formatDistance = value => value.toFixed(2);

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
    let icons = [
        {
            title: "Best speed",
            nameOfClass: "fas fa-fighter-jet fa-4x",
            color: "black",
            backgroundColor: ColorPalette[0],
            stat: null,
            minutes: 5,
            seconds: 33,
            unit: "MIN/KM",
            iconColor: "white",
        },
        {
            title: "Total distance",
            nameOfClass: "fas fa-running fa-4x",
            color: "black",
            backgroundColor: ColorPalette[1],
            stat: 267,
            minutes: null,
            seconds: null,
            unit: "KM",
            iconColor: "white",
        },
        {
            title: "Average speed",
            nameOfClass: "fas fa-flag-checkered fa-4x",
            color: "black",
            backgroundColor: ColorPalette[2],
            stat: null,
            minutes: 6,
            seconds: 35,
            iconColor: "white",
            unit: 'MIN/KM',
        },
        {
            title: "Total time",
            nameOfClass: "far fa-clock fa-4x",
            color: "black",
            backgroundColor: ColorPalette[3],
            stat: 34.5,
            minutes: null,
            seconds: null,
            unit: "HRS",
            iconColor: "white",
        },
        {
            title: "Percentile",
            nameOfClass: "fas fa-medal fa-4x",
            color: "black",
            backgroundColor: ColorPalette[4],
            stat: 73.45,
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