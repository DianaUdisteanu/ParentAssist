import React from 'react';
import {Text, View, ImageBackground} from 'react-native';


export default class Login extends React.Component{
    constructor(){
        super();
        this.state = {
        
        };
    }

    render(){
        return(
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
               <ImageBackground  source={require("../app/images/login_background.png")} style={{width: "100%", height: "100%"}}> 
               </ImageBackground> 
            </View>
        );
    }
}