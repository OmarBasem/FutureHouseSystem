import React from 'react';
import { List, Datagrid, TextField, ArrayField, SingleFieldList, ChipField } from 'react-admin';

export const HouseList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name"/>
        </Datagrid>
    </List>
);

export const RoomList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="DeviceNo" />
        </Datagrid>
    </List>
);