import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Notifications from 'react-notify-toast';
import Registration from '../Registration';
import AuthenticatedRoute from './AuthenticatedRoute';
import NotFound from '../NotFound';
import Home from '../Home';
import SignIn from '../SignIn';
import ResendVerificationLink from '../ResendVerificationLink'
import VerifyLink from '../VerifyLink'

import './style.css';

class AppLayout extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Notifications />
          <Switch>
            <Route path="/signin" component={SignIn} exact={true} />
            <AuthenticatedRoute path="/" component={Home} exact />
            <Route path="/registration" component={Registration} exact />
            <Route path="/resend-verification-link" component={ResendVerificationLink} exact />
            <Route path="/verify/:token?" component={VerifyLink} exact />
            <Redirect to="/signin" from="/" exact={true} />
            <Route path="*" component={NotFound} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default AppLayout;