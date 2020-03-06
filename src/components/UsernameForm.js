import React, { Component } from 'react'
import Chatterbox from '../Chatterbox.png';

class UsernameForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state.username)
  }

  onChange(e) {
    this.setState({ username: e.target.value })
  }

  render() {
    return (
      <div>
        <img src={Chatterbox} alt="Chatterbox logo" className="logo" width="355px" height="100%" position="fixed" />
        <div className="login">
          <h2>Join the Chat!</h2>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              placeholder="Your username"
              onChange={this.onChange}
            />
            <br></br>
            <input type="submit" className="sub" />
          </form>
        </div>
      </div>
    );
  }
}

export default UsernameForm
