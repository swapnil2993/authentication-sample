import React, { Component } from 'react';
import Redirect from 'react-router-dom/Redirect';
import Route from 'react-router-dom/Route';
import isEmpty from 'lodash/isEmpty';
import { getItemFromStorage } from '../../services/storage';

export default class AuthenticatedRoute extends Component {
  render() {
    const { component, ...rest } = this.props;
    const Container = component;
    if (isEmpty(getItemFromStorage('access-token'))) {
      return (
        <Redirect to={{ pathname: '/signin' }} />
      );
    }
    return (
      <Route
        {...rest}
        render={
          (props) => {
            return <Container {...props} />;
          }
        }
      />
    )
  }
}
