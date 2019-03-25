import React from "react";
import { Dropdown } from "semantic-ui-react";

const RoomList = ({ data, selectedId, onItemClick }) => (
    <Dropdown text="Select Room" button upward style={{ margin:"0 1em 0 0" }}>
        <Dropdown.Menu>
            { data && data.map(item => (
                <Dropdown.Item key={ item.id } active={ item.id === selectedId } onClick={ () => onItemClick(item.id) }>{ item.name }</Dropdown.Item>
            )) }
        </Dropdown.Menu>
    </Dropdown>
)

export default RoomList