import React from 'react';
import {View, TouchableOpacity, Image, Text, Pressable, Alert} from 'react-native';
import { TextInput } from 'react-native-paper';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import email from 'react-native-email';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class CreateParentAccount extends React.Component{
    constructor(){
        super();
        this.pass = "";
        this.state = {
            name: "",
            email: "",
            phoneNumber: "",
            sIdNumber: "",
            personalEmail : ""
        };
    }

    componentDidMount() {
        this.handleGetEmail();
    }

    handleGetEmail = async() =>{
        try{
            const value = await AsyncStorage.getItem("email");
            if(value !== null) {
                this.setState({personalEmail : value});
            }
        }catch(e){}
    }

    handleName = (text) => {this.setState({name: text})};
    handleEmail = (text) => {this.setState({email: text})};
    handlePhoneNumber = (text) => {this.setState({phoneNumber: text})};
    handleSIdNumber = (text) => {this.setState({sIdNumber: text})};

    handleSendEmail= (to, subjectMail, bodyMail) => {
        email(to, {
            // Optional additional arguments
            subject: subjectMail,
            body: bodyMail
        }).catch(console.error)
    }

    makeid = (length) => {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    CreateAccount = () => {
        const auth = getAuth();
        this.pass = this.makeid(20);
        console.log(this.pass);
        createUserWithEmailAndPassword(auth, this.state.email, this.pass)
        .then(() => {
            this.createIndividualTable();
            Alert.alert("Info",
                                    "User created successfully!",
                                    [
                                        {
                                            text:'Ok',
                                            onPress: () => this.props.navigation.navigate("SecondScreen")
                                        }
                                    ]);
            this.setState({name: ''});
            this.setState({email: ''});
            this.setState({phoneNumber: ''});
            this.setState({sIdNumber: ''});
        })
        .catch(error => Alert.alert("Error",
                                    error.message,
                                    [
                                        {
                                            text:'Ok',
                                            onPress: () => this.props.navigation.navigate("SecondScreen")
                                        }
                                    ]))
    }

    createIndividualTable = () => {
        const username = this.state.email.split("@")[0].replace('.','').replace('_','');
        const childPath = "/" + username;
        const db = getDatabase();
        set(ref(db, '/users' + childPath), {
            IDnumber: this.state.sIdNumber,
            Name: this.state.name,
            Phone: this.state.phoneNumber,
            Role: "Parent"
        }).catch(function (error) {
            console.log("Error:" + error.message);
        });

        const Path = "/" + this.state.personalEmail + "/Students/" + this.state.sIdNumber;
        const id = this.state.sIdNumber;
        set(ref(db, '/users' + Path), {
            Parent : this.state.email.split("@")[0].replace('.','').replace('_','')
        }).catch(function (error) {
            console.log("Error:" + error.message);
        });
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
                <View style={{flex: 0.10, flexDirection: "row", justifyContent: "space-between"}}>
                    <TouchableOpacity onPress={() => this.props.navigation.reset({index:0, routes:[{name:'Login'}]})} style={{width: 30, height: 30, marginTop:"12%", marginLeft: "3%"}}>
                            <Image source={require("../app/images/logout_blue.png")} style={{width: 30, height: 30}} resizeMode='contain'/>
                    </TouchableOpacity>
                    < Text style={{color: "#2d3a56", fontSize:19, fontFamily:'bold-font', fontWeight:'bold', marginTop: "13%"}}>CREATE PARENT ACCOUNT</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("EditProfile")} style={{width: 30, height: 30, marginTop:"12%", marginRight: "3%", marginTop:"12%"}}>
                            <Image source={require("../app/images/settings_icon_blue.png")} style={{width: 30, height: 30}} resizeMode='contain'/>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 0.20, alignItems:'center', flexDirection:'column'}}>
                    <Image source={require("../app/images/logo_blue.png")} style={{width: 150, height: 150, margin:0, padding:0}} resizeMode='contain'/>
                    <Text style={{color: "#2d3a56", fontSize:14, fontFamily:'bold-font', fontWeight:'bold', letterSpacing:4, marginTop:-10}}>PARENT ASSIST</Text>
                </View>
                <View style={{flex: 0.55, flexDirection:'column', alignItems:'center', justifyContent:'space-around', marginTop:"7%"}}>
                        <TextInput  placeholder="Insert name" 
                                    mode="outlined" 
                                    label="*NAME"
                                    outlineColor="#96A793"
                                    activeOutlineColor="#96A793"
                                    theme={{ roundness: 20, colors: { text: "#2d3a56", placeholder:'#2d3a56' } }}
                                    style={{fontSize:12, fontFamily:'bold-font', fontWeight:'bold', width:'55%', height:40, marginTop:"2%"}}
                                    value={this.state.name}
                                    onChangeText={this.handleName}
                        />
                        <TextInput  placeholder="Insert email" 
                                    mode="outlined" 
                                    label="*EMAIL"
                                    outlineColor="#96A793"
                                    activeOutlineColor="#96A793"
                                    theme={{ roundness: 20, colors: { text: "#2d3a56", placeholder:'#2d3a56' } }}
                                    style={{fontSize:12, fontFamily:'bold-font', fontWeight:'bold', width:'55%', height:40, marginTop:"2%"}}
                                    value={this.state.email}
                                    onChangeText={this.handleEmail}
                        />
                        <TextInput  placeholder="Insert phone number" 
                                    mode="outlined" 
                                    label="*PHONE NUMBER"
                                    outlineColor="#96A793"
                                    activeOutlineColor="#96A793"
                                    theme={{ roundness: 20, colors: { text: "#2d3a56", placeholder:'#2d3a56' } }}
                                    style={{fontSize:12, fontFamily:'bold-font', fontWeight:'bold', width:'55%', height:40, marginTop:"2%"}}
                                    value={this.state.phoneNumber}
                                    onChangeText={this.handlePhoneNumber}
                        />
                        <TextInput  placeholder="Insert student id number" 
                                    mode="outlined" 
                                    label="*STUDENT ID NUMBER"
                                    outlineColor="#96A793"
                                    activeOutlineColor="#96A793"
                                    theme={{ roundness: 20, colors: { text: "#2d3a56", placeholder:'#2d3a56' } }}
                                    style={{fontSize:12, fontFamily:'bold-font', fontWeight:'bold', width:'55%', height:40, marginTop:"2%"}}
                                    value={this.state.sIdNumber}
                                    onChangeText={this.handleSIdNumber}
                        />
                </View>
                <View style={{flex:0.20, alignItems:'center', marginTop:"5%"}}>
                        <Pressable style={{backgroundColor: '#96A793', alignItems:'center', width:"55%", marginHorizontal:"25%", height:47, justifyContent:'center', borderRadius:30, marginTop: "2%"}}
                                onPress={() => {this.CreateAccount(); this.handleSendEmail(this.state.email, 'Your account for ParentAssist app was created!', 'Dear, ' + this.state.name + '\n' + 'Here are the credentials for logging into our app:\n' + 'Email: ' + this.state.email + '\n' + 'Password: ' + this.pass + '\n' + 'Do not forget to change your password after logging in.')}}  > 
                            <Text  style={{color:'white', fontFamily:'bold-font', fontSize:16}}>SUBMIT ACCOUNT</Text>
                        </Pressable>
                </View>
            </View>
        );
    }
}