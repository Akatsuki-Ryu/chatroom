import React, { Component } from "react";
import { connect } from "react-redux";
import { Header } from "semantic-ui-react";
import InputForm from "./InputForm";
import MessageList from "./MessageList";
import * as strings from "../strings";

class MessageListContainer extends Component {
    render() {
        return (
            <div className="flex-one flex-column">
                <Header as="h2">{ strings.HEADER + " - " + this.props.roomName }</Header>
                <div className="flex-one" />
                <MessageList data={ this.props.messages } username={ this.props.username } />
                <InputForm submitLabel={ strings.SEND } onSubmit={ this.props.onMessageSend } />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        messages: state.messages ? state.messages.filter(message => message.roomId === state.roomId) : [],
        roomName: state.rooms ? state.rooms.filter(room => room.id === state.roomId)[0].name : "",
        username: state.username
    }
}

export default connect(mapStateToProps)(MessageListContainer);
