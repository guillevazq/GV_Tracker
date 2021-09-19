import React, {useContext, useEffect, useState} from 'react';

// Context
import {AuthenticationContext} from '../context/AuthenticationContext';
import {RunsContext} from '../context/RunsContext';
import {SocialContext} from '../context/SocialContext';

// Components
import RecentRuns from '../dashboard/gadgets/RecentRuns';
import RunEditForm from './RunEditForm';
import RunSubmissionForm from './RunSubmissionForm';

// UI
import Loader from "../ui/Loader";
import Backdrop from '@material-ui/core/Backdrop';
import {makeStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const RunningHistory = props => {
    const {isLogged} = useContext(AuthenticationContext);
    const {unit, getSettings, isVerified, getFollows} = useContext(SocialContext);
    const {
        getRuns,
        personalRuns,
        submitFormVisibility,
        toggleSubmitForm,
        editFormVisibility,
        toggleEditForm,
        editFormData,
        convertRunsToMiles,
    } = useContext(RunsContext);
    const classes = useStyles();
    const [transformToUnit, setTransformToUnit] = useState(false);

    useEffect(() => {
        if (isVerified === false) {
            props.history.push("/verify-email");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVerified]);

    useEffect(() => {
        getSettings();
        getRuns();
        getFollows();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (personalRuns && unit && !transformToUnit) {
            convertRunsToMiles(personalRuns, unit);
            setTransformToUnit(true);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unit, personalRuns]);

    useEffect(() => {
        if (isLogged === false) {
            props.history.push("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogged]);

    return (
        <>
        {(personalRuns && isLogged && transformToUnit && isVerified) ? (
            <div className="run-info-page">
                <div className='recent-runs-div'>
                    <RecentRuns followingRunsVisibility={false} editCapability={true} personalRuns={personalRuns} title={"All Runs"} toggleEditForm={toggleEditForm}/>
                </div>
                <Backdrop className={classes.backdrop} open={editFormVisibility}>
                    {editFormData && (
                        <RunEditForm setTransformToUnit={setTransformToUnit} unit={unit} toggleEditForm={toggleEditForm} />
                    )}
                </Backdrop>
                <Backdrop className={classes.backdrop} open={submitFormVisibility}>
                    <RunSubmissionForm setTransformToUnit={setTransformToUnit} unit={unit} />
                </Backdrop>
                <Fab className="add-new-run-btn" onClick={() => toggleSubmitForm()} color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </div>
        ) : (
            <Loader />
        )}
        </>
    );
};
export default RunningHistory;