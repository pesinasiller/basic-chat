import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import ConfigView from "./views/ConfigView"; 
import ChatView from "./views/ChatView"; 
import "./styles.scss";

export default class App extends Component {
    state = {
        username: null,
        messages: null
    }

    componentDidMount() {
        const socket = socketIOClient("http://localhost:8000");

        socket.on("updateMessages", data => {
            this.setState({messages: data.messages})
        });
    }
    setUsername = (newUserName) => {
        this.setState({
            username: newUserName
        })
    }
    render(){
        return (
            <>
                {
                this.state.username ? 
                    <ChatView messages={this.state.messages} username={this.state.username} /> : 
                    <ConfigView setUsername={this.setUsername}/>
                }
            </>
        )
    }
}
