import React from 'react';
import {View, TouchableOpacity, Text, Image, Pressable, Alert} from 'react-native';
import { TextInput } from 'react-native-paper';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';

export default class ChangePassword extends React.Component{
    constructor(){
        super();
        this.state = {
            currentPassword: "",
            fPassword: "",
            sPassword: ""
        };
    }

    handleCurrentPassword = (text) => {this.setState({currentPassword: text})};
    handleFirstPassword = (text) => {this.setState({fPassword: text})};
    handleSecondPassword = (text) => {this.setState({sPassword: text})};

    ChangePass = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(
                user.email,
                this.state.currentPassword
        );
        reauthenticateWithCredential(user, credential).then(() => {
            if(this.state.fPassword === this.state.sPassword){
                updatePassword(user, this.state.fPassword).then(() => {
                    Alert.alert("Success",
                        "Password changed successfuly!",
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
                            onPress: () => this.props.navigation.navigate("ChangePassword")

                        }
                    ])
                    this.setState({currentPassword: ''});
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
                                onPress: () => this.props.navigation.navigate("ChangePassword")

                            }
                        ])
                    this.setState({currentPassword: ''});
                    this.setState({fPassword: ''});
                    this.setState({sPassword: ''});
            }
            })
            .catch (error => {
                Alert.alert("Error",
                "The current password you provided is incorrect.",
                [
                    {
                        text:'Ok',
                        onPress: () => this.props.navigation.navigate("ChangePassword")

                    }
                ])
                this.setState({currentPassword: ''});
                this.setState({fPassword: ''});
                this.setState({sPassword: ''});
           });  
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
                <View style={{flex: 0.10, flexDirection: "row", justifyContent: "space-between"}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("EditProfile")} style={{flex: 0.20, width: 30, height: 30, marginTop:"12%", marginLeft: "3%"}}>
                            <Image source={require("../app/images/back_arrow_blue.png")} style={{width: 30, height: 30}} resizeMode='contain'/>
                    </TouchableOpacity>
                    <Text style={{color: "#2d3a56", fontSize:19, fontFamily:'bold-font', fontWeight:'bold', marginTop: "13%",marginRight:"20%", flex: 0.65, textAlign:'left'}}>CHANGE PASSWORD</Text>
                </View>
                <View style={{flex: 0.15, alignItems: 'center', justifyContent: "center"}}>
                    <Image source={require("../app/images/logo_blue.png")} resizeMode='contain' style={{width: 100, height: 100}}/>
                </View>
                <View style={{flex: 0.35, justifyContent: "space-between", alignItems: "center", marginTop : "20%"}}>
                        <TextInput  placeholder="Insert the current password" 
                                    mode="outlined" 
                                    label="*CURRENT PASSWORD"
                                    outlineColor="#96A793"
                                    activeOutlineColor="#96A793"
                                    theme={{ roundness: 20, colors: { text: "#2d3a56", placeholder:'#2d3a56' } }}
                                    style={{fontSize:12, fontFamily:'bold-font', fontWeight:'bold', width:'55%', height:40, marginTop:"2%"}}
                                    value={this.state.currentPassword}
                                    onChangeText={this.handleCurrentPassword}
                                    secureTextEntry={true}
                        />
                        <TextInput  placeholder="Insert the new password" 
                                    mode="outlined" 
                                    label="*NEW PASSWORD"
                                    outlineColor="#96A793"
                                    activeOutlineColor="#96A793"
                                    theme={{ roundness: 20, colors: { text: "#2d3a56", placeholder:'#2d3a56' } }}
                                    style={{fontSize:12, fontFamily:'bold-font', fontWeight:'bold', width:'55%', height:40, marginTop:"-1%" }}
                                    value={this.state.fPassword}
                                    onChangeText={this.handleFirstPassword}
                                    secureTextEntry={true}
                        />
                         <TextInput placeholder="Reinsert the new password" 
                                    mode="outlined" 
                                    label="*CONFIRM PASSWORD"
                                    outlineColor="#96A793"
                                    activeOutlineColor="#96A793"
                                    theme={{ roundness: 20, colors: { text: "#2d3a56", placeholder:'#2d3a56'} }}
                                    style={{fontSize:12, fontFamily:'bold-font', fontWeight:'bold', width:'55%', height: 40, marginBottom: "10%"}}
                                    value={this.state.sPassword}
                                    onChangeText={this.handleSecondPassword}
                                    secureTextEntry={true}
                        />
                </View>
                <View style={{ flex: 0.25, marginBottom:"5%", justifyContent :"space-around", marginTop: "5%"}}>
                        <Pressable style={{backgroundColor: '#96A793', alignItems:'center', width:"50%", marginHorizontal:"25%", height:47, justifyContent:'center', borderRadius:30, marginTop: "2%"}}
                                onPress={this.ChangePass} > 
                            <Text  style={{color:'white', fontFamily:'bold-font', fontSize:17}}>CONFIRM</Text>
                        </Pressable>
                </View>
            </View>
        );
    }
}