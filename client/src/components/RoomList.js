import React from "react";

const RoomList = ({ header, data, onItemClick }) => (
    <ul>
        { data && data.map(item => (
            <li key={ item.id } onClick={ () => onItemClick(item.id) }>{ item.name }</li>
        )) }
    </ul>
)

export default RoomList
