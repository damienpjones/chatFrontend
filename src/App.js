import React, { Component } from 'react';
import './App.css';
import MessageForm from './components/messageForm'
import AllMessages from './components/allMessages'
import io from 'socket.io-client';
const socket = io('http://localhost:3001');

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
      username: '',
      messages: []
      }
  }

  componentDidMount() {

    // Connect to socket and check connection
    socket.connect()
    if (socket !== undefined) {
      console.log('Connected to socket...')
    }

    // On iniitial connection get all messages
    socket.on('getAllMessages', (msgs) => {
      this.setState({messages: msgs})
    })

    // When a new message has been sent get that new msg and add to messages list
    socket.on('output', (message) => {
      this.addNewMessageToList(message)
    })

    // If all messages have been cleared from database then
    // call clearMessages() to remove all messages from state.
    socket.on('cleared', () => {
      this.clearMessages()
    })

  }

  componentWillUnmount () {
    socket.disconnect()
  }

  addNewMessageToList = (message) => {
    // Add newly arrived message to list of messages.
    let messages = this.state.messages.concat({username: message.username, msg: message.msg})
    this.setState({messages: messages})
  }

  clearMessages = () => {
    // When all messages have been cleared from the database, 
    this.setState({messages: []})
  }

  render() {
    const { messages } = this.state
    return (
      <div className="App">
        <MessageForm socket={socket} clearMessages={this.clearMessages}></MessageForm>
        <AllMessages socket={socket} messages={messages}></AllMessages>      
      </div>
    );
  }
}

export default App;
