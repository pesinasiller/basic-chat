import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import Header from '../components/Header';

export default class ChatView extends Component {
    state = {
        message: "",
    }
    componentDidMount() {
        this.socket = socketIOClient("http://localhost:8000");
        this.scrollToBottom();
    }
    componentDidUpdate() {
        this.scrollToBottom(); 
    }
    scrollToBottom = () => {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
    handleChange = (e) => {
        this.setState({message: e.target.value});
    }
    
    sendMessage = () => {
        if(!this.state.message) return
        this.socket.emit('newMessage', { "user": this.props.username, "message": this.state.message });
        this.setState({message: ""});
    }
    
    render(){
        return (
            <div className="view">
                <Header title="Chat" />
                <div className="view-content">
                    {this.props.messages && this.props.messages.map((item, key) => 
                        <div key={key} 
                            className={`message ${item.user === this.props.username ? "message-mine" : "message-others" }`}>
                            <div>
                                <span className="message-name">{item.user}</span>
                            </div>
                            <div>
                                <span className="message-text">{item.message}</span>
                            </div>                           
                        </div>
                    )}
                      <div style={{ float:"left", clear: "both" }}
                         ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </div>
                <div className="view-chatInput">
                    <input value={this.state.message} onChange={this.handleChange} />
                    <button className="view-button" onClick={()=>this.sendMessage()}>Enviar</button>
                </div>
            </div>
        );
    } 
}