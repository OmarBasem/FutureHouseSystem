import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';

const cardStyle = {
    width: 300,
    minHeight: 300,
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top'
};

const kwStyle = {
    textAlign: 'center',
    fontFamily: 'sans-serif',
    paddingTop: '5vh'
}

export default () => (
    <Card>
        <CardHeader title="Welcome to the administration" />
        <CardContent>
        <Card style={cardStyle}>
            <CardHeader title="Power Consumption:"/>
            <h1 style={kwStyle}>210 kW</h1>
            <CardContent>
           
            </CardContent>
        </Card>
        </CardContent>
    </Card>
);
