// This component contains the form for the inputs to the message to be sent

import React, { Component } from 'react';
import '../App.css';


export default class MessageForm extends Component {
    
    constructor(props) {
        super(props);
        this.msgInputRef = React.createRef();
        this.checkUsernameAndMsg = this.checkUsernameAndMsg.bind(this);
        this.state = {
            username: '',
            msg: '',
            usernameWarning: '',
            msgWarning: ''
            }
    }

handleUsernameInput (event) {
    this.setState({username: event.target.value, usernameWarning: ''})
}
handleMsgInput (event) {
    this.setState({msg: event.target.value, msgWarning: ''})
}

checkUsernameAndMsg () {
    // Quick check that the username is an email address and the message isnt empty before sending.
    
    // If OK, call sendMsg() to send the message to the server and then clear msg from state. 
    // Otherwise set the correct warning text
    let username = this.state.username
    let msg = this.state.msg

    // Note: not a great email validator but that should be done by sending a confirmation email anyway.
    if (username.indexOf("@") > 0) {
        if (msg.length > 0) { 
            this.sendMsg()
            this.setState({msg: ''})
            this.msgInputRef.current.value = '' 
        } else {
            this.setState({msgWarning: 'Please enter a msg'})
        }
    } else {
        if (msg.length > 0) { 
            this.setState({usernameWarning: 'Please enter a valid email address'}) 
        } else {
            this.setState({usernameWarning: 'Please enter a valid email address', msgWarning: 'Please enter a msg'})
        }
    }
  }

sendMsg () {
    // Sends the current inputs to the server as a new message
    let msgToSend = { username: this.state.username, msg: this.state.msg}
    this.props.socket.emit('send_message', msgToSend)
}

clearAllMessagesFromServer () {
    // This sends a message to the server to remove all the stored messages 
    // and let parent component know that they have been removed.
    // Just for testing purposes...
    this.props.socket.emit('clear')
    this.props.clearMessages()
}


// Function to send message on ENTER keypress - NOT used as using textArea
// keyPress(e){
//     if(e.keyCode === 13){
//         this.checkUsernameAndMsg()
//     }
//  }



render() {
    const { usernameWarning, msgWarning} = this.state;
    return (
            
            <div className="msgContainer">

            {/* 
            
                        FORM CONTAINER
            
                                                    */}
                <div className="msgForm">

                    <h2 className={"inputHeader"}>
                        Username (email)
                    </h2> 
                    <input 
                        placeholder={"e.g. name@example.com"}
                        className={"inputFields"} 
                        onInput={(event)=> this.handleUsernameInput(event)}
                    />
                    <p className={"warning"}>{usernameWarning}</p>

                    <br/>

                    <h2 className="inputHeader">
                        Msg
                    </h2>
                    <textarea 
                        ref={this.msgInputRef}
                        className={"inputFields"}
                        onInput={(event)=> this.handleMsgInput(event)}
                    />
                    <p className={"warning"}>{msgWarning}</p>

                    <button className="submitButton" onClick={() => this.checkUsernameAndMsg()}>
                        Submit
                    </button>

                </div>

                
                {/* 
            
                        CLEAR BUTTON FOR TESTING PURPOSES
            
                                                        */}
                <div className="clearBtnDiv">
                    <button className={"clearBtn"}onClick={() => this.clearAllMessagesFromServer()}>
                        Clear
                    </button>
                </div>
                

            </div>
        
    )
}

}