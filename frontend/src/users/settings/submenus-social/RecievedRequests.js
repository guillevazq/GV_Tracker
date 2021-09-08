import React, {useContext, useEffect} from 'react';

import DefaultProfilePicture from "../../../images/default-profile-picture.jpg";

// Context
import {RunsContext} from '../../../context/RunsContext';
import {SocialContext} from '../../../context/SocialContext';

// UI
import Button from '@material-ui/core/Button';

const RecievedRequests = () => {

    const {secondsToHours} = useContext(RunsContext);
    const {recievedFollowRequests, acceptFriendRequest, rejectUserRequest, getFollows, doActionAndGetFollows} = useContext(SocialContext);

    useEffect(() => {
        getFollows();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {recievedFollowRequests && (
                <div className="followers">
                    {recievedFollowRequests.map((follower, index) => (
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
                                <div className="recieved-requests">
                                    <Button className="accept-request" variant="contained" color="inherit"
                                        onClick={() => doActionAndGetFollows(acceptFriendRequest, follower.username)}>Accept</Button>
                                    <Button className="remove-request" variant="contained" color="inherit"
                                        onClick={() => doActionAndGetFollows(rejectUserRequest, follower.username)}>Remove</Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default RecievedRequests;