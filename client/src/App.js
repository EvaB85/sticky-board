import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  // withRouter,
  Route
} from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import HomePage from './HomePage';
import Profile from './Profile';
import Signup from './Signup';
import Login from './Login';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      token: null
    }
    this.liftAuth = this.liftAuth.bind(this);
    this.logout = this.logout.bind(this);
  }

  liftAuth(userData) {
    this.setState({
      user: userData.user,
      token: userData.token
    })
  }

  logout() {
    localStorage.removeItem('f10Challenge');
    this.setState({
      user: null,
      token: null
    })
  }

  componentDidMount() {
    let token = localStorage.getItem('f10Challenge');
    if (!token) {
      localStorage.removeItem('f10Challenge');
      this.logout();
    } else {
      axios.post('/auth/validate', {
        token
      }).then(result => {
        localStorage.setItem('f10Challenge', result.data.token);
        this.setState({
          user: result.data.user,
          token: result.data.token
        })
      }).catch(err => console.log(err));
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar user={this.state.user} logout={this.logout} />
          <Route exact path="/" render={() =>
            <HomePage user={this.state.user} />
          } />
          <Route path='/profile/:id' render={() =>
            <Profile user={this.state.user} />
          } />
          <Route path='/signup' render={() =>
            <Signup liftAuth={this.liftAuth} />
          } />
          <Route path='/login' render={() =>
            <Login liftAuth={this.liftAuth} />
          } />
        </div>
      </Router>
    );
  }
}

export default App;
