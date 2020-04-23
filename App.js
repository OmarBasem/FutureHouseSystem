import React, { useState } from "react";
import { Admin, Resource, Login } from 'react-admin';
import Dashboard from './Dashboard';
import { HouseList, RoomList } from './Houses';
import {DeviceList} from './Devices';
import authProvider from './authProvider';
//import ogin from './Login';
import jsonServerProvider from 'ra-data-json-server';
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
//import MyLayout from './Layout';
//import black from '@material-ui/core/colors/black';
import {Fab} from '@material-ui/core'
import B from '@material-ui/icons/Brightness4';
import MyLayout from './Layout';

const dataProvider = jsonServerProvider('https://my-json-server.typicode.com/Mahmoud-Elsheikh/JSONtest');
const themeObj = {
    palette: 
        {
        primary: {
          main: '#262626',
        },
        secondary: {
          main: '#64DD17',
        },
        type: 'dark',
        error: red,
        contrastThreshold: 3,
        tonalOffset: 0.2,
        background: {
          main: '#262626',
        },
    },
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Arial',
            'sans-serif',
        ].join(','),
    },
}

const useDark = () => {
    const [theme, setTheme] = useState(themeObj)
    const {palette: {type}} = theme;
    const toggledarkmode = () => {
        const updatedTheme = {
            theme,
            palette: {
                primary: {
                  main: '#262626',
                },
                secondary: {
                  main: '#64DD17',
                },
                type: type === 'light' ? 'dark' : 'light'
            }
        }
        setTheme(updatedTheme)
    }
    return[theme, toggledarkmode]
}
 
const test = () => (
    <Login
        backgroundImage="https://wallpaperaccess.com/full/733839.jpg"
    /> 
);


const App = () => {
    const [theme, toggledarkmode] = useDark()
    const myTheme = createMuiTheme(theme)
    return(
        <Admin appLayout = {MyLayout} theme = {myTheme} loginPage={test} dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
            <Resource name="Houses" list={HouseList} />
            <Resource name="Rooms" list={RoomList}/>
            <Resource name="Devices" list={DeviceList}/>
            
            <Fab style={{zIndex: 2, position: "absolute", bottom: 20, left: 20}} color="secondary" aria-label="mode" onClick = {toggledarkmode}>
                <B />
            </Fab>
        </Admin>
    ); 
}
export default App;
