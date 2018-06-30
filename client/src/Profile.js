import React, { Component } from 'react';
import './style.css';
import AddSticky from './AddSticky';
import StickyBoard from './StickyBoard';

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      updateBoard: false
    }
    this.liftUpdateBoard = this.liftUpdateBoard.bind(this);
    this.boardUpdated = this.boardUpdated.bind(this);
  }

  liftUpdateBoard() {
    this.setState({ updateBoard: true });
  }

  boardUpdated() {
    this.setState({ updateBoard: false });
  }

  render() {
    let board = null;
    if (this.props.user) {
      board = <StickyBoard
        user={this.props.user}
        boardUpdated={this.boardUpdated}
        updateBoard={this.state.updateBoard}
        liftUpdateBoard={this.liftUpdateBoard}
      />
    }
    let name = this.props.user ? this.props.user.name : null;
    return (
      <div className='profile'>
        <div className='profile-inner-wrapper'>
          <div>
            <h2>Hey <span>{name}</span>, </h2>
            <p> what's stickin'?</p>
          </div>
          <AddSticky user={this.props.user} liftUpdateBoard={this.liftUpdateBoard} />
        </div>
        {board}
      </div>
    );
  }
};

export default Profile;
