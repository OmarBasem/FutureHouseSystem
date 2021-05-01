// in src/comments.js
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/core/Avatar';
import { List, TextField, DateField, ReferenceField, EditButton } from "react-admin";

const cardStyle = {
    width: 300,
    minHeight: 300,
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top'
};
const DeviceGrid = ({ ids, data, basePath }) => (
    <div style={{ margin: '1em' }}>
    {ids.map(id =>
        <Card key={id} style={cardStyle}>
            <CardHeader
                title={<TextField record={data[id]} source="name" />}
                subheader={<TextField record={data[id]} source="id" />}
            />
            <CardContent>
               <p>Status:</p> <TextField record={data[id]} source="Status" />
                <p>Usage Amount:</p><TextField record={data[id]} source="usage" />
            </CardContent>
            <CardActions style={{ textAlign: 'right' }}>
                <EditButton resource="Devices" basePath={basePath} record={data[id]} />
            </CardActions>
        </Card>
    )}
    </div>
);
DeviceGrid.defaultProps = {
    data: {},
    ids: [],
};

export const DeviceList = (props) => (
    <List title="All Devices" {...props}>
        <DeviceGrid />
    </List>
);