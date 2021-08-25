import React, {useState, useContext, useEffect} from 'react';
import {AuthenticationContext} from '../context/AuthenticationContext';
import RecentRuns from '../dashboard/gadgets/RecentRuns';
import {RunsContext} from '../context/RunsContext';
import RunEditForm from './RunEditForm';
import RunSubmissionForm from './RunSubmissionForm';

const RunningHistory = props => {

    // Instantiating the context
    const authenticationContext = useContext(AuthenticationContext);
    const runsContext = useContext(RunsContext);

    // Destructure it
    const {isLogged} = authenticationContext;
    const {recentlyAdded, getRuns, runs} = runsContext;

    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        getRuns();
    }, []);

    useEffect(() => {
        if (isLogged === false) {
            props.history.push("/login");
        }
    }, [isLogged]);

    useEffect(() => {
        if (recentlyAdded) {
            props.history.push("/");
        };
    }, [recentlyAdded]);

    return (
        <>
        {runs && (
            <div className="run-info-page">
                <div className='recent-runs-div'>
                    <RecentRuns editMode={editMode} title={"All Runs"} setEditMode={setEditMode} />
                </div>
                {!editMode ? (
                    <RunSubmissionForm />
                ) : (
                    <RunEditForm editMode={editMode} setEditMode={setEditMode} />
                )}
            </div>
        )}
        </>
    );
};
export default RunningHistory;