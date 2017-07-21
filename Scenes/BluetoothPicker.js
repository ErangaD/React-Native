/**
 * Created by Eranga on 7/20/2017.
 */
import React, { Component } from 'react';
import { View, Text, Navigator,StyleSheet,TouchableHighlight } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import ModalPicker from 'react-native-modal-picker'
export default class Sender extends Component {
    constructor(){
        super();

        this.state = {
            textInputValue: ''
        }

    }

    render() {
        let index = 0;
        const data = [
            { key: index++, section: true, label: 'Fruits' },
            { key: index++, label: 'Red Apples' },
            { key: index++, label: 'Cherries' },
            { key: index++, label: 'Cranberries' },
            { key: index++, label: 'Pink Grapefruit' },
            { key: index++, label: 'Raspberries' },
            { key: index++, label: 'Beets' },
            { key: index++, label: 'Red Peppers' },
            { key: index++, label: 'Radishes' },
            { key: index++, label: 'Radicchio' },
            { key: index++, label: 'Red Onions' },
            { key: index++, label: 'Red Potatoes' },
            { key: index++, label: 'Rhubarb' },
            { key: index++, label: 'Tomatoes' }
        ];
        return (


                <ModalPicker
                    data={data}
                    initValue="Select something yummy!"
                    onChange={(option)=>{ alert(`${option.label} (${option.key}) nom nom nom`) }} />


        )
    }
}
const styles = StyleSheet.create({
    learningButton:{
        fontSize: 40,
        textAlign: 'center'
    },
    backButton:{
        fontSize: 46,
        color: '#FFA500'
    },
    controlButton:{
        fontSize: 40,
        textAlign: 'center',
        color: '#333333'

    },
    remoteButton:{
        //numbers from 1 to 10
        borderStyle: 'solid',
        borderColor:'#333333'
    },
    column1: {
        backgroundColor: '#9FF1F7',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor:'#333333'
    },
    column: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor:'#333333'
    },
    column3: {
        backgroundColor: '#9FF1F7',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor:'#333333'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});