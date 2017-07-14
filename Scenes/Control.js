import React, { Component } from 'react';
import { View, Text, Navigator,StyleSheet } from 'react-native';
import Button from 'react-native-button';
export default class MyScene extends Component {

    render() {
        return (
            <View>
                <Text>{this.props.text}</Text>
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
                <Button
                    style={styles.connectButton}
                    styleDisabled={{color: 'red'}}
                    onPress={() => this.props.createConnection()}>
                    {this.props.command}
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
        marginTop:200
    },
    controlButton:{
        fontSize: 40,
        textAlign: 'center',
        color: '#333333'
    },
    connectButton:{
        fontSize: 20,
        textAlign: 'center',
        color: '#FFA500',
        margin: 100
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