// Routing
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// Custom components
import Login from './users/authentication/Login';
import Register from './users/authentication/Register';
import EmpiricalDataDashboard from './dashboard/EmpiricalDataDashboard';
import RunningHistory from './run_submission/RunningHistory';
import Navbar from './ui/Navbar';
import AccountSettings from './users/settings/AccountSettings';
import ForgotPassword from './users/authentication/ForgotPassword';
import PredictionsDashboard from './predictions/PredictionsDashboard';

// Third-Party libraries
import ReactNotifications from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import 'animate.css';

// Context
import AuthenticationState from './context/AuthenticationContext';
import NotificationState from './context/NotificationContext';
import RunState from "./context/RunsContext";

// Styling
import './styling/compiled_css/main.css';

const App = () => {
  return (
    <NotificationState>
      <AuthenticationState>
        <RunState>
          <Router>
            <div className="App">
              <ReactNotifications />
              <Navbar />
              <Switch>
                <Route component={Login} exact path='/login' />
                <Route component={Register} exact path='/register' />
                <Route component={EmpiricalDataDashboard} exact path='/' />
                <Route component={RunningHistory} exact path='/add' />
                <Route component={AccountSettings} exact path='/account' />
                <Route component={ForgotPassword} exact path='/forgotpassword' />
                <Route component={PredictionsDashboard} exact path='/predictions' />
              </Switch>
            </div>
          </Router>
        </RunState>
    </AuthenticationState>
  </NotificationState>
  );
}

export default App;
