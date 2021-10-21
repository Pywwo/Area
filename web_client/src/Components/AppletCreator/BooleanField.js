import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default class BooleanField extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            classes: this.props.classes,
            id: this.props.id,
            value: this.props.value,
            booleanArray: [
                'true',
                'false',
            ],
            isLoading: false,
        };
    }
    render() {
        const { isLoading } = this.state;

        if (isLoading) {
            return (
            <div />
            );
        }
        return (
            <div>
            <input id={this.state.id} type="hidden" value={this.state.value}></input>
            <TextField
                className={this.state.classes.input}
                id={this.state.id + "-boolean-box"}
//                helperText={'Day(s)'}
                select
                value={this.state.value}
                InputProps={{classes: {root: this.state.classes.inputContent}}}
                onChange={this.handleChange.bind(this)}
            >
            {
                this.state.booleanArray.map((value, index) => (
                    <MenuItem key={index} value={value}>
                        {value}
                    </MenuItem>
                )
                )
            }
            </TextField>
            </div>
        );
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value });
    };
}