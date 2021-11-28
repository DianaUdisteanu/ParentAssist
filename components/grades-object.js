import React from 'react';
import {View, Text} from 'react-native';

export default class GradesObject extends React.Component{
    constructor(){
        super();
        this.state = {};
    };

    render(){
        return(
            <View style={{ width:"100%", marginTop:"7%", marginHorizontal:"7%"}}>
                <Text style={{color: "#ffffff", fontFamily:'bold-font', fontSize:16}}>{this.props.name}</Text>
                { this.props.gradeOne != "" ? <View style={{flexDirection: 'row'}}><Text style={{color:"#ffffff"}}>{'\u2022 '}</Text>
                    <Text style={{color: "#ffffff", fontFamily:'normal-font', fontSize:14, marginBottom:"5%"}}>{this.props.gradeOne}</Text>
                </View> : null}
                { this.props.gradeTwo != "" ? <View style={{flexDirection: 'row'}}><Text style={{color:"#ffffff"}}>{'\u2022 '}</Text>
                    <Text style={{color: "#ffffff", fontFamily:'normal-font', fontSize:14, marginBottom:"5%"}}>{this.props.gradeTwo}</Text>
                </View> : null}
                { this.props.gradeThree != "" ? <View style={{flexDirection: 'row'}}><Text style={{color:"#ffffff"}}>{'\u2022 '}</Text>
                    <Text style={{color: "#ffffff", fontFamily:'normal-font', fontSize:14, marginBottom:"5%"}}>{this.props.gradeThree}</Text>
                </View> :null }
            </View>
        );
    }
}