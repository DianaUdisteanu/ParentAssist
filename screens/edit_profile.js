import React from 'react';
import {View, TouchableOpacity, Text, Image, Pressable} from 'react-native';
import { getStorage, ref } from "firebase/storage";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const storageRef = ref(storage, 'some-child');
const storage = getStorage();
// Create a reference to 'mountains.jpg'
const mountainsRef = ref(storage, 'mountains.jpg');
// Create a reference to 'images/mountains.jpg'
const mountainImagesRef = ref(storage, 'images/mountains.jpg');
// While the file names are the same, the references point to different files
mountainsRef.name === mountainImagesRef.name;           // true
mountainsRef.fullPath === mountainImagesRef.fullPath;   // false 


export default class EditProfile extends React.Component{
    constructor(){
        super();
        this.state = {
        };
    }

    Upload = () =>
        uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
                <View style={{flex: 0.10, flexDirection: "row", justifyContent: "space-between"}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")} style={{flex: 0.33, width: 30, height: 30, marginTop:"12%", marginLeft: "3%"}}>
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
                            Diana Udisteanu
                        </Text>
                    </View>
                    <View>
                        <Text style={{color: "#2d3a56", fontFamily:'bold-font', fontSize: 19, textAlign: 'center'}}>
                            EMAIL
                        </Text>
                        <Text style={{color: "#2d3a56", fontFamily:'normal-font', fontSize: 17, textAlign: 'center'}}>
                            dianaudisteanu@outlook.com
                        </Text>
                    </View>
                    <View>
                        <Text style={{color: "#2d3a56", fontFamily:'bold-font', fontSize: 19, textAlign: 'center'}}>
                            PHONE NUMBER
                        </Text>
                        <Text style={{color: "#2d3a56", fontFamily:'normal-font', fontSize: 17, textAlign: 'center'}}>
                            0799 123 456
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