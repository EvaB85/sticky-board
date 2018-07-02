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
        <h1>This is your homepage.</h1>
        <p>bruuuuuuuuuh</p>
      </div>
    );
  }
}

export default HomePage;
