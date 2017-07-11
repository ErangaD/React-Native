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

import DialogBox from 'react-native-dialogbox';
import bluetoothSerial from 'react-native-bluetooth-serial';
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
            devices: [],
            text:''
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
        bluetoothSerial.on('data', (data) => this.setState({text:"Received data from on"}));
        bluetoothSerial.on('bluetoothEnabled', () => console.log("bluetoothEnabled"));
        bluetoothSerial.on('bluetoothDisabled', () => console.log('Bluetooth disabled'));
        bluetoothSerial.on('error', (err) => console.log(`Error: ${err.message}`));
        bluetoothSerial.on('connectionSuccess', () => console.log("connectionSuccess"));
        bluetoothSerial.on('connectionLost', () => {
            console.log("connection lost");
        });
       /* bluetoothSerial.withDelimiter('\r').then((res)=>{
            console.log("delimiter setup",res);
            bluetoothSerial.on('read',(data)=>{
                this.setState({text:data})
            });
        });*/
        bluetoothSerial.subscribe('\r').then((res)=> {
            bluetoothSerial.on('read', (data)=> {
                this.setState({text: "subscribe method"})
            });
        });
    }
    handleLearn(){
        //this.setState({selected:1});

        //send the "learn" string

        //initialize map to zero

        /*bluetoothSerial.connect("50:F0:D3:FF:15:F9")
            .then((res) => {
                console.log('device');

            })
            .catch((err) =>  console.log(err));
        //bluetoothSerial.readFromDevice().then((data) => {console.log(data)});*/

        //console.log('device');

        /*bluetoothSerial.pairDevice("50:F0:D3:FF:15:F9")
            .then((paired) => {
                console.log(paired);
            })
            .catch((err) => console.log(err));
        */
        bluetoothSerial.connect("20:16:06:15:47:03")
                .then((res) => {
                    this.setState({text:"success"});
                })
                .catch((err) => this.setState({text:"error in the hall catch connect "}));
    }
    handleControl(){
        console.log("In handlecontrol");
        bluetoothSerial.write("0")
            .then((res) => {
                console.log("string");
            })
            .catch((err) => console.log(err.message));
        bluetoothSerial.isConnected()
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }
    render() {
        let view=<View>
        </View>;
        switch (this.state.selected){
            case 0:
                view=<MyScene text={this.state.text} handleLearn={this.handleLearn} handleControl={this.handleControl}/>
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
