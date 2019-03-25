import React, { Component } from "react";
import * as ReactDOM from 'react-dom';
import { connect } from "react-redux";
import InputForm from "./inputform";
import MessageList from "./MessageList";
import RoomListContainer from "./RoomListContainer";
import * as strings from "../strings";

class MessageListContainer extends Component {
    scrollToBottom = () => {
        //seems it is not solved yet .
        let scrollElement = this.refs.element;
        while(scrollElement.parentElement) {
            scrollElement = scrollElement.parentElement;
        }
        const maxScrollTop = scrollElement.scrollHeight - scrollElement.clientHeight;
        ReactDOM.findDOMNode(scrollElement).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        return (
            <div ref="element" className={ this.props.className }>
                <div className="flex"/>
                <MessageList data={ this.props.messages } username={ this.props.username } />
                <div className="flex-row" style={{ boxSizing:"content-box" }}>
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
