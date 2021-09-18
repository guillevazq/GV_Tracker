import React, {useState} from 'react';

// Menu components
// import MyProfile from "./submenus-social/MyProfile";
import Followers from "./submenus-social/Followers";
import Following from "./submenus-social/Following";
import RecievedRequests from "./submenus-social/RecievedRequests";
import SentRequests from "./submenus-social/SentRequests";

const Social = () => {
    const [currentComponent, setCurrentComponent] = useState(<SentRequests />);
    const changeMenu = (e, component) => {
        setCurrentComponent(component);
        let li = e.target;
        if (!li.className.includes("title-menu")) {
            li = li.parentElement;
        };
        li.parentElement.childNodes.forEach(currentLi => {
            if (li === currentLi) {
                currentLi.className = "title-menu selected";
            } else {
                currentLi.className = "title-menu";
            };
        });
    };

    const subMenus = [
        {title: "Sent Requests", component: <SentRequests />, initialClass:"title-menu selected"},
        {title: "See Followers", component: <Followers />, initialClass:"title-menu"},
        {title: "See Following", component: <Following />, initialClass:"title-menu"},
        {title: "Recieved Requests", component: <RecievedRequests />, initialClass:"title-menu"},
    ];

    return (
        <div className="follows">
            <>
                <h4 className="title-settings">Social</h4>
                <hr />
                <div className="menu-followers-following">
                    <div className="pages">
                        {subMenus.map((menu, index) => (
                            <div key={index} onClick={e => changeMenu(e, menu.component)} className={menu.initialClass}>
                                <p>{menu.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="actual-content-follows">
                    {currentComponent}
                </div>
            </>
        </div>
    );
};

export default Social;