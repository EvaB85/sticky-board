import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    let email = this.email.value;
    let password = this.password.value;
    axios.post('/auth/login', { email, password })
      .then(result => {
        localStorage.setItem('f10Challenge', result.data.token);
        this.props.liftAuth(result.data);
        this.setState({ loggedIn: true });
      })
  }

  render() {
    if (this.state.loggedIn) return <Redirect to='/' />

    return (
      <div>
        <form id='login-form' onSubmit={this.handleSubmit}>
          <label htmlFor='email'>Email</label>
          <input id='email-signup' type='email' ref={ input => {this.email = input}} required />
          <label htmlFor='password'>Password</label>
          <input id='password-signup' type='password' ref={ input => {this.password = input}} required />
          <button type='submit'>Login</button>
        </form>
      </div>
    );
  }

}

export default Login;
