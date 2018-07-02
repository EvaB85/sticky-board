import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './App.css';

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      state: null
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className='App'>
        <h1>Sample homepage</h1>
        <p>Go to profile in top right to use</p>
      </div>
    );
  }
}

export default HomePage;
