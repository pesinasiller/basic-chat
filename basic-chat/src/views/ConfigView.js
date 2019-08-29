import React, { Component } from 'react';
import Header from '../components/Header';

export default class ConfigView extends Component {
    state = {
        username: ""
    }
    handleChange = (e) => {
        this.setState({username: e.target.value});
    }
    render(){
        return (
            <div className="view">
                <Header title="Config." />
                <div className="view-content">
                    Nombre:
                    <br />
                    <input value={this.state.username} onChange={this.handleChange} />
                    <br />
                    <button className="view-button" onClick={()=>this.props.setUsername(this.state.username)}>
                        Guardar
                    </button>
                </div>
            </div>
        );
    } 
}