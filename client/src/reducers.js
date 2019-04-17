import * as constants from "./constants";

const initialState = {
    socket: null,
    username: null,
    messages: [],
    rooms: [],
    roomId: null
}

export function rootReducer(state = initialState, action) {
    // console.log('Reducer called with state ', state, ' and action ', action);
    switch (action.type) {
        case constants.SOCKET_CONNECT:
            return {
                ...state,
                socket: action.socket
            }
        case constants.USERNAME_SET:
            return {
                ...state,
                username: action.username
            }
        case constants.ROOM_SET:
            return {
                ...state,
                roomId: action.roomId
            }
        case constants.ROOM_RECEIVE:
            // Do not add same room another time
            // If this is the first room received, also set the room id
            if (state.rooms.map(room => room.id).indexOf(action.room.id) > -1) return state;
            return {
                ...state,
                rooms: [...state.rooms, action.room],
                roomId: state.rooms.length === 0 ? action.room.id : state.roomId
            }
        case constants.MESSAGE_RECEIVE:
            return {
                ...state,
                messages: [...state.messages, action.message]
            }
        default:
            return state
    }
}
