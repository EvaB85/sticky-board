import React, { Component } from 'react';
import Draggable from 'react-draggable';
import './style.css';

class Sticky extends Component {
  constructor(props) {
    super(props)
    this.state = {
      x: 0,
      y: 0
    }
  }

  render() {
    return (
      <Draggable bounds='parent' defaultPosition={{x:5, y:0}}>
        <div className='drag'>
          <div className='drag-inner'>
            <p>{this.props.sticky.note}</p>
            <p>{this.state.x}</p>
          </div>
        </div>
      </Draggable>
    );
  }
}

export default Sticky;
