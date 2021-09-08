import React, {useContext, useEffect} from "react";

import {AuthenticationContext} from "../context/AuthenticationContext";
import {SocialContext} from '../context/SocialContext';

const Navbar = () => {
  const authenticationContext = useContext(AuthenticationContext);
  const {isLogged, setTokenFromLS, logout, username} = authenticationContext;
  const {getSettings} = useContext(SocialContext);

  useEffect(() => {
    setTokenFromLS();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged, username]);

  useEffect(() => {
    getSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let currentPath = window.location.href;
  let anchorTags = document.getElementsByTagName("a");
  for (var i = 0; i < anchorTags.length; i++) {
    if (anchorTags[i].href === currentPath) {
      anchorTags[i].style.color = "black";    
    };
  };

  const logOutUser = e => {
    e.preventDefault();
    logout();
  };

  return (
    <div className="navbar-gv">
      <div className="important-pages">
        <h1>
          GV <span>Tracker</span>
        </h1>
        <div className="main-pages">
          {isLogged && (
            <>
              <a href="/">HOME</a>
              <a href="/predictions">PREVISION</a>
              <a href="/add">RUNS</a>
            </>
          )}
        </div>
      </div>
      <div className="user-flag">
        {isLogged ? (
            <>
                <a href="/account">Account</a>
                <a onClick={logOutUser} href="/logout">Logout</a>
            </>
        ) : (
            <>
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </>
        )}
        <div className="nightmode-switcher">
            <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
            </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
