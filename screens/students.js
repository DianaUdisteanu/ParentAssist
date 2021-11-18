import React from 'react';
import {View, TouchableOpacity, Text, Image, SafeAreaView} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import StudentCard from '../components/student-card';

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
                <View style={{ flex: 0.80 }}>
                    <SafeAreaView>
                        <FlatList
                        />
                    </SafeAreaView>
                </View>
            </View>
        );
    }
}