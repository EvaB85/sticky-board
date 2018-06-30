import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Navbar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.user) {
      return (
        <div className='flexbox-nav'>
          <li data-text='Home'><Link to='/'>Home</Link></li>
          <li data-text='Profile'><Link to={`/profile/${this.props.user._id}`}>Profile</Link></li>
          <li data-text='Logout'><Link to='/' onClick={() => this.props.logout()}>Logout</Link></li>
        </div>
      );
    } else {
      return (
        <div className='flexbox-nav'>
          <li data-text='Home'><Link to='/'>Home</Link></li>
          <li data-text='Signup'><Link to='/signup'>Signup</Link></li>
          <li data-text='Login'><Link to='/login'>Login</Link></li>
        </div>
      );
    }
  };
};

export default Navbar;
