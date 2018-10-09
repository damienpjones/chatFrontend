// This component simply lists all the messages from the server
// Could be set up as a function component but having state might be necessary
// for some later uses

import React, { Component } from 'react';
import '../App.css';
import UserImage from '../images/userImage.svg';
import PropTypes from 'prop-types';


export default class AllMessages extends Component {


renderMessages () {
    // List all the messages returned from the server
    return this.props.messages.map((item, index) => {
        return <tr key={item.username + item.msg + index}>
                    <td>
                        <img src={UserImage} alt={'user'}/> {item.username}
                    </td> 
                    <td>{item.msg}</td>
                </tr>
    }
    )
}


render() {

    return (
            <div className="messagesContainer">
                <table>
                    <tbody>
                        {this.renderMessages()}
                    </tbody>
                </table>
                    
            </div>
        
    )
}

}
// Check propTypes
AllMessages.propTypes = {
    messages: PropTypes.array
  };