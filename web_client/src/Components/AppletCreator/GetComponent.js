import { TextareaAutosize } from '@material-ui/core';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dayfield from "./DayField";
import ColorPicker from "../ColorPicker/ColorPicker";
import BooleanField from "./BooleanField";

export default function GetComponent(id, type, classes) {
    switch (type) {
        case 'text' :
            return (
                <TextField
                    id={id}
                    className={classes.input}
                    InputProps={{classes: {root: classes.inputContent}}}>
                </TextField>
            );
        case 'area':
            return (
                <TextareaAutosize
                    id={id}
                    className={classes.input}
                    inputprops={{classes: {root: classes.inputContent}}}>
                </TextareaAutosize>
            );
        case 'number':
            return (
                <TextField
                    id={id}
                    helperText={'Number'}
                    className={classes.number}
                    type={'number'}
                    InputProps={{
                        inputProps: { min: 0, max: 10000 },
                        classes: {root: classes.inputContent}}}>
                </TextField>
            );
        case 'day':
            return (
                <Dayfield id={id} value={0} classes={classes}/>
            );
        case 'boolean':
            return (
                <BooleanField id={id} value={"false"} classes={classes}/>
            );
        case 'hour':
            return (
                <TextField
                    id={id}
                    helperText={'Hour(s)'}
                    className={classes.number}
                    type={'number'}
                    InputProps={{
                        inputProps: { min: 0, max: 23 },
                        classes: {root: classes.inputContent}}}>
                </TextField>
            );
        case 'min':
            return (
                <TextField
                    id={id}
                    helperText={'Minute(s)'}
                    className={classes.number}
                    type={'number'}
                    InputProps={{
                        inputProps: { min: 0, max: 59 },
                        classes: {root: classes.inputContent}}}>
                </TextField>
            );
        case 'color':
            return (
                <ColorPicker id={id}/>
            );
        default : return;
    }
}