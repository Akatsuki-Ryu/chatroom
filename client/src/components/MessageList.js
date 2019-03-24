import React from "react";
import { List, Segment } from "semantic-ui-react";

const MessageList = ({ data, username }) => {
    const formatDate = date => {
        const pad = n => n < 10 ? "0" + n : n;
        return pad(date.getHours()) + ":" + pad(date.getMinutes());
    }

    const getAlignment = (username1, username2) => username1 === username2 ? "right" : "left"
    const getColor = (username1, username2) => username1 === username2 ? "green" : "blue"

    return (
        <List>
            { data && data.map(message => (
                <List.Item key={message.id}>
                    <Segment floated={ getAlignment(username, message.username) } color={ getColor(username, message.username) } style={{ textAlign:getAlignment(username, message.username) }}>
                        <p>
                            <span style={{ fontWeight:"bold" }}>{ message.username }</span><br/>
                            <span style={{ fontSize:"medium" }}>{ message.text }</span><br/>
                            <span style={{ fontSize:"mini", color:"grey" }}>{ formatDate(new Date(message.timestamp)) }</span>
                        </p>
                    </Segment>
                </List.Item>
            )) }
        </List>
    )
}

export default MessageList
