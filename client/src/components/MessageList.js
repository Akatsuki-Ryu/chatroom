import React from "react";

const MessageList = ({ header, data }) => {
    const formatDate = date => {
        const pad = n => n < 10 ? "0" + n : n;
        return pad(date.getHours()) + ":" + pad(date.getMinutes());
    }

    return (
        <ul>
            { data && data.map(message => (
                <li key={message.id}>{ formatDate(new Date(message.timestamp)) + " " + message.username + ": " + message.text }</li>
            )) }
        </ul>
    )
}

export default MessageList
