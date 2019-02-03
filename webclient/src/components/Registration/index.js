import React, { Component } from 'react';
import { notify } from 'react-notify-toast';
import BarLoader from 'react-bar-loader';
import { postRegistration } from '../../services/user';
import validate, { clearErrorsForField } from '../../services/validator';
import config from './validationConfig';
import './style.css';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {}
    }
  }

  onFormValidationSuccess = () => {
    let { firstName, lastName, email, confirmPassword, password } = this.state;

    const user = {
      firstName,
      lastName,
      email,
      confirmPassword,
      password
    };
    this.setState({ isLoading: true });
    postRegistration(user).then((response) => {
      if (response.status === 200) {
        this.setState({ isLoading: false }, () => {
          notify.show(response.data.message, 'success');
          this.props.history.replace('/signin');
        })
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
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-8 col-sm-offset-2 col-md-5 col-md-offset-3 col-lg-5 col-lg-offset-3">
            <div className="panel panel-default box-registration-shadow">
              {
                this.state.isLoading ? (<BarLoader color="#1D8BF1" height="4" />) : null
              }
              <div className="padding-15">
                <div className="panel-heading">
                  <span className="text-primary">Create Account</span>
                  <span className="text-muted pull-right today" title="Today"></span>
                </div>

                <div className="panel-body">
                  <form>
                    <div className="form-group">
                      <label className="form-group-label">First Name</label>
                      <input type="text" className="form-control" id="firstName" name="firstName"
                        onChange={this.handleChange}
                      />
                      <span className="validn " style={{ color: "red" }}>{this.state.errors["firstName"]}</span>
                    </div>
                    <div className="clearfix"></div>

                    <div className="form-group">
                      <label for="age" className="form-group-label">Last Name</label>
                      <input type="text" className="form-control" id="lastName" name="lastName"
                        onChange={this.handleChange}
                      />
                      <span className="validn " style={{ color: "red" }}>{this.state.errors["lastName"]}</span>
                    </div>
                    <div className="clearfix"></div>

                    <div className="form-group">
                      <label className="form-group-label">Email</label>
                      <input type="email" className="form-control" id="email" name="email"
                        onChange={this.handleChange}
                      />
                      <span className="validn " style={{ color: "red" }}>{this.state.errors["email"]}</span>

                    </div>
                    <div className="clearfix"></div>

                    <div className="form-group">
                      <label className="form-group-label">Password</label>
                      <input type="password" className="form-control" id="password" name="password"
                        onChange={this.handleChange}
                      />
                      <span className="validn " style={{ color: "red" }}>{this.state.errors["password"]}</span>
                    </div>
                    <div className="clearfix"></div>

                    <div className="form-group">
                      <label className="form-group-label">Confirm Password</label>
                      <input type="password" className="form-control" id="confirmPassword" name="confirmPassword"
                        onChange={this.handleChange}
                      />
                      <span className="validn " style={{ color: "red" }}>{this.state.errors["confirmPassword"]}</span>
                    </div>
                    <div className="clearfix"></div>
                    <div className="form-group">
                      <button
                        className="btn btn-block btn-success"
                        onClick={this.handleSubmit}>
                        Create
                    </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Registration;