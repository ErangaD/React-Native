import React, { Component } from 'react';
import { View, Text, TextInput, Navigator,StyleSheet,Picker } from 'react-native';
import Button from 'react-native-button';
import ModalPicker from 'react-native-modal-picker'
export default class MyScene extends Component {
    //initial view
    render() {
        return (
            <View>
                <Text>{""}</Text>
                <Button
                    style={styles.learningButton}
                    styleDisabled={{color: 'red'}}
                    onPress={() => this.props.handleLearn()}>
                    Learning Mode
                </Button>
                <Button
                    style={styles.controlButton}
                    styleDisabled={{color: 'red'}}
                    onPress={() => this.props.handleControl()}>
                    Control Mode
                </Button>
                <ModalPicker
                    data={this.props.devices}
                    onChange={(option)=>{ this.props.createConnection(option)}}
                    >
                    <TextInput
                        style={styles.search}
                        editable={false}
                        placeholder={this.props.command}
                        />
                    </ModalPicker>
                <Button
                    style={styles.connectButton}
                    styleDisabled={{color: 'red'}}
                    onPress={() => this.props.searchPairedDevices()}>
                    Search
                </Button>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    learningButton:{
        fontSize: 40,
        textAlign: 'center',
        margin: 100,
        marginTop:150
    },
    controlButton:{
        fontSize: 40,
        textAlign: 'center',
        color: '#333333'
    },
    search:{
        fontSize: 20,
        textAlign: 'center',
        color: '#FFA500',
        margin: 30
    },
    connectButton:{
        fontSize: 20,
        textAlign: 'center',
        color: '#FFA500',
        margin: 10
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