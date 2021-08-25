import React, {useContext, useEffect} from "react";
import {AuthenticationContext} from "../context/AuthenticationContext";

const Navbar = () => {
  const authenticationContext = useContext(AuthenticationContext);
  const {isLogged, setTokenFromLS, logout, username} = authenticationContext;

  useEffect(() => {
    setTokenFromLS();
  }, [isLogged, username]);

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
              <a href="/predictions">PREDICTIONS</a>
              <a href="/add">ADD RUN</a>
            </>
          )}
        </div>
      </div>
      <div className="user-flag">
        {isLogged ? (
            <>
                {/* <a href="/account">{username}</a> */}
                <a href="/account">Account</a>
                <a onClick={logOutUser} href="#">Logout</a>
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
