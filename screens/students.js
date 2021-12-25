import React from 'react';
import {View, TouchableOpacity, Text, Image, SafeAreaView} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import StudentCard from '../components/student-card';
import { getDatabase, ref, onValue} from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Students extends React.Component{
    constructor(){
        super();
        this.state = {
            personalEmail : "",
            dummyDataStudents: []
        };
    }

    async componentDidMount() {
        await this.handleGetEmail();
        await this.handleGetStudents();
    }

    handleGetEmail = async() =>{
        try{
            const value = await AsyncStorage.getItem("email");
            if(value !== null) {
                this.setState({personalEmail : value});
            }
        }catch(e){}
    }

    handleGetStudents = async() =>{
        let count = 0;
        const db = getDatabase();
        const starCountRef = ref(db, '/users/' + this.state.personalEmail + '/Students');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            let tempArray = []
            let parentUser = ""
            snapshot.forEach( (childSnapshot) => {
                const pPath = ref(db, '/users/' + this.state.personalEmail + '/Students/' + childSnapshot.key + '/Parent');
                onValue(pPath, (snapshot) => {
                    parentUser = snapshot.val();
                });
                const absPath = "/students/" + childSnapshot.key + "/name";
                const studentPath = ref(db, absPath);
                onValue(studentPath, (snapshot) => {
                    let dataStudent = snapshot.val();
                    count = count + 1;
                    tempArray.push({key:count,name:dataStudent, idNumber: childSnapshot.key, parentMail: parentUser});
                    this.setState({dummyDataStudents:tempArray});
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
                    < Text style={{color: "#2d3a56", fontSize:19, fontFamily:'bold-font', fontWeight:'bold', marginTop: "13%"}}>STUDENTS</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("EditProfile")} style={{width: 30, height: 30, marginTop:"12%", marginRight: "3%", marginTop:"12%"}}>
                            <Image source={require("../app/images/settings_icon_blue.png")} style={{width: 30, height: 30}} resizeMode='contain'/>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.9, marginTop:"10%" }}>
                    <SafeAreaView style={{}}>
                        <FlatList   data={this.state.dummyDataStudents }
                                    renderItem={ ({item}) => {return <StudentCard name={item.name} navigation={this.props.navigation} id={item.idNumber} parent={item.parentMail}/>}}
                                    keyExtractor={ (student) => student.key.toString() }
                        />
                    </SafeAreaView>
                </View>
            </View>
        );
    }
}