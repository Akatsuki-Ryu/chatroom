import React from "react";
import { List } from "semantic-ui-react";

const RoomList = ({ header, data, selectedId, onItemClick }) => (
    <List selection>
        { data && data.map(item => (
            <List.Item key={ item.id } active={ item.id === selectedId } onClick={ () => onItemClick(item.id) }>{ item.name }</List.Item>
        )) }
    </List>
)

export default RoomList
