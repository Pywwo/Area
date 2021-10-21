import React, { useState} from "react";
import {CirclePicker} from 'react-color'
import {TextField} from "@material-ui/core";

export default function ColorPicker(props) {

    const [color, setColor] = useState('#000');

    let state = {
        id: props.id
    };

    return (
        <div>
            <TextField value={color} style={{opacity: '0'}} id={state.id}/>
            <CirclePicker onChange={(event) => setColor(event.hex)}/>
        </div>
    );
}