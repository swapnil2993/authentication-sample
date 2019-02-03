import React, { Component } from 'react';
import AppLayout from '../src/components/AppLayout';
import { setupInterceptor } from './services/base';

class App extends Component {
  componentDidMount() {
    setupInterceptor()
  }
  render() {
    return (
      <AppLayout />
    );
  }
}

export default App;
