import React, {useContext, useEffect, useState} from "react";

import {AuthenticationContext} from "../context/AuthenticationContext";
import {SocialContext} from '../context/SocialContext';

const Navbar = props => {
  const {darkmode} = props;
  const {isLogged, setTokenFromLS, logout, username, currMenu} = useContext(AuthenticationContext);
  const {getSettings} = useContext(SocialContext);
  const [classBurger, setClassBurger] = useState(false);

  const setColorActiveNavigationMenu = () => {
    let anchorTags = document.getElementsByTagName("a");
    for (var i = 0; i < anchorTags.length; i++) {
      if (anchorTags[i].textContent.toLowerCase() === currMenu) {
        anchorTags[i].style.color = "black";
      } else {
        anchorTags[i].style.color = "white";
        anchorTags[i].onmouseenter = e => {
          e.target.style.color = "black";
        };
        anchorTags[i].onmouseleave = e => {
          if (currMenu !== e.target.textContent.toLowerCase()) {
            e.target.style.color = "white";
          };
        };
      };
    };
  };

  useEffect(() => {
    setTokenFromLS();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged, username]);

  useEffect(() => {
    setColorActiveNavigationMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currMenu, isLogged])

  useEffect(() => {
    getSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDarkModeSwitcher = e => {
    if (e.target.checked) {
      localStorage.setItem("DM", "y");
      window.location.reload(false);
    } else {
      localStorage.setItem("DM", "n");
      window.location.reload(false);
    };
  };

  const logOutUser = e => {
    e.preventDefault();
    logout();
  };

  return (
    <>
      <div className="navbar-gv">
        <div className="important-pages">
          <a href="/" className="title-gv">
            GV <span>Tracker</span>
          </a>
          <div className="main-pages">
            {isLogged === true && (
              <>
                <a href="/">HOME</a>
                <a href="/predictions">PREVISION</a>
                <a href="/add">RUNS</a>
              </>
            )}
          </div>
        </div>
        <div className="user-flag">
          {isLogged === true && (
              <>
                  <a href="/account">Account</a>
                  <a onClick={logOutUser} href="/logout">Logout</a>
              </>
          )}
          {isLogged === false && (
              <>
                  <a href="/login">Login</a>
                  <a href="/register">Register</a>
              </>
          )}
          {isLogged !== null && (
            <div className="nightmode-switcher">
                <label className="switch">
                    <input checked={darkmode} onChange={handleDarkModeSwitcher} type="checkbox" />
                    <span className="slider round"></span>
                </label>
            </div>
          )}
        </div>
      </div>
      <div id={!isLogged && "not-logged-links"} className={!classBurger ? "links-mobile" : "links-mobile links-active"}>
        {isLogged === true && (
            <>
              <a href="/">Home</a>
              <a href="/predictions">Prevision</a>
              <a href="/add">Runs</a>
              <a href="/account">Account</a>
              <a onClick={logOutUser} href="/logout">Logout</a>
            </>
        )}
        {isLogged === false && (
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