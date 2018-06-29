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
          <li><Link to='/'>Home</Link></li>
          <li><Link to={`/profile/${this.props.user._id}`}>Profile</Link></li>
          <li><Link to='/' onClick={() => this.props.logout()}>Logout</Link></li>
        </div>
      );
    } else {
      return (
        <div className='flexbox-nav'>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/signup'>Signup</Link></li>
          <li><Link to='/login'>Login</Link></li>
        </div>
      );
    }
  }

}

export default Navbar;
