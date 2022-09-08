import React from "react";

import { View, StyleSheet, Image, Text } from 'react-native'
import * as Animation from 'react-native-animatable'

const Welcome = ({ navigation }) => {

    const time = () =>{
        setTimeout(() => {
            navigation.navigate('home')
        }, 4000);
    }

    time()

    return(
        <View style={styles.container}>
            <Animation.Image animation='fadeInRight' duration={2000} source={require('../../assets/logo_2.png')} />
            <Animation.Text animation='fadeInLeft' duration={2000} style={styles.text}>Comece sua lista agora ! ! !</Animation.Text>
        </View>
    )
}

export default Welcome;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#1d7692'
    },
    text:{
        fontSize:20,
        fontWeight:'700',
        color:'#fff',
        fontStyle:'italic'
    }
})