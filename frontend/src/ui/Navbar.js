import React, {useContext, useEffect, useState} from "react";

import {AuthenticationContext} from "../context/AuthenticationContext";
import {SocialContext} from '../context/SocialContext';

const Navbar = ({darkmode, setDarkmode}) => {
  const {isLogged, setTokenFromLS, logout, username} = useContext(AuthenticationContext);
  const {getSettings} = useContext(SocialContext);
  const [classBurger, setClassBurger] = useState(false);

  useEffect(() => {
    setTokenFromLS();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged, username]);

  useEffect(() => {
    getSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDarkModeSwitcher = e => {
    if (e.target.checked) {
      localStorage.setItem("DM", "y");
      window.location.reload(false);
      setDarkmode(true);
    } else {
      localStorage.setItem("DM", "n");
      window.location.reload(false);
      setDarkmode(false);
    };
  };

  useEffect(() => {
    let currentPath = window.location.href;
    let anchorTags = document.getElementsByTagName("a");
    for (var i = 0; i < anchorTags.length; i++) {
      if (anchorTags[i].href === currentPath) {
        anchorTags[i].style.color = "black";    
      };
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location, isLogged]);

  const logOutUser = e => {
    e.preventDefault();
    logout();
  };

  return (
    <>
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
                  <input checked={darkmode} onChange={handleDarkModeSwitcher} type="checkbox" />
                  <span className="slider round"></span>
              </label>
          </div>
        </div>
      </div>
      <div id={!isLogged && "not-logged-links"} className={!classBurger ? "links-mobile" : "links-mobile links-active"}>
        {isLogged ? (
            <>
              <a href="/">Home</a>
              <a href="/predictions">Prevision</a>
              <a href="/add">Runs</a>
              <a href="/account">Account</a>
              <a onClick={logOutUser} href="/logout">Logout</a>
            </>
        ) : (
            <>
              <a href="/login">Login</a>
              <a href="/register">Register</a>
            </>
        )}
      </div>
      <div className="navbar-mobile">
        <div className="left-side">
          <div onClick={() => setClassBurger(currClass => !currClass)} className={!classBurger ? "burger" : "burger burger-close"}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
          <div className="title-site-mobile">
            <h1>GV Tracker</h1>
          </div>
        </div>
        <div className="darkmode-mobile">
            <div className="nightmode-switcher">
                <label className="switch">
                    <input checked={darkmode} onChange={handleDarkModeSwitcher} type="checkbox" />
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
