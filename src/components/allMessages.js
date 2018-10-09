import React, { Component } from 'react';
import '../App.css';
import UserImage from '../userImage.svg'


export default class AllMessages extends Component {

renderMessages () {
    return this.props.messages.map((item, index) => {
        return <tr key={item.username + item.msg + index}>
                    <td><img src={UserImage}/> {item.username}</td> 
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