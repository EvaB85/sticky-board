import React, { Component } from 'react';
import AddSticky from './AddSticky';
import StickyBoard from './StickyBoard';

class Profile extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let board = this.props.user ? <StickyBoard user={this.props.user} /> : false;
    let name = this.props.user ? this.props.user.name : null;
    return (
      <div>
        <h1>Hi {name}</h1>
        <p>Here's your profile page</p>
        <AddSticky user={this.props.user} />
        {board}
      </div>

    );
  }
};

export default Profile;
