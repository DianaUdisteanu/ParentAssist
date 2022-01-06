import React from 'react';
import { View, Image } from 'react-native';
import { IconButton } from 'react-native-paper';
import TouchHistoryMath from 'react-native/Libraries/Interaction/TouchHistoryMath';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, ref, onValue} from "firebase/database";
export default class ConfirmImage extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            role: ""
        };
    }

    async componentDidMount() {
       await this.handleGetEmail();
       this.handleGetRole();
    }


    handleGetEmail = async() =>{
        try{
            const value = await AsyncStorage.getItem("email");
            if(value !== null) {
                this.setState({email : value});
            }
        }catch(e){}
    }

    handleGetRole = () => {
        const db = getDatabase();
        const starCountRef = ref(db, '/users/' + this.state.email + '/Role');
        onValue(starCountRef, (snapshot)=> {
            this.setState({role: snapshot.val()});
        })
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
                                        onPress={() =>  {
                                                        this.state.role === "Parent" ?
                                                            this.props.navigation.navigate("ThirdScreen",
                                                            {
                                                            screen:'ParentReply',
                                                            params: {
                                                                imageURI: this.props.route.params.image.uri
                                                            }   
                                                            }) : this.state.role === "Teacher" ?  this.props.navigation.navigate("SecondScreen",
                                                            {
                                                            screen:'Announcement',
                                                            params: {
                                                                imageURI: this.props.route.params.image.uri
                                                            }   
                                                            }) : null}
                                        }
                            />
                </View>
            </View>
        )
    }
}