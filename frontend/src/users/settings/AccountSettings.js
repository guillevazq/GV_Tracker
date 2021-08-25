import React, {useState, useContext, useEffect, useRef} from 'react';
import {AuthenticationContext} from '../../context/AuthenticationContext';
import {RunsContext} from '../../context/RunsContext';
import UserSpecificSettings from './UserSpecificSettings';
import PasswordSettings from './PasswordSettings';
import FriendSettings from "./FriendsSettings";

const AccountSettings = props => {
    const authenticationContext = useContext(AuthenticationContext);
    const {setTokenFromLS, email, isLogged} = authenticationContext;
    const runsContext = useContext(RunsContext);
    const {getRuns} = runsContext;

    const [currentPage, setCurrentPage] = useState(<PasswordSettings />);

    const [classFriends, setClassFriends] = useState("friends");
    const [classAccounts, setClassAccounts] = useState("account-details-email-lang");
    const [classPassword, setClassPassword] = useState("password-reset selected");

    useEffect(() => {
        getRuns();
        setTokenFromLS();
    }, []);

    useEffect(() => {
        if (isLogged === false) {
            props.history.push("/login");
        }
    }, [isLogged, props.history]);


    const changePage = componentName => {
        if (componentName === "friends") {
            setCurrentPage(<FriendSettings />);
            setClassFriends(currClass => currClass + " selected");
            setClassAccounts("account-details-email-lang");
            setClassPassword("password-reset");
        } else if (componentName === "account") {
            setCurrentPage(<UserSpecificSettings />);
            setClassAccounts(currClass => currClass + " selected selected-bottom");
            setClassFriends("friends");
            setClassPassword("password-reset");
        } else if (componentName === "passwords") {
            setCurrentPage(<PasswordSettings />);
            setClassPassword(currClass => currClass + " selected");
            setClassAccounts("account-details-email-lang");
            setClassFriends("friends");
        };
    };

    return (
        <div className="account-settings">
            {email && (
                <>
                    <ul className="side-menu-bar">
                        {/* <li onClick={e => changePage("friends")} className={classFriends}>
                            <i className="fas fa-users"></i>
                            <p>Friends</p>
                            <div className="friends-list">
                            </div>
                            <div className="friend-requests">
                            </div>
                            <div className="add-friend">
                            </div>
                        </li> */}
                        <li onClick={e => changePage("passwords")} className={classPassword}>
                            <i className="fas fa-key"></i>
                            <p>Password Reset</p>
                        </li>
                        <li onClick={e => changePage("account")} className={classAccounts}>
                            <i className="far fa-envelope"></i>
                            <p>Account Details</p>
                        </li>
                        </ul>
                    <div className="actual-account-settings">
                        {currentPage}
                    </div>
                </>
            )}
        </div>
    );
};

export default AccountSettings;