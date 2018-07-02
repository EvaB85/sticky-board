import React, { Component } from 'react';
import axios from 'axios';
import Sticky from './Sticky';
import './style.css';

class StickyBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stickies: null
    }
  }

  componentDidUpdate() {
    axios.get(`/profile/${this.props.user._id}/sticky`)
      .then( result => {
        if (this.props.updateBoard) {
          this.setState({ stickies: result.data.stickies });
          this.props.boardUpdated();
        }
    })
  }

  componentDidMount() {
    axios.get(`/profile/${this.props.user._id}/sticky`)
      .then( result => {
        let stickies = result.data.stickies;
        this.setState({ stickies });
    })
  }

  render() {
    let stickies = null;
    if (this.props.user) {
      if (this.state.stickies) {
        stickies = this.state.stickies.map( sticky => {
          return <Sticky key={sticky._id} sticky={sticky} liftUpdateBoard={this.props.liftUpdateBoard} />
        });
      }
    }
    return (
      <div className='board-wrapper'>
        <div className='board'>
          {stickies}
        </div>
      </div>
    );
  }
}

export default StickyBoard;
