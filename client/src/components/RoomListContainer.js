import React, { Component } from "react";
import { connect } from "react-redux";
import RoomList from "./RoomList";
import * as actions from "../actions";
import * as history from "../history";

class RoomListContainer extends Component {
    componentDidMount() {
        // Navigate to current path and listen to changes
        this.navigate(history.getPath());
        history.listen(path => this.navigate(path));
    }

    navigate = path => {
        // Set new room only if path is valid
        let pathIndex = this.props.rooms ? this.props.rooms.map(room => room.id).indexOf(path) : -1;
        if(pathIndex > -1 && path !== this.props.roomId) {
            this.props.onRoomSet(path);
        }
    }

    render() {
        // Set browser path at render stage to ensure the roomId state has been validated
        if(this.props.roomId !== history.getPath()) {
            history.push(this.props.roomId);
        }
        return (
            <RoomList data={ this.props.rooms } selectedId={ this.props.roomId } onItemClick={ roomId => this.props.onRoomSet(roomId) }/>
        );
    }
}

const mapStateToProps = state => {
    return {
        rooms: state.rooms,
        roomId: state.roomId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRoomSet: roomId => {
            dispatch(actions.setRoom(roomId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomListContainer)