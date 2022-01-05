import React from 'react';
import {View, TouchableOpacity, Image, Text, Pressable, Alert} from 'react-native';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera } from 'expo-camera';
import { onValue, getDatabase, set, push } from "firebase/database";
import { getStorage, ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";

export default class Announcement extends React.Component{
    constructor(){
        super();
        this.state = {
            email: ""
        };
    }

    componentDidMount() {
        this.handleGetEmail();
    }


    handleGetEmail = async() =>{
        try{
            const value = await AsyncStorage.getItem("email");
            if(value !== null) {
                this.setState({email : value});
            }
        }catch(e){}
    }


    async convertURItoFile(){


        return file
    }

    async handlePostAnnouncement() {

        // const file = await this.convertURItoFile()
        // const metadata = { type:'image/jpeg' }

        let blob = await fetch(
            this.props.route.params.imageURI
        ).then(
            response => response.blob()
        )

        let metadata = {
            type:'image/jpeg'
        }

        let file = new File([blob],'test.jpeg',metadata)

        const storage = getStorage();
        const imagesReference = ref(storage, 'image/' + new Date().toISOString());
        const uploadImage = uploadBytesResumable(imagesReference, file, metadata)

        uploadImage.on( 'state_changed',
                        (snapshot) => {},
                        (error)=>{},
                        ()=>{getDownloadURL(uploadImage.snapshot.ref).then(async(downloadURL)=>{console.log(downloadURL)})
        })

        //create instance for the db
        // const db = getDatabase();
        // const teacherReference = ref(db, 'users/')
        // onValue(teacherReference, (snapshot) => {
        //     const data = snapshot.val();
        //     snapshot.forEach( (childSnapshot) => {
        //         if( this.state.email === childSnapshot.key ){
        //             let announcement = {
        //                 title: 'B',
        //                 type: 'A',
        //                 description:'A',
        //                 imageURL:'A'
        //             }
        //             const announcementsReference = ref(db,'users/'+childSnapshot.key+'/'+'announcements/'+announcement.title)
        //             set( announcementsReference, announcement)
        //         }
        //     })
        // })
    }


    render(){
        return(
            <View style={{ flex: 1 }}>
                <View style={{flex: 0.10, flexDirection: "row", justifyContent: "space-between"}}>
                    <TouchableOpacity onPress={() => this.props.navigation.reset({index:0, routes:[{name:'Login'}]})} style={{width: 30, height: 30, marginTop:"12%", marginLeft: "3%"}}>
                            <Image source={require("../app/images/logout_blue.png")} style={{width: 30, height: 30}} resizeMode='contain'/>
                    </TouchableOpacity>
                    < Text style={{color: "#2d3a56", fontSize:19, fontFamily:'bold-font', fontWeight:'bold', marginTop: "13%"}}>ANNOUNCEMENT</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("EditProfile")} style={{width: 30, height: 30, marginTop:"12%", marginRight: "3%", marginTop:"12%"}}>
                            <Image source={require("../app/images/settings_icon_blue.png")} style={{width: 30, height: 30}} resizeMode='contain'/>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 0.15, alignItems: 'center', justifyContent: "center"}}>
                    <Image source={require("../app/images/logo_blue.png")} resizeMode='contain' style={{width: 100, height: 100}}/>
                </View>
                <View style={{flex: 0.50, justifyContent: "space-between", alignItems: "center"}}>
                        <TextInput  placeholder="Insert title" 
                                    mode="outlined" 
                                    label="*TITLE"
                                    outlineColor="#96A793"
                                    activeOutlineColor="#96A793"
                                    theme={{ roundness: 20, colors: { text: "#2d3a56", placeholder:'#2d3a56' } }}
                                    style={{fontSize:12, fontFamily:'bold-font', fontWeight:'bold', width:'55%', height:40, marginTop:"2%"}}
                        />
                        <TextInput  placeholder="Insert announcement type" 
                                    mode="outlined" 
                                    label="*TYPE"
                                    outlineColor="#96A793"
                                    activeOutlineColor="#96A793"
                                    theme={{ roundness: 20, colors: { text: "#2d3a56", placeholder:'#2d3a56' } }}
                                    style={{fontSize:12, fontFamily:'bold-font', fontWeight:'bold', width:'55%', height:40, marginTop:"-1%" }}
                        />
                         <TextInput placeholder="Insert description" 
                                    mode="outlined" 
                                    label="*DESCRIPTION"
                                    outlineColor="#96A793"
                                    activeOutlineColor="#96A793"
                                    theme={{ roundness: 20, colors: { text: "#2d3a56", placeholder:'#2d3a56'} }}
                                    style={{fontSize:12, fontFamily:'bold-font', fontWeight:'bold', width:'55%', height: 200, marginBottom: "10%"}}
                                    multiline = {true}
                        />
                </View>
                <View style={{flex: 0.20, flexDirection: "column", justifyContent: "space-between"}}>
                        <Pressable style={{backgroundColor: '#96A793', alignItems:'center', width:"50%", marginHorizontal:"25%", height:47, justifyContent:'center', borderRadius:30, marginTop: "2%"}}
                                onPress={ async()=> {
                                    const {status} = await Camera.requestCameraPermissionsAsync();
                                    if( status === 'granted' ){
                                        this.props.navigation.navigate('CameraS')
                                    }else{
                                        Alert.alert('Access denied!')
                                    }
                                }} > 
                            <Text  style={{color:'white', fontFamily:'bold-font', fontSize:17}}>UPLOAD FILE</Text>
                        </Pressable>
                        <Pressable style={{backgroundColor: '#2d3a56', alignItems:'center', width:"50%", marginHorizontal:"25%", height:47, justifyContent:'center', borderRadius:30, marginBottom: "7%"}}
                                onPress={async()=> await this.handlePostAnnouncement()} > 
                            <Text  style={{color:'white', fontFamily:'bold-font', fontSize:21, fontWeight:'bold'}}>POST</Text>
                        </Pressable>
                </View>
            </View>
        );
    }
}