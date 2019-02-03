import React, { Component } from 'react';
import { notify } from 'react-notify-toast';
import BarLoader from 'react-bar-loader';
import { postResendVerifyEmail } from '../../services/user';
import validate, { clearErrorsForField } from '../../services/validator';

const config = {
  fields: ['email'],
  rules: {
    email: [
      { rule: 'isRequired', message: 'Email is required' },
      { rule: 'isEmail', message: 'Email format is invalid' },
    ],
  },
};
class ResendVerificationLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.location.search.split('=')[1],
      errors: {},
      isLoading: false,
    }
  }

  onFormValidationSuccess = () => {

    const obj = { email: this.state.email };
    this.setState({ isLoading: true });
    postResendVerifyEmail(obj).then((response) => {
      const { status } = response;
      this.setState({ isLoading: false });
      if (status === 200) {
        notify.show(response.data.message, 'success');
        this.props.history.replace('/signin');
      }
    })
  }

  onFormValidationFailure = (errors) => {
    this.setState({ errors });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value.trim(),
      errors: clearErrorsForField(this.state.errors, e.target.name)
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    validate(config, this.state, this.onFormValidationFailure, this.onFormValidationSuccess);
  }

  render() {
    return (
      <div className="container resend-verification-link">
        <div className="row">
          <div className="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-5 col-md-offset-4 col-lg-4 col-lg-offset-4">
            <form>
              <div className="panel panel-default box-signin-shadow">
                {
                  this.state.isLoading ? (<BarLoader color="#1D8BF1" height="4" />) : null
                }
                <div className="padding-15">
                  <div className="text-center">Enter correct email address for us to send you a verification link.</div>
                  <input type="email" value={this.state.email} className="form-control" id="email" name="email" onChange={this.handleChange} />
                  <span className="validn" style={{ color: "red" }}>{this.state.errors["email"]}</span>
                  <div className="clearfix"></div>
                  <button className="btn btn-block btn-primary" onClick={this.handleSubmit} tabIndex="1">Verify</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    );
  }
}

export default ResendVerificationLink;