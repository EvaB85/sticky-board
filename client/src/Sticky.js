import React, { Component } from 'react';
import Draggable from 'react-draggable';
import axios from 'axios';
import './style.css';

class Sticky extends Component {
  constructor(props) {
    super(props)
    this.deleteSticky = this.deleteSticky.bind(this);
  }

  handleStop = (e, el) => {
    let userId = this.props.sticky.userId;
    let stickyId = this.props.sticky._id
    let x = el.x;
    let y = el.y;
    axios.put(`/profile/${userId}/sticky/${stickyId}`, { x, y, stickyId })
      .then( result => {
        // console.log(result.data);
    });
  }

  deleteSticky() {
    let stickyId = this.props.sticky._id;
    axios({
      url: `/profile/${this.props.sticky.userId}/sticky/${stickyId}`,
      method: 'delete',
      data: {stickyId}
    }).then( result => {
      this.props.liftUpdateBoard();
    });
  }

  render() {
    return (
      <Draggable
        onStop={this.handleStop}
        bounds='parent'
        defaultPosition={
          {
            x: this.props.sticky.x,
            y: this.props.sticky.y
          }
        }
      >
        <div className='drag'>
          <div className='drag-inner'>
            <span className='text' style={styles.text}>{this.props.sticky.note}</span>
            <span className='sticky-x' style={styles.delete} onClick={this.deleteSticky}>&times;</span>
          </div>
        </div>
      </Draggable>
    );
  }
}

const styles = {
  delete: {
    display: 'inline-block',
    position: 'absolute',
    top: '-3px',
    right: 0,
    margin: '5px',
    cursor: 'pointer'
  },
  text: {
    display: 'inline-block',
    maxWidth: '95%'
  }
}

export default Sticky;
