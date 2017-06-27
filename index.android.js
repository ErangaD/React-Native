/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  View
} from 'react-native';


import bluetoothSerial from 'react-native-bluetooth-serial'
import MyScene from './Scenes/Control';
import GetControllers from './Scenes/GetControllers';
export default class AwesomeProject extends Component {
    constructor(){
        super();
        this.state={
            name:'',
            selected:0,
            id:'',
            isEnabled: false,
            devices: []
        };
        //this will fire when a data comes


        this.handleLearn=this.handleLearn.bind(this);
        this.handleControl=this.handleControl.bind(this);
    }
    componentWillMount () {
        Promise.all([
                bluetoothSerial.isEnabled(),
                bluetoothSerial.list()
            ])
            .then((values) => {
                const [ isEnabled, devices ] = values;
                this.setState({ isEnabled, devices })

            });
        bluetoothSerial.on('read', (data) => console.log(data));
        bluetoothSerial.on('bluetoothEnabled', () => console.log("bluetoothEnabled"));
        bluetoothSerial.on('bluetoothDisabled', () => console.log('Bluetooth disabled'));
        bluetoothSerial.on('error', (err) => console.log(`Error: ${err.message}`));
        bluetoothSerial.on('connectionSuccess', () => console.log("connectionSuccess"));
        bluetoothSerial.on('connectionLost', () => {
            console.log("connection lost");
        });
        bluetoothSerial.withDelimiter('\r').then((res)=>{
            console.log("delimiter setup",res);
            bluetoothSerial.on('read',(data)=>{
                console.log('read',data);
            });
        });
    }
    handleLearn(){
        //this.setState({selected:1});

        //send the "learn" string

        //initialize map to zero


        //bluetoothSerial.readFromDevice().then((data) => {console.log(data)});


    }
    handleControl(){
        console.log("In handlecontrol");
        bluetoothSerial.write("String kj")
            .then((res) => {
                console.log("string");
            })
            .catch((err) => console.log(err));

        bluetoothSerial.isConnected()
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }
    render() {
        let view=<View>
        </View>;
        switch (this.state.selected){
            case 0:
                view=<MyScene handleLearn={this.handleLearn} handleControl={this.handleControl}/>
                break;
            case 1:
                view=<GetControllers handleControl={this.handleControl}/>
                break;
            case 2:
                break;
        }
        return (

            view

        );
    }
}

const styles = StyleSheet.create({
    learningButton:{
        fontSize: 40,
        textAlign: 'center',
        margin: 100,
        marginTop:200
    },
    controlButton:{
        fontSize: 40,
        textAlign: 'center',
        color: '#333333'
    },
    remoteButton:{
        //numbers from 1 to 10
    },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 100,
    marginTop:250
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
