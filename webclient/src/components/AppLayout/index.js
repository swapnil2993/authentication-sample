import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Notifications from 'react-notify-toast';
import Registration from '../Registration';
import NotFound from '../NotFound';
import Successfull from '../Successfull';
import SignIn from '../SignIn';
import VerifyEmail from '../VerifyEmail'
import './style.css';

class AppLayout extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Notifications />
          <Switch>
            <Route path="/signin" component={SignIn} exact={true} />
            <Route path="/registration" component={Registration} exact={true} />
            <Route path="/successfull" component={Successfull} exact={true} />
            <Route path="/verify-email" component={VerifyEmail} exact={true} />
            <Redirect to="/signin" from="/" exact={true} />
            <Route path="*" component={NotFound} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default AppLayout;