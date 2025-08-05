import React, { Component } from 'react';

export default class Datecontent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentdatetime: new Date()
        };
    }

    formatDate = (date) => {
        const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
        return `Today is ${date.toLocaleDateString('en-GB', options)}`;
    };

    df = (date1) => {
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return `Started : ${date1.toLocaleDateString('en-GB', options)}`;
    };

    render() {
        const { df } = this.props; // Get the df prop

        return (
            <div>
                <p>
                    {df ? this.df(df) : this.formatDate(this.state.currentdatetime)}
                </p>
            </div>
        );
    }
}