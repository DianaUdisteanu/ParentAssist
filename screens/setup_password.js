import React from 'react';
import {View, Text, Image, Pressable, Alert} from 'react-native';
import { TextInput } from 'react-native-paper';
import { getAuth, updatePassword } from 'firebase/auth';

export default class SetupPassword extends React.Component{
    constructor(){
        super();
        this.state = {
            fPassword: "",
            sPassword: ""
        };
    }

    handleFirstPassword = (text) => {this.setState({fPassword: text})};
    handleSecondPassword = (text) => {this.setState({sPassword: text})};

    Update = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if(this.state.fPassword === this.state.sPassword){
            updatePassword(user, this.state.fPassword).then(() => {
                Alert.alert("Success",
                  "Password updated successfuly!",
                  [
                      {
                          text:'Ok',
                          onPress: () => this.props.navigation.navigate("Login")
                      }
                  ])
              }).catch((error) => {
                Alert.alert("Error",
                error.message,
                [
                    {
                        text:'Ok',
                        onPress: () => this.props.navigation.navigate("SetupPassword")
          
                    }
                ])
                this.setState({fPassword: ''});
                this.setState({sPassword: ''});
              });
        }
        else{
            Alert.alert("Error",
                  "Wrong confirmation. Retype password.",
                  [
                      {
                          text:'Ok',
                          onPress: () => this.props.navigation.navigate("SetupPassword")
            
                      }
                  ])
                this.setState({fPassword: ''});
                this.setState({sPassword: ''});
        }
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
                <View style={{flex: 0.10, flexDirection: "row", justifyContent: "center"}}>
                    <Text style={{color: "#2d3a56", fontSize:19, fontFamily:'bold-font', fontWeight:'bold', marginTop: "13%"}}>SETUP PASSWORD</Text>
                </View>
                <View style={{flex: 0.15, alignItems: 'center', justifyContent: "center"}}>
                    <Image source={require("../app/images/logo_blue.png")} resizeMode='contain' style={{width: 100, height: 100}}/>
                </View>
                <View style={{flex: 0.30, justifyContent: "space-between", alignItems: "center", marginTop : "30%"}}>
                        <TextInput  placeholder="Insert the new password" 
                                    mode="outlined" 
                                    label="*NEW PASSWORD"
                                    outlineColor="#96A793"
                                    activeOutlineColor="#96A793"
                                    secureTextEntry={true}
                                    theme={{ roundness: 20, colors: { text: "#2d3a56", placeholder:'#2d3a56' } }}
                                    style={{fontSize:12, fontFamily:'bold-font', fontWeight:'bold', width:'55%', height:40, marginTop:"-1%" }}
                                    value={this.state.fPassword}
                                    onChangeText={this.handleFirstPassword}
                        />
                         <TextInput placeholder="Reinsert the new password" 
                                    mode="outlined" 
                                    label="*CONFIRM PASSWORD"
                                    outlineColor="#96A793"
                                    activeOutlineColor="#96A793"
                                    secureTextEntry={true}
                                    theme={{ roundness: 20, colors: { text: "#2d3a56", placeholder:'#2d3a56'} }}
                                    style={{fontSize:12, fontFamily:'bold-font', fontWeight:'bold', width:'55%', height: 40, marginBottom: "10%"}}
                                    value={this.state.sPassword}
                                    onChangeText={this.handleSecondPassword}
                        />
                </View>
                <View style={{ flex: 0.25, marginBottom:"5%", justifyContent :"space-around", marginTop: "5%"}}>
                        <Pressable style={{backgroundColor: '#96A793', alignItems:'center', width:"50%", marginHorizontal:"25%", height:47, justifyContent:'center', borderRadius:30, marginTop: "2%"}}
                                onPress={this.Update} > 
                            <Text  style={{color:'white', fontFamily:'bold-font', fontSize:17}}>CONFIRM</Text>
                        </Pressable>
                </View>
            </View>
        );
    }
}