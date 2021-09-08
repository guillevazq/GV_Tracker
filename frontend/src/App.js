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

// Color Theme
import {theme} from './dashboard/ColorPalette';

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
  return (
    <ThemeProvider theme={theme}>
      <NotificationState>
        <AuthenticationState>
          <SocialState>
            <RunState>
              <Router>
                <div className="App">
                  <ReactNotifications />
                  <Navbar />
                  <Switch>
                    <Route component={Login} exact path='/login' />
                    <Route component={Register} exact path='/register' />
                    <Route component={ForgotPassword} exact path='/forgotpassword' />

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
