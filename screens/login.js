import React from 'react';
import {View, ImageBackground, Text, Pressable, Alert} from 'react-native';
import { TextInput } from 'react-native-paper';


export default class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            email: "",
            password: ""
        };
    }

    handleEmail = (text) => {this.setState({email: text})};
    handlePassword = (text) => {this.setState({password: text})};

    render(){
        return(
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
               <ImageBackground  source={require("../app/images/login_background.png")} style={{width: "100%", height: "100%"}}> 
               <View style={{flex: 0.80, flexDirection: 'column', alignItems:'center', justifyContent:'center', backgroundColor: "red", marginTop: 260}}>
                    <View style={{flex: 0.40, backgroundColor: "blue", flexDirection: 'row'}}>
                                <TextInput test-id='testInputUsername' placeholder="Type your email" mode="outlined" label="EMAIL" 
                                        style={{color: 'black',fontSize:12, fontFamily:'bold-font'}}
                                        value={this.state.email}
                                        onChangeText={this.handleEmail}
                                />
                    </View>
                    <View style={{flex: 0.40, backgroundColor: "yellow"}}>
                                <TextInput test-id='testInputPassword' placeholder="Type your password" mode="outlined" label="PASSWORD" 
                                        secureTextEntry={true}
                                        style={{color: 'black',fontSize:11, fontFamily:'bold-font'}}
                                        value={this.state.password}
                                        onChangeText={this.handlePassword}
                                />
                    </View>
                </View>
                <View style={{flex:0.20, justifyContent:'center'}}>
                    <Pressable test-id="press-button" style={{backgroundColor: '#2d3a56', alignItems:'center', width:"50%", marginHorizontal:"25%", height:47, justifyContent:'center', borderRadius:30}}
                               onPress={() => Alert.alert('Simple Button pressed')} > 
                        <Text  style={{color:'white', fontFamily:'bold-font', fontSize:17}}>LOGIN</Text>
                    </Pressable>
                 </View>
               </ImageBackground> 
            </View>
        );
    }
}