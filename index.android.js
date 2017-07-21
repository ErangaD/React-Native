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
  View,
  AsyncStorage,
    Picker,
    Text
} from 'react-native';

import bluetoothSerial from 'react-native-bluetooth-serial';
import InitialScene from './Scenes/Control';
import Sender from './Scenes/GetControllers';
import DataCollector from './Scenes/SetControll';
import Bluetooth from './Scenes/BluetoothPicker';
export default class AwesomeProject extends Component {
    constructor(){
        super();
        this.state={
            name:'',
            selected:0,
            id:'',
            isEnabled: false,
            devices: [],
            text:'',
            connected:false,
            command:'Connect',
            storeArray:[],
            index:0,
            language:''

        };
        this.handleLearn=this.handleLearn.bind(this);
        this.handleControl=this.handleControl.bind(this);
        this.createConnection = this.createConnection.bind(this);
        this.goToInitialScene = this.goToInitialScene.bind(this);
        this.storeTheArray = this.storeTheArray.bind(this);
        this.setIndex = this.setIndex.bind(this);
        this.sendData = this.sendData.bind(this);
        this.searchPairedDevices = this.searchPairedDevices.bind(this);
    }
    searchPairedDevices(){
        Promise.all([
                bluetoothSerial.list()
            ])
            .then((values) => {
                console.log(values);
                let devices = values[0];
                let connectedDevices = [];
                devices.forEach(function (item,index) {
                    let obj = {
                        key: item.id,
                        label: item.name
                    };
                    connectedDevices.push(obj);
                });
                this.setState({ devices:connectedDevices });
            });
    }
    createConnection (option){
        //connecting to the specific mac address
        if(this.state.connected){
            bluetoothSerial.disconnect()
                .then((res) => {
                    this.setState({text:"success"});
                })
                .catch((err) => this.setState({text:"error when disconnecting bluetooth"}));
        }else{
            bluetoothSerial.connect(option.key)
                .then((res) => {
                    this.setState({text:"success"});
                })
                .catch((err) => this.setState({text:"error when connecting to the bluetooth"}));
        }
    }

    setIndex(index){
        console.log("in the set index"+index);
        this.setState({index:index});
    }

    storeTheArray(data){
        //store the data
        var array = this.state.storeArray;
        array[this.state.index] = data.data;
        this.setState({storeArray:array});
    }

    sendData(e){
        try {
            var data = this.state.storeArray[e];
            bluetoothSerial.write(data)
                .then((res) => {
                    console.log("sent data" + res);
                })
                .catch((err) => console.log(err.message));
        }
        catch(err) {
            console.log(err.message);
        }

    }
    componentWillMount () {

        bluetoothSerial.on('bluetoothEnabled', () => console.log("bluetoothEnabled"));
        bluetoothSerial.on('bluetoothDisabled', () => console.log('Bluetooth disabled'));
        bluetoothSerial.on('error', (err) => console.log(`Error: ${err.message}`));
        bluetoothSerial.on('connectionSuccess', () => this.setState({connected:true, command:'Disconnect'}));
        bluetoothSerial.on('connectionLost', () => {
            this.setState({connected:false ,command:'Connect'})
        });
       bluetoothSerial.withDelimiter('\n').then((res)=>{

            bluetoothSerial.on('read',(data)=>{
                console.log(data);
                console.log("data came "+ data);
                if(this.state.selected === 1){
                    console.log(" in the sending mode");
                }else if(this.state.selected === 2){
                    //learn mode
                    console.log(" in the learning mode");
                    this.storeTheArray(data);
                }
            });
        });
    }
    handleLearn(){
        if(this.state.connected){
            this.setState({selected:2});
        }
    }
    handleControl(){
        if(this.state.connected){
            this.setState({selected:1});
        }
    }
    goToInitialScene(){
        this.setState({selected:0});
    }

    render() {
        let view=<View>
        </View>;
        switch (this.state.selected){
            case 0:
                view=<InitialScene
                    devices={this.state.devices}
                    command={this.state.command}
                    text={this.state.text}
                    handleLearn={this.handleLearn}
                    handleControl={this.handleControl}
                    createConnection={this.createConnection}
                    searchPairedDevices={this.searchPairedDevices}
                />
                break;
            case 1:
                view=<Sender goToInitialScene={this.goToInitialScene} sendData={this.sendData} />
                break;
            case 2:
                view=<DataCollector goToInitialScene={this.goToInitialScene} setIndex={this.setIndex}/>
                break;
        }
        return (

            view

        );
    }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
