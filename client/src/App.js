import React, {Component} from 'react';
import './App.css';
//redux
import {connect} from "react-redux";
//socketio
import io from "socket.io-client";
//inputform
import InputForm from "./components/inputform";
import MessageListContainer from "./components/MessageListContainer";
// import RoomListContainer from "./components/RoomListContainer";
//logic
import * as actions from "./actions";
import * as constants from "./constants";
import * as strings from "./strings";
//visual
import './semantic/dist/semantic.min.css';

class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // Connect socket
        // let socket = io('http://62.78.181.155:3111'); //change ip to the server backend
        let socket = io('http://localhost:3111'); //change ip to the localhost backend
        socket.on(constants.SOCKET_CONNECT, () => this.props.onSocketConnect(socket));
        //pull histroy message from the server
        //  socket.on(constants.MESSAGE_RECEIVE, this.props.onMessageReceive);
        console.log("this is the pullmessage history");

        let i;
        let onemessage = {};
        // fetch('http://62.78.181.155:3111/msgver2')
        fetch('http://localhost:3111/msgver2')
            .then(response => response.json())
            .then(data => {
                // this.setState({messages: data});
                for (i = 0; i < data.length; i++) {      //message formatting
                    onemessage = {
                        text: data[i].message,
                        username: data[i].username,
                        roomId: data[i].roomid,
                        id: data[i]._id,
                        timestamp: 1555506024699 //timestamp api is avaliable on the backend , i am hard codinghere anyway
                    };
                    this.props.onMessageReceive(onemessage);
                }
                this.scrollToBottom();
            });

        //
        socket.on(constants.ROOM_RECEIVE, this.props.onRoomReceive);
        socket.on(constants.MESSAGE_RECEIVE, this.props.onMessageReceive);

    }

    onMessageSend = messageText => {
        // Send new message to the server
        this.props.socket.emit(constants.MESSAGE_SEND, {
            text: messageText,
            username: this.props.username,
            roomId: this.props.roomId
        });
    };

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({behavior: "smooth"});
        console.log("scrooling to the buttom");
    };

    render() {
        // return (
        //
        //
        //     <div className="App">
        //         <header className="App-header">
        //             <img src={logo} className="App-logo" alt="logo"/>
        //             <form onSubmit={this.handleSubmit}>
        //                 <label htmlFor="name">Enter your name: </label>
        //                 <input
        //                     id="name"
        //                     type="text"
        //                     value={this.state.name}
        //                     onChange={this.handleChange}
        //                 />
        //                 <button type="submit">Submit</button>
        //             </form>
        //             <p>{this.state.greeting}</p>
        //
        //             <div>
        //                 {!this.props.username && <InputForm label={strings.USERNAME_LABEL} submitLabel={strings.SUBMIT}
        //                                                     onSubmit={this.props.onUsernameSubmit}/>}
        //                 {this.props.username && <RoomListContainer/>}
        //                 {this.props.username && <MessageListContainer onMessageSend={this.onMessageSend}/>}
        //             </div>
        //         </header>
        //     </div>
        // );


        if (this.props.username === null) {
            return (


                <div className="flex flex-col flex-center">
                    <InputForm className="login-form" label={strings.USERNAME_LABEL} submitLabel={strings.LOGIN}
                               onSubmit={this.props.onUsernameSubmit}/>
                    <div style={{ float:"left", clear: "both" }}
                         ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </div>
            )
        } else {
            return (


                <div className="flex flex-col flex-center">
                    <MessageListContainer className="flex flex-col chat-room" onMessageSend={this.onMessageSend}/>
                    <div style={{ float:"left", clear: "both" }}
                         ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </div>

            )
        }


    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(`/api/greeting?name=${encodeURIComponent(this.state.name)}`)
            .then(response => response.json())
            .then(state => this.setState(state));
    }

}

const mapStateToProps = state => {
    return {
        socket: state.socket,
        username: state.username,
        roomId: state.roomId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUsernameSubmit: username => {
            dispatch(actions.setUsername(username));
        },
        onSocketConnect: socket => {
            dispatch(actions.connectSocket(socket));
        },
        onRoomReceive: room => {
            dispatch(actions.receiveRoom(room));
        },
        onMessageReceive: message => {
            dispatch(actions.receiveMessage(message));
            console.log(message);
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
