import React from 'react';
import { Router as Router, Switch, Route } from 'react-router-dom';
import Amplify from 'aws-amplify';
import awsExports from './aws-exports';
import { createBrowserHistory } from 'history';

import AuthenticatedRoute from './components/AuthenticatedRoute';
import Login from './features/auth/login/Login';
import SignUp from './features/auth/signUp/SignUp';

import './App.css';

Amplify.configure(awsExports);

export const history = createBrowserHistory();

const App = () => {
  return (
     <Router>
       <Switch>
         <AuthenticatedRoute exact path="/" component={() => <div>Home</div>} />
         <Route exact path="/sign-up" component={SignUp} />
         <Route exact path="/login" component={Login} />
       </Switch>
     </Router>
  );
};

export default App;
