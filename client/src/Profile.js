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
        <h2>Hey {name}, </h2>
        <p> what's stickin'?</p>
        <AddSticky user={this.props.user} liftUpdateBoard={this.liftUpdateBoard} />
        {board}
      </div>
    );
  }
};

export default Profile;
