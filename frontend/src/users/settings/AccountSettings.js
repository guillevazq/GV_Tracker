import React, {useState, useContext, useEffect} from 'react';

// Context
import {AuthenticationContext} from '../../context/AuthenticationContext';
import {SocialContext} from '../../context/SocialContext';

// Pages
import Details from './Details';
import ChangePassword from "./ChangePassword";
import Social from "./Social";

// UI
import Loader from '../../ui/Loader';

const AccountSettings = props => {
    const {setTokenFromLS, email, isLogged} = useContext(AuthenticationContext);
    const {language, unit, weekly_goal} = useContext(SocialContext);
    const [currentPage, setCurrentPage] = useState(<Details />);

    const setPage = (e, component) => {
        let clickedLi = e.target;
        if (clickedLi.tagName !== "LI") {
            clickedLi = clickedLi.parentElement;
        };
        let lis = clickedLi.parentElement.childNodes;
        lis.forEach(li => {
            if (li === clickedLi) {
                li.className = " selected";
            } else {
                li.className = "";
            }
        });
        setCurrentPage(component);
    };

    useEffect(() => {
        // Get user info and set in state
        setTokenFromLS();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Make route protected
    useEffect(() => {
        if (isLogged === false) {
            props.history.push("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogged, props.history]);

    const menus = [
        {title: "Account Details", icon: "envelope", component: <Details />, initialClassName: "selected"},
        {title: "Social", icon: "users", component: <Social />},
        {title: "Password Reset", icon: "key", component: <ChangePassword />},
    ];

    return (
        <div className="account-settings">
            {(email && language && weekly_goal && unit) ? (
                <>
                    <ul className="side-menu-bar">
                        {menus.map((menu, index) => (
                            <li className={menu.initialClassName} key={index} onClick={e => setPage(e, menu.component)}>
                                <i className={`fas fa-${menu.icon}`}></i>
                                <p>{menu.title}</p>
                            </li>
                        ))}
                    </ul>
                    <div className="actual-account-settings">
                        {currentPage}
                    </div>
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default AccountSettings;