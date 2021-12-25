import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';

export default class StudentCard extends React.Component{
    constructor(){
        super();
        this.state = {};
    };
    render(){
        return(
            <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'space-around', backgroundColor: '#96A793', width:"85%", height:55, borderRadius:30, marginHorizontal: 35, marginVertical: 10}}>
                <View style={{}}>
                    <Image source={require("../app/images/student_card_icon_white.png")} style={{width: 25, height: 25}} resizeMode='contain'/>
                </View> 
                <View style={{flexDirection: 'column', flex:0.8, textAlign: 'left', width:"100%"}}>
                    <Text  style={{color:'white', fontFamily:'bold-font', fontSize:15}}>NAME</Text>
                    <Text  style={{color:'white', fontFamily:'bold-font', fontSize:16}}>{this.props.name}</Text>
                </View>
                <View>
                    <Pressable onPress={()=>this.props.navigation.navigate("ParentDetails", {screenTitle: this.props.name, id: this.props.id, parent: this.props.parent})}>
                        <Image source={require("../app/images/arrow_right_white.png")} style={{width: 18, height: 18}} resizeMode='contain'/>
                    </Pressable> 
                </View>                   
            </View>
        );
    }
}