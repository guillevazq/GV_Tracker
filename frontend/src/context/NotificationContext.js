import React, {createContext} from 'react';
import {store} from 'react-notifications-component';

export const NotificationContext = createContext();

const NotificationState = props => {

    const addAlert = (title, message, type, position) => {
        store.addNotification({
            title,
            message,
            type,
            container: position,
            dismiss: {
                duration: 3000,
                onScreen: true,
                pauseOnHover: true
            },
            slidingEnter: {
                duration: 300,
                timingFunction: 'ease-out',
                delay: 0
            },
            slidingExit: {
                duration: 100,
                timingFunction: 'ease-out',
                delay: 800
            },
            animationIn: ["animate__animated animate__bounceInDown"],
            animationOut: ["animate__animated animate__fadeOut"],
          });
    };

    return (
        <NotificationContext.Provider value={{
            addAlert,
        }}>
            {props.children}
        </NotificationContext.Provider>
    );
};

export default NotificationState;