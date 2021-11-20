import React from 'react';
import {View, TouchableOpacity, Text, Image, SafeAreaView} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import StudentCard from '../components/student-card';

const dummyDataStudents = [
    {
        key:1,
        name:"Sofran Sebastian"
    },
    {
        key:2,
        name:"Sofran Sebastian"
    },
    {
        key:3,
        name:"Sofran Sebastian"
    },
    {
        key:4,
        name:"Sofran Sebastian"
    },
    {
        key:5,
        name:"Sofran Sebastian"
    },
    {
        key:6,
        name:"Sofran Sebastian"
    },
    {
        key:7,
        name:"Sofran Sebastian"
    },
    {
        key:8,
        name:"Sofran Sebastian"
    },
    {
        key:9,
        name:"Sofran Sebastian"
    },
    {
        key:10,
        name:"Sofran Sebastian"
    },
    {
        key:11,
        name:"Sofran Sebastian"
    },
    {
        key:12,
        name:"Sofran Sebastian"
    },
    {
        key:13,
        name:"Sofran Sebastian"
    },
    {
        key:14,
        name:"Sofran Sebastian"
    },
    {
        key:15,
        name:"Sofran Sebastian"
    },
    {
        key:16,
        name:"Sofran Sebastian"
    },
    {
        key:17,
        name:"Sofran Sebastian"
    },
    {
        key:18,
        name:"Sofran Sebastian"
    },
    {
        key:19,
        name:"Sofran Sebastian"
    },
    {
        key:20,
        name:"Sofran Sebastian"
    },
]


export default class Students extends React.Component{
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
                    < Text style={{color: "#2d3a56", fontSize:19, fontFamily:'bold-font', fontWeight:'bold', marginTop: "13%"}}>STUDENTS</Text>
                    <TouchableOpacity style={{width: 30, height: 30, marginTop:"12%", marginRight: "3%", marginTop:"12%"}}>
                            <Image source={require("../app/images/settings_icon_blue.png")} style={{width: 30, height: 30}} resizeMode='contain'/>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.9, marginTop:"10%" }}>
                    <SafeAreaView style={{}}>
                        <FlatList   data={ dummyDataStudents }
                                    renderItem={ ({item}) => {return <StudentCard name={item.name}/>}}
                                    keyExtractor={ (student) => student.key }
                        />
                    </SafeAreaView>
                </View>
            </View>
        );
    }
}