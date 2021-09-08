import React, {useContext, useState, useEffect} from 'react';

import DefaultProfilePicture from "../../../images/default-profile-picture.jpg";

// Context
import {RunsContext} from '../../../context/RunsContext';
import {SocialContext} from '../../../context/SocialContext';

// UI
import Button from '@material-ui/core/Button';

const FollowsList = () => {

    const {secondsToHours} = useContext(RunsContext);
    const {sentFollowRequests, followUser, cancelRequest, getFollows, doActionAndGetFollows} = useContext(SocialContext);
    const [usernameInput, setUsernameInput] = useState("");

    useEffect(() => {
        getFollows();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {sentFollowRequests && (
                <div className="followers">
                    <div className="search-username-div">
                        <div className="title-send-request">
                            <h5>Send Follow Request</h5>
                        </div>
                        <div>
                            <input value={usernameInput} placeholder="Type the username here..." type="text"
                            className="search-username" onChange={e => setUsernameInput(e.target.value)} />
                            <i onClick={() => doActionAndGetFollows(followUser, usernameInput)} className="fas fa-paper-plane send-request-emoji"></i>
                        </div>
                    </div>
                    {sentFollowRequests.map((follower, index) => (
                        <div key={index} className="single-follower">
                            <div className="info-user">
                                <div className="profile-pic">
                                    <img src={DefaultProfilePicture} alt={`${follower.username}`} />
                                </div>
                                <div className="general-info">
                                    <div className="username-profile">
                                        {follower.username}
                                    </div>
                                    <div className="short-stats">
                                        <span>{secondsToHours(follower.total_time)} HRS</span>
                                        <span>{follower.total_distance.toFixed(2)} KM</span>
                                    </div>
                                </div>
                            </div>
                            <div className="follow-btn">
                                <div>
                                    <Button className="cancel-request" variant="contained" color="inherit"
                                    onClick={() => doActionAndGetFollows(cancelRequest, follower.username)} >Cancel</Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default FollowsList;