import React, {useContext, useEffect} from 'react';

import DefaultProfilePicture from "../../../images/default-profile-picture.jpg";

// Context
import {RunsContext} from '../../../context/RunsContext';
import {SocialContext} from '../../../context/SocialContext';

// UI
import Button from '@material-ui/core/Button';

const Following = () => {

    const {secondsToHours} = useContext(RunsContext);
    const {following, unfollowUser, getFollows, removeFavoriteUser, addFavoriteUser, doActionAndGetFollows} = useContext(SocialContext);
    
    useEffect(() => {
        getFollows();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {following && (
                <div className="followers">
                    {following.map((follower, index) => (
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
                                {follower.is_favorite ? (
                                    <i onClick={() => doActionAndGetFollows(removeFavoriteUser, follower.username)} className="fas fa-star fav-star"></i>
                                ) : (
                                    <i onClick={() => doActionAndGetFollows(addFavoriteUser, follower.username)} className="far fa-star fav-star"></i>
                                )}
                                <Button className="followed" variant="contained" color="inherit"
                                    onClick={() => doActionAndGetFollows(unfollowUser, follower.username)}>Unfollow</Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Following;