import React from 'react';
import {View, ImageBackground, Text, Pressable, Dimensions} from 'react-native';
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
            <View style={{ flex: 1 }}>
                <ImageBackground    source={require("../app/images/login_background.png")} 
                                    style={{    flex: 1,  
                                                position: 'absolute',
                                                left: 0,
                                                top: 0,
                                                width: Dimensions.get('screen').width,
                                                height: Dimensions.get('screen').height 
                                            }} 
                                    resizeMode="cover"
                >
                    <View style={{ flex:0.35 }}></View>
                    <View style={{ flex:0.45 , opacity:1, alignItems: "center"}}>
                        <TextInput  placeholder="Type your email" 
                                    mode="outlined" 
                                    label="EMAIL"
                                    outlineColor="#96A793"
                                    activeOutlineColor="#96A793"
                                    theme={{ roundness: 20, colors: { text: "white", placeholder:'white' } }}
                                    style={{ backgroundColor: '#2d3a56', fontSize:12, fontFamily:'bold-font', fontWeight:'bold', width:'70%', marginTop:'19%', height:45 }}
                                    value={this.state.email}
                                    onChangeText={this.handleEmail}
                        />
                        <TextInput  placeholder="Type your password" 
                                    mode="outlined" 
                                    label="PASSWORD"  
                                    secureTextEntry={true}
                                    outlineColor="#96A793"
                                    activeOutlineColor="#96A793"
                                    theme={{ roundness: 20, colors: { text: "white", placeholder:'white' } }}
                                    style={{ backgroundColor: '#2d3a56', fontSize:12, fontFamily:'bold-font', fontWeight:'bold', width:'70%', marginTop:'5%', height:45 }}
                                    value={this.state.password}
                                    onChangeText={this.handlePassword}
                        />
                    </View>
                    <View style={{ flex:0.20, justifyContent:'center' }}>
                        <Pressable style={{backgroundColor: '#2d3a56', alignItems:'center', width:"50%", marginHorizontal:"25%", height:47, justifyContent:'center', borderRadius:30}}
                                onPress={()=>this.props.navigation.navigate("SecondScreen")} > 
                            <Text  style={{color:'white', fontFamily:'bold-font', fontSize:17}}>LOGIN</Text>
                        </Pressable>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}