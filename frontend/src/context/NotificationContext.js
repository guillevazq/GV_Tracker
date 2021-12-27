import React, {createContext} from 'react';
import {store} from 'react-notifications-component';

// Notification context
export const NotificationContext = createContext();

const NotificationState = props => {

    const addAlert = (title, message, type, position) => {
        store.addNotification({
            title,
            message,
            type,
            container: "top-center",
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

    const handleError = (error, password=false) => {
        if (error.response.data.non_field_errors) {
            error.response.data.non_field_errors.forEach(current_err => {
                addAlert("Error", current_err + " (" + error.response.status + ")", "danger", "top-center")
            });
        } else if (error.response.data.detail) {
            addAlert("Error " + error.response.status, error.response.data.detail, "danger", "top-center");
        } else if (typeof(error.response.data) === "object") {
            let error_field = Object.keys(error.response.data)[0];
            let error_description = error.response.data[error_field][0]
            if (password) {
                addAlert("Error in password fields", error_description, "danger", "top-center");
            } else {
                addAlert("Error in " + error_field, error_description, "danger", "top-center");
            }
        } else {
            addAlert("Unknown Server Error", "An unexpected server error has ocurred", "danger", "top-center");
        }
    }

    return (
        <NotificationContext.Provider value={{
            addAlert,
            handleError,
        }}>
            {props.children}
        </NotificationContext.Provider>
    );
};

export default NotificationState;