import React from 'react';
import {View, TouchableOpacity, Text, Image, SafeAreaView} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AnnouncementPosted from '../components/announcement_posted';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, ref, onValue} from "firebase/database";


export default class ParentPosts extends React.Component{
    constructor(){
        super();
        this.state = {
            email: "",
            DataPosts :[]
        };
    }

    async componentDidMount() {
        await this.handleGetEmail();
        this.handleGetPosts();
    }

    handleGetEmail = async() =>{
        try{
            const value = await AsyncStorage.getItem("email");
            if(value !== null) {
                this.setState({email : value});
            }
        }catch(e){}
    }

    handleGetPosts = () => {
        let count = 0;
        const db = getDatabase();
        const absPath = "/users/" + this.props.route.params.parentAccount + '/announcements';
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
    }

    render(){
        return(
        <View style={{ flex: 1 }}>
            <View style={{flex: 0.10, flexDirection: "row", justifyContent: "space-between"}}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{width: 30, height: 30, marginTop:"12%", marginLeft: "3%"}}>
                        <Image source={require("../app/images/back_arrow_blue.png")} style={{width: 30, height: 30}} resizeMode='contain'/>
                </TouchableOpacity>
                < Text style={{color: "#2d3a56", fontSize:19, fontFamily:'bold-font', fontWeight:'bold', marginTop: "13%"}}>
                        PARENT POSTS
                </Text>
                <View style={{flex:0.2}}></View>
            </View>
            <View style={{flex:0.05, flexDirection:'column', alignItems:'center'}}>
                    <Text style={{color: "#2d3a56", fontSize:15, fontFamily:'bold-font', fontWeight:'bold'}}>{this.props.route.params.parentFullName.toUpperCase()}</Text>
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