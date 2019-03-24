import React, { Component } from "react";
import { connect } from "react-redux";
import InputForm from "./InputForm";
// import MessageList from "./MessageList";

class MessageListContainer extends Component {
    render() {
        return (
            <div>
                {/*<MessageList header={ this.props.roomName } data={ this.props.messages } />*/}
                <InputForm onSubmit={ this.props.onMessageSend } />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        messages: state.messages ? state.messages.filter(message => message.roomId === state.roomId) : [],
        roomName: state.rooms ? state.rooms.filter(room => room.id === state.roomId)[0].name : ""
    }
}

export default connect(mapStateToProps)(MessageListContainer);
