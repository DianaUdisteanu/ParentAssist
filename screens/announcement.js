import React from 'react';
import {View, Text} from 'react-native';

export default class Announcement extends React.Component{
    constructor(){
        super();
        this.state = {
        };
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
                <Text>Announcement</Text>
            </View>
        );
    }
}