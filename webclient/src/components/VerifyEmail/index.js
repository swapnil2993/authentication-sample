import React, { Component } from 'react';

class VerifyEmail extends Component {
  constructor(props) {
    super(props);

  }



  render() {
    return (
      <div>
        <p>It seems you have not verified your email</p>
        <div className="form-group">
          <button className="btn btn-primary" onClick={this.handleSubmit}>Verify Email</button>
        </div>
      </div>
    );
  }
}

export default VerifyEmail;