import React, { Component } from 'react';
import { notify } from 'react-notify-toast';
import { Link } from 'react-router-dom';
import BarLoader from 'react-bar-loader'
import './style.css';

import { getEmailVerified } from '../../services/user';

class VerifyLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      successfull: false
    }
  }

  componentDidMount() {
    const { params } = this.props.match;
    if (params && params.token) {
      getEmailVerified(params.token)
        .then((response) => {
          const { data } = response;
          this.setState({
            successfull: true, isLoading: false
          }, () => {
            notify.show(data.message, 'success');
          })
        }).catch((errors) => {
          const { response } = errors;
          notify.show(response.data.message, 'error');
          this.props.history.replace('/resend-verification-link')
        })
    } else {
      this.props.history.replace('/resend-verification-link')
    }
  }

  render() {
    return (
      <div className="container verify-link">
        <div className="row box-shadow">
          {
            this.state.isLoading ? (<BarLoader color="#1D8BF1" height="4" />) : null
          }
          <div className="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-5 col-md-offset-4 col-lg-4 col-lg-offset-4">

            <div className="padding-15">
              {
                this.state.successfull ? (
                  <React.Fragment>
                    <div className="text-center"><h5>Email verification successful. Please login for continuing with our services.</h5></div> <br></br>
                    <Link to="/signin" className="btn btn-block btn-primary">Sign in</Link>
                  </React.Fragment>
                ) :
                  (
                    <React.Fragment>
                      <div className="text-center"><h5>Verifying your email.</h5></div> <br></br>
                    </React.Fragment>
                  )
              }
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default VerifyLink;