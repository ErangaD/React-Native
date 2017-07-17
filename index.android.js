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
  AsyncStorage
} from 'react-native';

import bluetoothSerial from 'react-native-bluetooth-serial';
import InitialScene from './Scenes/Control';
import Sender from './Scenes/GetControllers';
import DataCollector from './Scenes/SetControll';
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
            index:0
        };
        this.handleLearn=this.handleLearn.bind(this);
        this.handleControl=this.handleControl.bind(this);
        this.createConnection = this.createConnection.bind(this);
        this.goToInitialScene = this.goToInitialScene.bind(this);
        this.storeTheArray = this.storeTheArray.bind(this);
        this.setIndex = this.setIndex.bind(this);
        this.sendData = this.sendData.bind(this);
    }
    createConnection (){
        //connecting to the specific mac address
        if(this.state.connected){
            bluetoothSerial.disconnect()
                .then((res) => {
                    this.setState({text:"success"});
                })
                .catch((err) => this.setState({text:"error when disconnecting bluetooth"}));
        }else{
            bluetoothSerial.connect("20:16:06:15:47:03")
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
                view=<InitialScene command={this.state.command} text={this.state.text} handleLearn={this.handleLearn} handleControl={this.handleControl} createConnection={this.createConnection}/>
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
