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
import Button from 'react-native-button';
import MyScene from './Scenes/Control';
export default class AwesomeProject extends Component {
    constructor(){
        super();
        this.state={
            name:'',
            selected:0
        };
        this.handleLearn=this.handleLearn.bind(this);
        this.handleControl=this.handleControl.bind(this);
    }
    handleLearn(){


    }
    handleControl(){

    }
    render() {
        let view=<View>
        </View>;
        switch (this.state.selected){
            case 0:
                view=<View>
                    <Button
                        style={styles.learningButton}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this.handleLearn()}>
                        Learning Mode
                    </Button>
                    <Button
                        style={styles.controlButton}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this.handleControl()}>
                        Control Mode
                    </Button>

                </View>;
                break;
            case 1:
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
    controlButton:{
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
