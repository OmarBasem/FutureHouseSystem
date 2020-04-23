import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import 

const cardStyle = {
    width: 300,
    minHeight: 300,
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top'
};

export default () => (
    <Card>
        <CardHeader title="Welcome to the administration" />
        <CardContent>
        <Card style={cardStyle}>
            <CardHeader title="Power Consumption:"/>
            <CardContent>
           
            </CardContent>
        </Card>
        </CardContent>
    </Card>
);