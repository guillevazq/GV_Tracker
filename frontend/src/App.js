// Routing
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// Custom components
import Login from './users/authentication/Login';
import Register from './users/authentication/Register';
import EmpiricalDataDashboard from './dashboard/EmpiricalDataDashboard';
import RunSubmission from './run_submission/RunSubmission';
import Navbar from './ui/Navbar';

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
                <Route component={RunSubmission} exact path='/add' />
              </Switch>
            </div>
          </Router>
        </RunState>
    </AuthenticationState>
  </NotificationState>
  );
}

export default App;
