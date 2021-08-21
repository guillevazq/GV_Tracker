import React from 'react';
import ColorPalette from '../ColorPalette';

const SingleRun = ({daysAgo, distance, time, color}) => {
    let time_per_km = time / distance;
    return (
        <div className="single-run">
            <div className="days-ago">
                <p>{daysAgo} Days ago</p>
            </div>
            <div className="pace-single-run">
                <p style={{backgroundColor: color}}>{time_per_km} Min / KM</p>
            </div>
            <div className="total_distance">
                <p>{distance} KM</p>
            </div>
            <div className="total_time-bold">
                <p>{time} Minutes</p>
            </div>
        </div>
    );
};

const RecentRuns = () => {
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
                <SingleRun color={ColorPalette[0]} daysAgo={5} distance={10} time={5} />
                <SingleRun color={ColorPalette[1]} daysAgo={5} distance={10} time={5} />
                <SingleRun color={ColorPalette[2]} daysAgo={5} distance={10} time={5} />
                <SingleRun color={ColorPalette[3]} daysAgo={5} distance={10} time={5} />
            </div>
        </div>
    );
};

export default RecentRuns;