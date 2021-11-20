import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';

export default class EditProfile extends React.Component{
    constructor(){
        super();
        this.state = {
        };
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
                <View style={{flex: 0.10, flexDirection: "row", justifyContent: "space-between"}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Announcement")} style={{flex: 0.33, width: 30, height: 30, marginTop:"12%", marginLeft: "3%"}}>
                            <Image source={require("../app/images/logout_blue.png")} style={{width: 30, height: 30}} resizeMode='contain'/>
                    </TouchableOpacity>
                    < Text style={{color: "#2d3a56", fontSize:19, fontFamily:'bold-font', fontWeight:'bold', marginTop: "13%", flex: 0.65, textAlign:'left'}}>EDIT PROFILE</Text>
                </View>
                <View style={{flex: 0.15, backgroundColor: "#cc0000"}}>
                    
                </View>
                <View style={{flex: 0.50, backgroundColor: "#595959"}}>
                    
                </View>
                <View style={{flex: 0.20, marginBottom:"5%", backgroundColor: "#cc0000"}}>
                    
                </View>
            </View>
        );
    }
}