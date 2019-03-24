import * as constants from "./constants";

export function connectSocket(socket) {
    return { type: constants.SOCKET_CONNECT, socket }
}

export function receiveRoom(room) {
    return { type: constants.ROOM_RECEIVE, room }
}

export function receiveMessage(message) {
    return { type: constants.MESSAGE_RECEIVE, message }
}

export function setUsername(username) {
    return { type: constants.USERNAME_SET, username }
}

export function setRoom(roomId) {
    return { type: constants.ROOM_SET, roomId }
}

export function sendMessage(message) {
    return { type: constants.MESSAGE_SEND, message }
}
