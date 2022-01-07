import React from 'react';
import {View, TouchableOpacity, Text, Image, SafeAreaView} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AnnouncementPosted from '../components/announcement_posted';
import { getDatabase, ref, onValue} from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class TeacherPosts extends React.Component{
    constructor(){
        super();
        this.state = {
            email: "",
            DataPosts: [],
        };
    }

    async componentDidMount() {
        await this.handleGetEmail();
        await this.handleGetPosts();
    }

    handleGetEmail = async() =>{
        try{
            const value = await AsyncStorage.getItem("email");
            if(value !== null) {
                this.setState({email : value});
            }
        }catch(e){}
    }

    handleGetPosts = async() => {
        let count = 0;
        const db = getDatabase();
        const starCountRef = ref(db, '/users/' + this.state.email + '/Teacher');
        onValue(starCountRef, (snapshot) => {
            const absPath = "/users/" + snapshot.val() + '/announcements';
            const studentPath = ref(db, absPath);
            onValue(studentPath, (snapshot) => {
               onValue(studentPath, (snapshot) => {
                let tempArray = []
                    snapshot.forEach( (childSnapshot2) => {
                        let countPost = 1;
                        count = count + 1;
                        const postPath = absPath + "/" + childSnapshot2.key;
                        const postPathDB = ref(db, postPath);
                        onValue( postPathDB, (snapshot) => {
                            countPost = 1;
                            let objPost = {}
                            snapshot.forEach( (childSnapshot) => {
                                if (countPost === 1) objPost.description = childSnapshot.val();
                                else if (countPost === 2) objPost.imageSRC = childSnapshot.val();
                                else if (countPost === 3) objPost.title = childSnapshot.val();
                                else objPost.type = childSnapshot.val();
                                countPost = countPost + 1;
                            });
                            objPost.key = count;
                            tempArray.push(objPost);
                        });
                    });
                    this.setState({DataPosts:tempArray});
                });
            });
        });
    }



    render(){
        return(
        <View style={{ flex: 1 }}>
            <View style={{flex: 0.10, flexDirection: "row", justifyContent: "space-between"}}>
                <TouchableOpacity onPress={() => this.props.navigation.reset({index:0, routes:[{name:'Login'}]})} style={{width: 30, height: 30, marginTop:"12%", marginLeft: "3%"}}>
                        <Image source={require("../app/images/logout_blue.png")} style={{width: 30, height: 30}} resizeMode='contain'/>
                </TouchableOpacity>
                < Text style={{color: "#2d3a56", fontSize:19, fontFamily:'bold-font', fontWeight:'bold', marginTop: "13%"}}>
                        TEACHER POSTS
                </Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("EditProfile")} style={{width: 30, height: 30, marginTop:"12%", marginRight: "3%", marginTop:"12%"}}>
                        <Image source={require("../app/images/settings_icon_blue.png")} style={{width: 30, height: 30}} resizeMode='contain'/>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 0.9}}>
                    <SafeAreaView style={{}}>
                        <FlatList   data={ this.state.DataPosts }
                                    renderItem={ ({item}) => {return <AnnouncementPosted title={item.title} hasImage={item.hasImage} imageSRC={item.imageSRC} hasDescription={item.hasDescription} description={item.description}/>}}
                                    keyExtractor={ (student) => student.key }
                        />
                    </SafeAreaView>
                </View>
        </View>
        );
    }
}