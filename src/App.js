import React, { Component } from 'react';
import './App.css';
import MessageCreator from './components/messageCreator'
import AllMessages from './components/allMessages'


class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
      username: '',
      usernameWarning: '',
      messages: [        
        { username: 'a@b.se', msg: 'hello world'},
        { username: 'c@d.se', msg: 'hi there'},
        { username: 'a@b.se', msg: 'hello world'},
        { username: 'c@d.se', msg: 'hi there'},
        { username: 'a@b.se', msg: 'hello world'},
        { username: 'c@d.se', msg: 'hi there'}
      ]
      }
  }

  sendMsg = (username, msg) => {
    // add msg from input to list of msgs
    let messages = this.state.messages.concat({username: username, msg: msg})
    this.setState({messages: messages})
  }

  render() {
    return (
      <div className="App">
        <MessageCreator sendMsg={this.sendMsg}></MessageCreator>
        <AllMessages messages={this.state.messages}></AllMessages>      
      </div>
    );
  }
}

export default App;
