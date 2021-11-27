import React from 'react';
import {View, Text, Image, Greeting} from 'react-native';

export default class AnnouncementPosted extends React.Component{
    constructor(){
        super();
        this.state = {};
    };

    render(){
        return(
            <View style={{margin:'10%'}}>
                <Text style={{color:"#96A793", fontFamily:'bold-font', fontSize:17, marginBottom:"5%"}}>{this.props.title}</Text>
                    <View style={{backgroundColor: '#96A793',justifyContent: 'space-around', borderRadius:30}}>
                        {this.props.imageSRC != ""  ? 
                            <View>
                                <Text style={{margin: "5%", marginTop: "5%", color:'white', fontFamily:'bold-font', fontSize:17, textAlign: 'justify'}}>Image</Text>
                                <View  style={{alignItems:'center'}}>
                                    <Image source={require("../app/images/adev.png")} style={{width: "90%", height: undefined, aspectRatio : 1}} resizeMode='contain'/>
                                </View>
                            </View> : null
                        }
                        {
                            this.props.description != "" ?
                            <View>
                                <Text style={{margin: "5%", color:'white', fontFamily:'bold-font', fontSize:17, textAlign: 'justify'}}>Description</Text>
                                <Text style={{margin: "5%", color:'white', fontFamily:'normal-font', fontSize:15, textAlign: 'justify'}}>{this.props.description}</Text>
                            </View> : null
                        }
                    </View>
            </View>
        );
    }
}