import React, {useState, useContext, useEffect} from 'react';

// Distance measurements
import {MeasurementUnits, Languages} from "../../graph_settings/GraphSettings";

// Context
import {AuthenticationContext} from "../../context/AuthenticationContext";
import {SocialContext} from '../../context/SocialContext';
import {RunsContext} from "../../context/RunsContext";

// UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';

const Details = () => {
    const {email, username, changeUsername}= useContext(AuthenticationContext);
    let {updateSettings, language, unit, weekly_goal} = useContext(SocialContext);
    const {getRunRange} = useContext(RunsContext);

    const [emailInput, setEmail] = useState(email);
    const [usernameInput, setUsername] = useState(username);
    const [distanceUnit, setDistanceUnit] = useState(unit);
    const [languageState, setLanguage] = useState(language);
    let [distanceUnitAbreviation, setDistanceUnitAbreviation] = useState("KM");
    const [weeklyDistanceGoal, setWeeklyDistanceGoal] = useState(weekly_goal);
    const [monthlyDistanceGoal, setMonthlyDistanceGoal] = useState((weeklyDistanceGoal / 7 * 30).toFixed(3));
    const [distanceRange, setDistanceRange] = useState(getRunRange());

    useEffect(() => {
        if (distanceUnit === "Miles") {
            setDistanceUnitAbreviation("Mi");
        } else if (distanceUnit === "Kilometers") {
            setDistanceUnitAbreviation("KM");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [distanceUnit]);

    useEffect(() => {
        if (distanceUnit === "Miles") {
            setWeeklyDistanceGoal(currentDistanceGoal => (currentDistanceGoal / 1.609344).toFixed(3));
        };
        if (localStorage.getItem("d-r")) {
            setDistanceRange(localStorage.getItem("d-r"));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateUsername = e => {
        if (usernameInput !== username) {
            changeUsername(usernameInput);
        };
    };

    let arrOfSettings = [["language", language, languageState], ["unit", unit, distanceUnit]];

    const saveSettings = e => {
        e.preventDefault();
        let submittedSettings = {}, currentDistance = weeklyDistanceGoal;
        arrOfSettings.forEach(currentSetting => {
            if (currentSetting[1] !== currentSetting[2]) {
                submittedSettings[currentSetting[0]] = currentSetting[2];
            }
        });
        if (distanceUnit === "Miles") {
            currentDistance = (weeklyDistanceGoal * 1.609344).toFixed(3);
        };

        currentDistance = parseFloat(currentDistance);
        if (currentDistance !== weekly_goal) {
            submittedSettings["weekly_goal"] = currentDistance;
        };

        console.log(submittedSettings);
        updateSettings(submittedSettings);
        updateUsername();
        if (Math.round(distanceRange) >= 1) {
            setDistanceRange(Math.round(distanceRange));
            localStorage.setItem("d-r", Math.round(distanceRange));
        } else {
            setDistanceRange(1);
        };
    };

    const handleWeeklyGoalChange = e => {
        setWeeklyDistanceGoal(e.target.value);
        setMonthlyDistanceGoal((e.target.value / 7 * 30).toFixed(3));
    };

    const handleMonthlyGoalChange = e => {
        setMonthlyDistanceGoal(e.target.value);
        setWeeklyDistanceGoal((e.target.value * 7 / 30).toFixed(3));
    };

    const handleDistanceUnitChange = e => {
        setDistanceUnit(e.target.value);
        if (e.target.value === "Kilometers") {
            setDistanceUnitAbreviation("KM");
            if (distanceUnit === "Miles") {
                setWeeklyDistanceGoal(currentWeeklyGoal => (currentWeeklyGoal * 1.609344).toFixed(3));
                setMonthlyDistanceGoal(currentMonthlyGoal => (currentMonthlyGoal * 1.609344).toFixed(3));
            };
        } else if (e.target.value === "Miles") {
            setDistanceUnitAbreviation("Mi.");
            if (distanceUnit === "Kilometers") {
                setWeeklyDistanceGoal(currentWeeklyGoal => (currentWeeklyGoal / 1.609344).toFixed(3));
                setMonthlyDistanceGoal(currentMonthlyGoal => (currentMonthlyGoal / 1.609344).toFixed(3));
            };
        };
    };

    const handlePreferredDistance = e => {
        setDistanceRange(e.target.value);
    };

    return (
        <div>
            {email && username && language && weekly_goal && unit && (
                <>
                <h4 className="title-settings">Details</h4>
                <hr />
                <div className="space-settings">
                    <form onSubmit={saveSettings} className="fields-available">
                        <div className="username-change-field">
                            <TextField variant="standard" id="username" label="Username" value={usernameInput} onChange={e => setUsername(e.target.value)} />
                            {(usernameInput.length < 4 || usernameInput.length > 40) ? (
                                <div className="length-username-red">{usernameInput.length}/40</div>
                            ): (
                                <div className="length-username-green">{usernameInput.length}/40</div>
                            )}
                        </div>
                        <div className="unit-change-field">
                            <TextField select label="Distance Unit" value={distanceUnit} variant="outlined"
                                onChange={handleDistanceUnitChange} >
                                    {MeasurementUnits.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                            </TextField>
                        </div>
                        <div className="change-language-field">
                            <TextField select label="Language" value={languageState} variant="outlined" onChange={e => setLanguage(e.target.value)}>
                                    {Languages.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                            </TextField>
                        </div>
                        <div className="preferred-distance-range">
                            <TextField id="outlined-number" label="Distance Range" helperText="" type="number"
                                InputProps={{ endAdornment: <InputAdornment position="end">{distanceUnitAbreviation}</InputAdornment>}}
                                InputLabelProps={{shrink: true}} variant="outlined" value={distanceRange} onChange={handlePreferredDistance} />
                        </div>
                        <div className="email-change-field">
                            <TextField
                                InputProps={{readOnly: true}}
                                variant="standard" type="email" id="email" label="Email" value={emailInput}
                                onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="weekly-goal-change-field">
                            <TextField
                                InputProps={{ endAdornment: <InputAdornment position="end">{distanceUnitAbreviation}</InputAdornment>}}
                                variant="outlined" type="number" id="weekly-goal" label="Weekly Distance Goal"
                                value={weeklyDistanceGoal} onChange={handleWeeklyGoalChange} />
                        </div>
                        <div className="monthly-goal-change-field">
                            <TextField
                                InputProps={{ endAdornment: <InputAdornment position="end">{distanceUnitAbreviation}</InputAdornment>}}
                                variant="outlined" type="number" id="monthly-goal" label="Monthly Distance Goal"
                                value={monthlyDistanceGoal} onChange={handleMonthlyGoalChange} />
                        </div>
                        <div className="save-btn-div">
                            <Button type="submit" variant="contained" color="primary">Save</Button>
                        </div>
                    </form>
                </div>
                </>
            )}
        </div>
    );
};

export default Details;