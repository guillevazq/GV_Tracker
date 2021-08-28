import React, { useState, useEffect, useContext } from 'react';
import ReactApexChart from 'react-apexcharts';

const WeeklyGoal = () => {
    const [weeklyGoal, setWeeklyGoal] = useState();
    const [monthlyGoal, setMonthlyGoal] = useState();

    let series = [70];
    let options = {
        options: {
            chart: {
                height: 350,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '70%',
                    }
                },
            },
            labels: ['Cricket'],
        }
    };


    let series2 = [70];
    let options2 = {
        options: {
            chart: {
                height: 350,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '70%',
                    }
                },
            },
            labels: ['Cricket'],
        }
    };

    useEffect(() => {
        setMonthlyGoal(Math.floor(weeklyGoal / 7 * 30.5));
    }, [weeklyGoal]);

    return (
        <div>
            <ReactApexChart options={options} series={series} type="radialBar" height={350} />
            <ReactApexChart options={options2} series={series2} type="radialBar" height={350} />
        </div>
    );
};

export default WeeklyGoal;