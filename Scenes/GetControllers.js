import React, { Component } from 'react';
import { View, Text, Navigator,StyleSheet,TouchableHighlight } from 'react-native';
import Button from 'react-native-button';
import { Col, Row, Grid } from "react-native-easy-grid";
export default class MyScene extends Component {
    constructor(){
        super();
        this.state={
            name:'',
            selected:0
        };
        this.change=this.change.bind(this);
    }
    change(e){
        //send the data according to the number
    }
    render() {
        return (
            <Grid>
                <Row >
                    <Text style={{textAlign:'center',fontSize:40}}>Select the button</Text>
                </Row>
                <Row style={{backgroundColor:'red'}}>
                    <TouchableHighlight style={styles.column1} onPress={(e)=>this.change(1)} >
                        <Col style={styles.column1}>
                            <Text style={styles.controlButton}>1</Text>
                        </Col>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.column} onPress={(e)=>this.change(2)} >
                        <Col style={styles.column}>
                            <Text style={styles.controlButton}>2</Text>
                        </Col>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.column3} onPress={(e)=>this.change(3)} >
                        <Col style={styles.column3}>
                            <Text style={styles.controlButton}>3</Text>
                        </Col>
                    </TouchableHighlight>
                </Row>
                <Row style={{backgroundColor:'red'}}>
                    <TouchableHighlight style={styles.column} onPress={(e)=>this.change(4)}>
                        <Col style={styles.column} onPress={this.change}>
                            <Text style={styles.controlButton}>4</Text>
                        </Col>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.column1} onPress={(e)=>this.change(5)}>
                        <Col style={styles.column1}>
                            <Text style={styles.controlButton}>5</Text>
                        </Col>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.column} onPress={(e)=>this.change(6)} >
                        <Col style={styles.column}>
                            <Text style={styles.controlButton}>6</Text>
                        </Col>
                    </TouchableHighlight>
                </Row>
                <Row style={{backgroundColor:'red'}}>
                    <TouchableHighlight style={styles.column1} onPress={(e)=>this.change(7)}>
                        <Col style={styles.column1} onPress={this.change}>
                            <Text style={styles.controlButton}>7</Text>
                        </Col>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.column} onPress={(e)=>this.change(8)}>
                        <Col style={styles.column}>
                            <Text style={styles.controlButton}>8</Text>
                        </Col>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.column3} onPress={(e)=>this.change(9)}>
                        <Col style={styles.column3}>
                            <Text style={styles.controlButton}>9</Text>
                        </Col>
                    </TouchableHighlight>
                </Row>
                <Row>
                    <TouchableHighlight style={styles.column} onPress={(e)=>this.change(0)}>
                        <Col style={styles.column}>
                            <Text style={styles.controlButton}>ON</Text>
                        </Col>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.column1} onPress={(e)=>this.change(10)}>
                        <Col style={styles.column1}>
                            <Text style={styles.controlButton}>0</Text>
                        </Col>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.column} onPress={(e)=>this.change(11)}>
                        <Col style={styles.column}>
                            <Text style={styles.controlButton}>OFF</Text>
                        </Col>
                    </TouchableHighlight>
                </Row>
            </Grid>
        )
    }
}
const styles = StyleSheet.create({
    learningButton:{
        fontSize: 40,
        textAlign: 'center'
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