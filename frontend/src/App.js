import {useState, useEffect} from 'react';

// Routing
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// Local components
import Navbar from './ui/Navbar';

import Login from './users/authentication/Login';
import Register from './users/authentication/Register';

import EmpiricalDataDashboard from './dashboard/EmpiricalDataDashboard';
import PredictionsDashboard from './predictions/PredictionsDashboard';
import RunningHistory from './run_submission/RunningHistory';

import AccountSettings from './users/settings/AccountSettings';
import ForgotPassword from './users/authentication/ForgotPassword';
import VerifyEmail from "./users/authentication/VerifyEmail";

// Color Theme
import {createTheme} from "@material-ui/core";
import {lightModeGraph, darkModeGraph} from './dashboard/ColorPalette';

// Third-Party libraries
import ReactNotifications from 'react-notifications-component';
import {ThemeProvider} from '@material-ui/styles';
import 'react-notifications-component/dist/theme.css'
import 'animate.css';

// Context
import AuthenticationState from './context/AuthenticationContext';
import NotificationState from './context/NotificationContext';
import RunState from "./context/RunsContext";
import SocialState from './context/SocialContext';

// Custom Styling
import './styling/compiled_css/main.css';

const App = () => {

  const [darkmode, setDarkmode] = useState(false);
  const [darkmodeClass, setDarkmodeClass] = useState("light");

  useEffect(() => {
    if (localStorage.getItem("DM") === "y") {
      setDarkmode(true);
      window.Apex = darkModeGraph;
    } else {
      setDarkmode(false);
      window.Apex = lightModeGraph;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (darkmode) {
      setDarkmodeClass("dark");
      window.Apex = darkModeGraph;
    } else {
      setDarkmodeClass("light");
      window.Apex = lightModeGraph;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkmode]);

  const theme = createTheme({
    typography: {
      fontSize: 16,
    },
    palette: {
      type: darkmode ? "dark" : "light",
      primary: {
        main: "#3069c0",
      },
      secondary: {
        main: "#FFB84B",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <NotificationState>
        <AuthenticationState>
          <SocialState>
            <RunState>
              <Router>
                <div className={`App ${darkmodeClass}`}>
                  <ReactNotifications />
                  <Navbar darkmode={darkmode} setDarkmode={setDarkmode} />
                  <Switch>
                    <Route component={Login} exact path='/login' />
                    <Route component={Register} exact path='/register' />
                    <Route component={ForgotPassword} exact path='/forgotpassword' />
                    <Route component={VerifyEmail} exact path='/verify-email' />

                    <Route component={EmpiricalDataDashboard} exact path='/' />
                    <Route component={PredictionsDashboard} exact path='/predictions' />
                    <Route component={RunningHistory} exact path='/add' />

                    <Route component={AccountSettings} exact path='/account' />
                  </Switch>
                </div>
              </Router>
            </RunState>
          </SocialState>
      </AuthenticationState>
    </NotificationState>
  </ThemeProvider>
  );
}

export default App;
