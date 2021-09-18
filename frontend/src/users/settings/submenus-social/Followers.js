import React, {useContext, useEffect} from 'react';

import DefaultProfilePicture from "../../../images/default-profile-picture.jpg";

// Context
import {RunsContext} from '../../../context/RunsContext';
import {SocialContext} from '../../../context/SocialContext';

// UI
import Button from '@material-ui/core/Button';

const Followers = () => {
    const {secondsToHours} = useContext(RunsContext);
    const {followers, followUser, unfollowUser, removeFollower, getFollows, doActionAndGetFollows} = useContext(SocialContext);

    useEffect(() => {
        getFollows();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {followers && (
                <div className="followers">
                    {followers.map((follower, index) => (
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
                            <div className="follow-btn follower-item">
                                {follower.followed_by_you === "request-sent" && (
                                    <Button className="cancel-request disabled-request" variant="contained" color="inherit">
                                        Request Sent
                                    </Button>
                                )}
                                {follower.followed_by_you === true && (
                                    <Button className="followed" variant="contained" color="inherit"
                                    onClick={() => doActionAndGetFollows(unfollowUser, follower.username)}>Unfollow</Button>
                                )}
                                {follower.followed_by_you === false && (
                                    <Button className="not-followed" variant="contained" color="inherit"
                                    onClick={() => doActionAndGetFollows(followUser, follower.username)}>Follow</Button>
                                )}
                                <Button className="remove-follower" variant="contained" color="inherit"
                                onClick={() => doActionAndGetFollows(removeFollower, follower.username)}>Remove Follower</Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Followers;