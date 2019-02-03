import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { notify } from 'react-notify-toast';
import validate, { clearErrorsForField } from '../../services/validator';
import { postSignin } from '../../services/user';
import config from './validationConfig';
import './style.css';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }
  onFormValidationSuccess = () => {
    let { email, password } = this.state;

    const user = { email, password };

    postSignin(user).then((response) => {
      if (response.status === 200) {
        notify.show(response.data.message, 'success');
      }
    })
  }

  onFormValidationFailure = (errors) => {
    this.setState({ errors });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    validate(config, this.state, this.onFormValidationFailure, this.onFormValidationSuccess);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value.trim(),
      errors: clearErrorsForField(this.state.errors, e.target.name)
    });
  }

  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-5 col-md-offset-4 col-lg-4 col-lg-offset-4">
            <div class="panel panel-default box-signin-shadow">
              <div class="panel-heading">
                <span class="text-primary">Sign In</span>
                <span class="text-muted pull-right today" title="Today"></span>
              </div>
              <div class="panel-body">
                <form>
                  <div className="form-group">
                    <label className="form-group-label">Email</label>
                    <input type="email" class="form-control" id="email" name="email" onChange={this.handleChange} />
                    <span className="validn " style={{ color: "red" }}>{this.state.errors["email"]}</span>
                  </div>
                  <div className="clearfix"></div>

                  <div className="form-group">
                    <label className="form-group-label">Password</label>
                    <input type="password" class="form-control" id="password" name="password" onChange={this.handleChange} />
                    <span className="validn " style={{ color: "red" }}>{this.state.errors["password"]}</span>
                  </div>

                  <button class="btn btn-block btn-primary" onClick={this.handleSubmit} tabindex="3">Sign In</button>
                  <p class="text-center text-muted h4">
                    or
            </p>
                  <Link to="/registration" class="btn btn-block btn-success" tabindex="5">Create account</Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;