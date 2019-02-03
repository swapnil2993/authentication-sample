import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { notify } from 'react-notify-toast';
import BarLoader from 'react-bar-loader'
import validate, { clearErrorsForField } from '../../services/validator';
import { postSignin } from '../../services/user';
import { setItemToStorage, getItemFromStorage } from '../../services/storage';
import config from './validationConfig';
import './style.css';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      errors: {}
    }
  }

  componentDidMount() {
    if (getItemFromStorage('access-token')) {
      this.props.history.replace('/');
    }
  }

  onFormValidationSuccess = () => {
    let { email, password } = this.state;

    const user = { email, password };
    this.setState({ isLoading: true });
    postSignin(user).then((response) => {
      const { status } = response;
      if (status === 200) {
        notify.show(response.data.message, 'success');
        this.setState({ isLoading: false }, () => {
          setItemToStorage('access-token', response.data.data.token)
          this.props.history.replace('/');
        })
      }
    }).catch((errors) => {
      const { response } = errors;
      if (response && response.data) {
        this.setState({ isLoading: false }, () => {
          notify.show(response.data.message, 'error');
          if (!response.data.isVerified) {
            this.props.history.push(`/resend-verification-link?email=${response.data.data.email}`)
          }
        })
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

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value.trim(),
      errors: clearErrorsForField(this.state.errors, e.target.name)
    });
  }

  render() {
    return (
      <div className="container signin">
        <div className="row">
          <div className="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-5 col-md-offset-4 col-lg-4 col-lg-offset-4">

            <div className="panel panel-default box-signin-shadow">
              {
                this.state.isLoading ? (<BarLoader color="#1D8BF1" height="4" />) : null
              }
              <div className="padding-15">
                <div className="panel-heading">
                  <span className="text-primary">Sign In</span>
                  <span className="text-muted pull-right today" title="Today"></span>
                </div>
                <div className="panel-body">
                  <form>
                    <div className="form-group">
                      <label className="form-group-label">Email</label>
                      <input type="email" className="form-control" id="email" name="email" onChange={this.handleChange} />
                      <span className="validn " style={{ color: "red" }}>{this.state.errors["email"]}</span>
                    </div>
                    <div className="clearfix"></div>

                    <div className="form-group">
                      <label className="form-group-label">Password</label>
                      <input type="password" className="form-control" id="password" name="password" onChange={this.handleChange} />
                      <span className="validn " style={{ color: "red" }}>{this.state.errors["password"]}</span>
                    </div>

                    <button className="btn btn-block btn-primary" onClick={this.handleSubmit} tabIndex="3">Sign In</button>
                    <p className="text-center text-muted h4">or</p>
                    <Link to="/registration" className="btn btn-block btn-success" tabIndex="5">Create account</Link>
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

export default SignIn;