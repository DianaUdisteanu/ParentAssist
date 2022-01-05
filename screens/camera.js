import React from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Camera } from 'expo-camera';

export default class CameraS extends React.Component {
    constructor() {
        super();
        this.camera = null;
        this.state = {};
    }

    snap = async () => {
        let options={
            base64:true
        }
        if (this.camera) {
          let photo = await this.camera.takePictureAsync(options);
          this.props.navigation.navigate("ConfirmImage",{image:photo})  
        }
      };

    render() {
        return(                     
                <Camera     type={this.state.cameraType}
                            style={{flex: 1,width:"100%", height:'100%'}}
                            ratio='16:9'
                            ref={ref => {
                                this.camera = ref;
                            }}
                            flashMode={this.state.isFlashOn}
                >
                    <View style={{position:'absolute', bottom:41, marginHorizontal:"40%", alignItems:'center', justifyContent:'center'}}> 
                            <IconButton icon="camera"
                                        size={40}
                                        color="white"
                                        style={{backgroundColor:"#2d3a56"}}
                                        onPress={async() => await this.snap()}
                            />
                    </View>
                    <View style={{position:'absolute', top:'7%', left:'5%', alignItems:'center', justifyContent:'center'}}> 
                            <IconButton icon="chevron-left"
                                        size={30}
                                        color="white"
                                        style={{backgroundColor:"#262731"}}
                                        onPress={() => this.props.navigation.navigate('Announcement')}
                            />
                    </View>
                </Camera>
        )
    }
}