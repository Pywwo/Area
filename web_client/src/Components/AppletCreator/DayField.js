import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default class Dayfield extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            classes: this.props.classes,
            id: this.props.id,
            value: 0,
            dayArray: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
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
                id={this.state.id + "-textbox"}
                helperText={'Day(s)'}
                select
                value={this.state.value}
                InputProps={{classes: {root: this.state.classes.inputContent}}}
                onChange={this.handleChange.bind(this)}
            >
            {
                this.state.dayArray.map((day, index) => (
                    <MenuItem key={index} value={index}>
                        {day}
                    </MenuItem>
                )
                )
            }
            </TextField>
            </div>
        );
    }

    handleChange = (e) => {
        let toSet =  parseInt(e.target.value, 10);
        this.setState({ value: toSet });
    };
}