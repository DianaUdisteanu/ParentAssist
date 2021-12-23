import React from 'react';
import {View, TouchableOpacity, Text, Image, SafeAreaView} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import StudentCard from '../components/student-card';
import { getDatabase, ref, onValue} from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';

const dummyDataStudents = []

export default class Students extends React.Component{
    constructor(){
        super();
        this.state = {
            personalEmail : "",
            
        };
    }

    componentDidMount() {
        this.handleGetEmail();
        this.handleGetStudents();
        console.log(dummyDataStudents);
    }

    handleGetEmail = async() =>{
        try{
            const value = await AsyncStorage.getItem("email");
            if(value !== null) {
                this.setState({personalEmail : value});
            }
        }catch(e){}
    }

    handleGetStudents = () =>{
        let count = 0;
        const db = getDatabase();
        const starCountRef = ref(db, '/users/' + this.state.personalEmail + '/Students');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            snapshot.forEach( (childSnapshot) => {
                const absPath = "/students/" + childSnapshot.key + "/name";
                const studentPath = ref(db, absPath);
                onValue(studentPath, (snapshot) => {
                    const dataStudent = snapshot.val();
                    count = count + 1;
                    dummyDataStudents.push({key:count,name:dataStudent, idNumber: childSnapshot.key});
                  });
            });
        });
        console.log(dummyDataStudents);
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
                                    renderItem={ ({item}) => {return <StudentCard name={item.name} navigation={this.props.navigation} id={item.idNumber}/>}}
                                    keyExtractor={ (student) => student.key }
                        />
                    </SafeAreaView>
                </View>
            </View>
        );
    }
}