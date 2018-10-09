import React, { Component } from 'react';
import '../App.css';


export default class MessageCreator extends Component {
    constructor(props) {
        super(props);
        this.msgInputRef = React.createRef();
        this.state = {
            username: '',
            msg: '',
            usernameWarning: '',
            msgWarning: ''
            }
        }

componentDidMount() {
    
}

checkUsernameAndMsg () {
    // Quick check that the username is an email address and the message isnt empty. 
    if (this.state.username.indexOf("@") > 0) {
        if (this.state.msg.length > 0) { 
            this.sendMsg()
            this.setState({msg: ''})
            this.msgInputRef.current.value = ''  
        } else {
            this.setState({msgWarning: 'Please enter a msg'})
        }
    } else {
        if (this.state.msg.length > 0) { 
            this.setState({usernameWarning: 'Please enter a valid email address'}) 
        } else {
            this.setState({usernameWarning: 'Please enter a valid email address', msgWarning: 'Please enter a msg'})
        }
    }
  }

sendMsg () {
    console.log(this.state.username,this.state.msg)
    this.props.sendMsg(this.state.username,this.state.msg)
}


keyPress(e){
    if(e.keyCode === 13){
        this.checkUsernameAndMsg()
    }
 }



render() {

    return (

            <div className="msgContainer">
                <div className="msgForm">

                    <h2 className={"inputHeader"}>
                        Username (email)
                    </h2> 
                    <input 
                        placeholder={"e.g. name@example.com"}
                        className={"inputFields"} 
                        onInput={(event)=> this.setState({username: event.target.value, usernameWarning: ''})}
                    />
                    {this.props.usernameWarning}

                    <br/>

                    <h2 className="inputHeader">
                        Msg
                    </h2>
                    <input 
                        ref={this.msgInputRef}
                        className={"inputFields"}
                        onInput={(event)=> this.setState({msg: event.target.value, msgWarning: ''})}
                    />
                    {this.props.msgWarning}

                    <button 
                        className="usernameButton" 
                        onClick={() => this.checkUsernameAndMsg()}
                    >
                        Submit
                    </button>

                </div>
            </div>
        
    )
}

}