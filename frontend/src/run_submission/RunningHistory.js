import React, {useState, useContext, useEffect} from 'react';

// Context
import {AuthenticationContext} from '../context/AuthenticationContext';
import {RunsContext} from '../context/RunsContext';

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
    const {getRuns, personalRuns, submitFormVisibility, toggleSubmitForm, editFormVisibility, toggleEditForm, editFormData} = useContext(RunsContext);
    const classes = useStyles();

    useEffect(() => {
        getRuns();
    }, []);

    useEffect(() => {
        if (isLogged === false) {
            props.history.push("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogged]);

    return (
        <>
        {(personalRuns && isLogged) ? (
            <div className="run-info-page">
                <div className='recent-runs-div'>
                    <RecentRuns editCapability={true} runs={personalRuns} title={"All Runs"} toggleEditForm={toggleEditForm}/>
                </div>
                <Backdrop className={classes.backdrop} open={editFormVisibility}>
                    {editFormData && (
                        <RunEditForm toggleEditForm={toggleEditForm} />
                    )}
                </Backdrop>
                <Backdrop className={classes.backdrop} open={submitFormVisibility}>
                    <RunSubmissionForm />
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