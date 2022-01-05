import React from 'react';
import { View, Image } from 'react-native';
import { IconButton } from 'react-native-paper';

export default class ConfirmImage extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return(                     
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                    <Image 
                        source={{uri:this.props.route.params.image.uri}}
                        style={{width:'100%', height:'100%'}}
                    />
                </View>
                <View style={{position:'absolute', top:'7%', left:'5%', alignItems:'center', justifyContent:'center'}}> 
                            <IconButton icon="close"
                                        size={30}
                                        color="white"
                                        style={{backgroundColor:"#262731"}}
                                        onPress={() => this.props.navigation.navigate('CameraS')}
                            />
                </View>
                <View style={{position:'absolute', top:'7%', right:'5%', alignItems:'center', justifyContent:'center'}}> 
                            <IconButton icon="check"
                                        size={30}
                                        color="white"
                                        style={{backgroundColor:"#262731"}}
                                        onPress={() => this.props.navigation.navigate('Announcement',{image:this.props.route.params.image})}
                            />
                </View>
            </View>
        )
    }
}