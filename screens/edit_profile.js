import React from 'react';
import {View, TouchableOpacity, Text, Image, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, ref, onValue} from "firebase/database";

export default class EditProfile extends React.Component{
    constructor(){
        super();
        this.state = {
            fullEmail: "",
            email: "",
            name: "",
            phone: ""
        };
    }

    async componentDidMount(){
        await this.handleGetFullEmail();
        await this.handleGetEmail();
        this.GetDetails();
    }

    handleGetFullEmail = async() =>{
        try{
            const value = await AsyncStorage.getItem("fullEmail");
            if(value !== null) {
                this.setState({fullEmail : value});
            }
        }catch(e){}
    }

    handleGetEmail = async() =>{
        try{
            const value = await AsyncStorage.getItem("email");
            if(value !== null) {
                this.setState({email : value});
            }
        }catch(e){}
    }

    GetDetails = () =>{
        const db = getDatabase();
        const starCountRef = ref(db, '/users/' + this.state.email + '/Name');
        onValue(starCountRef, (snapshot)=> {
            this.setState({name: snapshot.val()});
        })
        const starCountRef2 = ref(db, '/users/' + this.state.email + '/Phone');
        onValue(starCountRef2, (snapshot)=> {
            this.setState({phone: snapshot.val()});
        })
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
                <View style={{flex: 0.10, flexDirection: "row", justifyContent: "space-between"}}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{flex: 0.33, width: 30, height: 30, marginTop:"12%", marginLeft: "3%"}}>
                            <Image source={require("../app/images/back_arrow_blue.png")} style={{width: 30, height: 30}} resizeMode='contain'/>
                    </TouchableOpacity>
                    < Text style={{color: "#2d3a56", fontSize:19, fontFamily:'bold-font', fontWeight:'bold', marginTop: "13%", flex: 0.65, textAlign:'left'}}>EDIT PROFILE</Text>
                </View>
                <View style={{flex: 0.25, justifyContent: "center", alignItems: 'center'}}>
                    <Image source={require("../app/images/profile_picture_placeholder_blue.png")} style={{width: "75%", height: "75%"}} resizeMode='contain'/>
                </View>
                <View style={{flex: 0.30,flexDirection: "column", justifyContent: "space-around", alignItems: "center",  }}>
                    <View>
                        <Text style={{color: "#2d3a56", fontFamily:'bold-font', fontSize: 19, textAlign: 'center'}}>
                            NAME
                        </Text>
                        <Text style={{color: "#2d3a56", fontFamily:'normal-font', fontSize: 17, textAlign: 'center'}}>
                            {this.state.name}
                        </Text>
                    </View>
                    <View>
                        <Text style={{color: "#2d3a56", fontFamily:'bold-font', fontSize: 19, textAlign: 'center'}}>
                            EMAIL
                        </Text>
                        <Text style={{color: "#2d3a56", fontFamily:'normal-font', fontSize: 17, textAlign: 'center'}}>
                            {this.state.fullEmail}
                        </Text>
                    </View>
                    <View>
                        <Text style={{color: "#2d3a56", fontFamily:'bold-font', fontSize: 19, textAlign: 'center'}}>
                            PHONE NUMBER
                        </Text>
                        <Text style={{color: "#2d3a56", fontFamily:'normal-font', fontSize: 17, textAlign: 'center'}}>
                            {this.state.phone}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 0.25, marginBottom:"5%", justifyContent :"space-around", marginTop: "5%"}}>
                        <Pressable style={{backgroundColor: '#96A793', alignItems:'center', width:"50%", marginHorizontal:"25%", height:47, justifyContent:'center', borderRadius:30, marginTop: "2%"}}
                                onPress={()=> console.log("set profile picture")} > 
                            <Text  style={{color:'white', fontFamily:'bold-font', fontSize:17}}>SET PROFILE PICTURE</Text>
                        </Pressable>
                        <Pressable style={{backgroundColor: '#96A793', alignItems:'center', width:"50%", marginHorizontal:"25%", height:47, justifyContent:'center', borderRadius:30, marginBottom: "7%"}}
                                onPress={()=> this.props.navigation.navigate("ChangePassword")} > 
                            <Text  style={{color:'white', fontFamily:'bold-font', fontSize:17, fontWeight:'bold'}}>CHANGE PASSWORD</Text>
                        </Pressable>
                </View>
            </View>
        );
    }
}