import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
// COMPONENT NOT YET IN USE


class Login extends React.Component {
  render() {
    return (
      <div id="body-login" className="container">
        <div className="col-sm-6 col-sm-offset-3" id="login">
          <div className="signin-singup">
            <a id="signin" href="/login">SIGN IN</a>
            <a id="signup" href="/signup">SIGN UP</a>
          </div>
          <form className="signin-form" action="/login" method="post">
            <div className="form-group">
              <input type="text" className="form-control" name="email" placeholder="email"></input>
            </div>
            <div className="form-group" id="signin-input">
              <input type="password" className="form-control" name="password" placeholder="password"></input>
            </div>
            <button type="submit" className="form-control" id="login-button">GO!</button>
          </form>
          <hr></hr>
          <div className="signin-form">
            <a className="form-control external-sign-in" id="fbsign" href="/auth/facebook">
              <img className="signin-btn" src="./assets/facebook-logo.png"/>
              <label className='external-sign-in-text'>
                Sign in with Facebook
              </label>
            </a>
            <a className="form-control external-sign-in" id="googlesign" href="/auth/google">
              <img className="signin-btn" src="./assets/google-white.png"/>
              <label className='external-sign-in-text'>
                Sign in with Google
              </label>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
