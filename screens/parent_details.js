import React from 'react';
import {View, TouchableOpacity, Text, Image, Pressable} from 'react-native';
import GradesObject from '../components/grades-object';
import { getDatabase, ref, onValue} from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class ParentDetails extends React.Component{
    constructor(){
        super();
        this.state = {
            personalEmail: "",
            DataGrades: [],
            parentName: "",
            parentPhone: ""
        };
    }

    async componentDidMount() {
        await this.handleGetEmail();
        this.handleGetGrades();
        this.handleGetParentDetails();
    }

    handleGetEmail = async() =>{
        try{
            const value = await AsyncStorage.getItem("email");
            if(value !== null) {
                this.setState({personalEmail : value});
            }
        }catch(e){}
    }

    handleGetGrades = () =>{
        let count = 0;
        const db = getDatabase();
        const starCountRef = ref(db, '/students/' + this.props.route.params.id + '/grades');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            let tempArray = []
            snapshot.forEach( (childSnapshot) => {
                const absPath = "/students/" + this.props.route.params.id + '/grades/' + childSnapshot.key;
                const studentPath = ref(db, absPath);
                onValue(studentPath, (snapshot) => {
                    let objGrade = {}
                    objGrade.name = snapshot.key;
                    let countGrade = 1;
                    count = count + 1;
                    snapshot.forEach( (childSnapshot2) => {
                        if (countGrade === 1) objGrade.gradeOne = childSnapshot2.val();
                        else if (countGrade === 2) objGrade.gradeTwo = childSnapshot2.val();
                        else objGrade.gradeThree = childSnapshot2.val();
                        countGrade = countGrade + 1;
                    })
                    objGrade.key = count;
                    tempArray.push(objGrade);
                });
            });
            this.setState({DataGrades:tempArray});
        });
    }

    handleGetParentDetails = () => {
        const db = getDatabase();
        const starCountRef = ref(db, '/users/' + this.props.route.params.parent + '/Name');
        onValue(starCountRef, (snapshot)=> {
            this.setState({parentName: snapshot.val()});
        })
        const starCountRef2 = ref(db, '/users/' + this.props.route.params.parent + '/Phone');
        onValue(starCountRef2, (snapshot)=> {
            this.setState({parentPhone: snapshot.val()});
        })
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
                <View style={{flex: 0.1, flexDirection: "row", justifyContent:'space-between'}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Students")} style={{width: 30, height: 30, marginTop:"12%", marginLeft: "7%"}}>
                            <Image source={require("../app/images/back_arrow_blue.png")} style={{width: 30, height: 30}} resizeMode='contain'/>
                    </TouchableOpacity>
                    < Text style={{color: "#2d3a56", fontSize:19, fontFamily:'bold-font', fontWeight:'bold', marginTop: "13%", textAlign:'center'}}>
                        {this.props.route.params.screenTitle.toUpperCase()}
                    </Text>
                    <View style={{flex:0.3}}>
                    </View>
                </View>
                <View style={{flex:0.05, flexDirection:'column', alignItems:'center'}}>
                    <Text style={{color: "#2d3a56", fontSize:19, fontFamily:'bold-font', fontWeight:'bold'}}>ID NUMBER</Text>
                    <Text style={{color: "#2d3a56", fontSize:17, fontFamily:'normal-font'}}>{this.props.route.params.id}</Text>
                </View>
                <View style={{ flex: 0.7}}>
                    <Text style={{color: "#96A793", fontSize:18, fontFamily:'bold-font', fontWeight:'bold', marginLeft:"5%", marginBottom:"4%"}}>
                        GRADES
                    </Text>
                    <View style={{backgroundColor:"#96A793",width:"90%", borderRadius:30, flexDirection: 'row', alignContent:'center',marginHorizontal:"5%", flex:0.6}}>
                        <View style={{flexDirection: 'column', alignItems:'center', flex: 0.5}}>
                            <View style={{flex: 0.33 , width:"100%"}}>
                                { this.state.DataGrades.map(  (item) => {
                                        if( item.key <= 3){ 
                                            return(
                                                <GradesObject  name={item.name} 
                                                                gradeOne={item.gradeOne} 
                                                                gradeTwo={item.gradeTwo} 
                                                                gradeThree={item.gradeThree} 
                                                                key={item.key}
                                                />
                                            )
                                        }
                                    }
                                )}
                            </View>
                        </View>
                        <View style={{flexDirection: 'column', alignItems:'center', flex: 0.5}}>
                            <View style={{flex: 0.33 , width:"100%"}}>
                                { this.state.DataGrades.map(  (item) => {
                                        if( item.key > 3){ 
                                            return(
                                                <GradesObject  name={item.name} 
                                                                gradeOne={item.gradeOne} 
                                                                gradeTwo={item.gradeTwo} 
                                                                gradeThree={item.gradeThree} 
                                                                key={item.key}
                                                />
                                            )
                                        }
                                    }
                                )}
                            </View>
                        </View>
                    </View>
                    <View style={{flex:0.4, marginTop:"10%"}}>
                        <Text style={{color: "#96A793", fontSize:18, fontFamily:'bold-font', fontWeight:'bold', marginLeft:"5%", marginBottom:"4%"}}>
                            PARENT DETAILS
                        </Text>
                        <View style={{backgroundColor:"#96A793",width:"90%", borderRadius:30, marginHorizontal:"5%", height:"50%", justifyContent:'space-around'}}>
                                <View style={{flexDirection:'column', marginHorizontal:"7%"}}>
                                    <Text style={{color: "white", fontSize:14, fontFamily:'bold-font'}}>NAME</Text>
                                    <Text style={{color: "white", fontSize:14, fontFamily:'normal-font'}}>{this.state.parentName}</Text>
                                </View>
                                <View style={{flexDirection:'column', marginHorizontal:"7%"}}>
                                    <Text style={{color: "white", fontSize:14, fontFamily:'bold-font'}}>PHONE</Text>
                                    <Text style={{color: "white", fontSize:14, fontFamily:'normal-font'}}>{this.state.parentPhone}</Text>
                                </View>
                        </View>
                    </View>
                </View>
                <View style={{flex:0.15}}>
                       <Pressable style={{backgroundColor: '#96A793', alignItems:'center', width:"55%", marginHorizontal:"25%", height:47, justifyContent:'center', borderRadius:30, marginTop: "2%"}}
                                onPress={()=> this.props.navigation.navigate("ParentPosts", {parentAccount: this.props.route.params.parent, parentFullName: this.state.parentName})} > 
                            <Text  style={{color:'white', fontFamily:'bold-font', fontSize:16}}>PARENT POSTS</Text>
                        </Pressable>
                </View>
            </View>
        );
    }
}