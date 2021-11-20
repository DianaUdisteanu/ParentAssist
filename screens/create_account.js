import React from 'react';
import {View, TouchableOpacity, Image, Text, Pressable} from 'react-native';
import { TextInput } from 'react-native-paper';

export default class CreateParentAccount extends React.Component{
    constructor(){
        super();
        this.state = {
        };
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
                <View style={{flex: 0.10, flexDirection: "row", justifyContent: "space-between"}}>
                    <TouchableOpacity onPress={() => this.props.navigation.reset({index:0, routes:[{name:'Login'}]})} style={{width: 30, height: 30, marginTop:"12%", marginLeft: "3%"}}>
                            <Image source={require("../app/images/logout_blue.png")} style={{width: 30, height: 30}} resizeMode='contain'/>
                    </TouchableOpacity>
                    < Text style={{color: "#2d3a56", fontSize:19, fontFamily:'bold-font', fontWeight:'bold', marginTop: "13%"}}>CREATE PARENT ACCOUNT</Text>
                    <TouchableOpacity style={{width: 30, height: 30, marginTop:"12%", marginRight: "3%", marginTop:"12%"}}>
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
                        />
                        <TextInput  placeholder="Insert email" 
                                    mode="outlined" 
                                    label="*EMAIL"
                                    outlineColor="#96A793"
                                    activeOutlineColor="#96A793"
                                    theme={{ roundness: 20, colors: { text: "#2d3a56", placeholder:'#2d3a56' } }}
                                    style={{fontSize:12, fontFamily:'bold-font', fontWeight:'bold', width:'55%', height:40, marginTop:"2%"}}
                        />
                        <TextInput  placeholder="Insert phone number" 
                                    mode="outlined" 
                                    label="*PHONE NUMBER"
                                    outlineColor="#96A793"
                                    activeOutlineColor="#96A793"
                                    theme={{ roundness: 20, colors: { text: "#2d3a56", placeholder:'#2d3a56' } }}
                                    style={{fontSize:12, fontFamily:'bold-font', fontWeight:'bold', width:'55%', height:40, marginTop:"2%"}}
                        />
                        <TextInput  placeholder="Insert student id number" 
                                    mode="outlined" 
                                    label="*STUDENT ID NUMBER"
                                    outlineColor="#96A793"
                                    activeOutlineColor="#96A793"
                                    theme={{ roundness: 20, colors: { text: "#2d3a56", placeholder:'#2d3a56' } }}
                                    style={{fontSize:12, fontFamily:'bold-font', fontWeight:'bold', width:'55%', height:40, marginTop:"2%"}}
                        />
                </View>
                <View style={{flex:0.20, alignItems:'center', marginTop:"5%"}}>
                        <Pressable style={{backgroundColor: '#96A793', alignItems:'center', width:"55%", marginHorizontal:"25%", height:47, justifyContent:'center', borderRadius:30, marginTop: "2%"}}
                                onPress={()=> console.log("upload")} > 
                            <Text  style={{color:'white', fontFamily:'bold-font', fontSize:16}}>SUBMIT ACCOUNT</Text>
                        </Pressable>
                </View>
            </View>
        );
    }
}