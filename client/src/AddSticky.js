import React, { Component } from 'react';
import axios from 'axios';

class AddSticky extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let newSticky = this.newSticky.value;
    let userId = this.props.user._id
    axios.post(`/profile/${this.props.user._id}/sticky`, { newSticky, userId })
      .then(result => {
        console.log(result.data);
        this.newSticky.value = '';
      })
  }

  render() {
    return (
      <div>
        <form id='signup-form' onSubmit={this.handleSubmit}>
          <label htmlFor='new-sticky'>Add Note</label>
          <input id='new-sticky' type='text' ref={ input => {this.newSticky = input}} required />
          <button type='submit' style={styles.button}>Signup</button>
        </form>
      </div>
    );
  }

}

const styles = {
  button: {
    cursor: 'pointer'
  }
}

export default AddSticky;
