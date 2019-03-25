import React, { Component } from "react";
import { connect } from "react-redux";
import { Header } from "semantic-ui-react";
import InputForm from "./InputForm";
import MessageList from "./MessageList";
import RoomListContainer from "./RoomListContainer";
import * as strings from "../strings";

class MessageListContainer extends Component {
    render() {
        return (
            <div className={ this.props.className } style={{ display:"grid", gridTemplateRows:"auto 1fr auto auto" }}>
                <div className="sticky">
                    <Header as="h2">{ this.props.roomName }</Header>
                </div>
                <div />
                <MessageList data={ this.props.messages } username={ this.props.username } />
                <div className="flex-row">
                    <RoomListContainer />
                    <InputForm className="flex" placeholder={ strings.TYPE_MESSAGE } submitLabel={ strings.SEND } onSubmit={ this.props.onMessageSend } />
                </div>
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