import React from "react";
import { Admin, Resource, Login } from 'react-admin';
import Dashboard from './Dashboard';
import { HouseList, RoomList } from './Houses';
import {DeviceList} from './Devices';
import authProvider from './authProvider';
//import ogin from './Login';
import jsonServerProvider from 'ra-data-json-server';
const dataProvider = jsonServerProvider('https://my-json-server.typicode.com/Mahmoud-Elsheikh/JSONtest');
 
const test = () => (
    <Login
        backgroundImage="https://source.unsplash.com/random/1600x900/daily"
    />
   
  
);

const App = () => (
        <Admin loginPage={test} dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
            <Resource name="Houses" list={HouseList} />
            <Resource name="Rooms" list={RoomList}/>
            <Resource name="Devices" list={DeviceList}/>
        </Admin>
    );
export default App;
