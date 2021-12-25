import React from 'react';
import {View, TouchableOpacity, Text, Image, Pressable} from 'react-native';
import GradesObject from '../components/grades-object';
import { getDatabase, ref, onValue} from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class ParentDetails extends React.Component{
    constructor(){
        super();
        this.DataGrades = [{
            key:1,
            name:"MATHEMATICS",
            gradeOne:"10 / 29.11.2021",
            gradeTwo:"8 / 6.12.2021",
            gradeThree:"4 / 5.5.2021"
            
        },
        {
            key:2,
            name:"HISTORY",
            gradeOne:"10 / 29.11.2021",
            gradeTwo:"8 / 6.12.2021",
            gradeThree:"4 / 5.5.2021"
        },
        {
            key:3,
            name:"GEOGRAPHY",
            gradeOne:"10 / 29.11.2021",
            gradeTwo:"8 / 6.12.2021",
            gradeThree:"4 / 5.5.2021",
        },{
            key:4,
            name:"ART",
            gradeOne:"10 / 29.11.2021",
            gradeTwo:"",
            gradeThree:""
        },
        {
            key:5,
            name:"BIOLOGY",
            gradeOne:"10 / 29.11.2021",
            gradeTwo:"8 / 6.12.2021",
            gradeThree:""
        },
        {
            key:6,
            name:"CHEMISTRY",
            gradeOne:"",
            gradeTwo:"",
            gradeThree:""
        }]
        this.state = {
            personalEmail: ""
        };
    }

    async componentDidMount() {
        await this.handleGetEmail();
        await this.handleGetGrades();
    }

    handleGetEmail = async() =>{
        try{
            const value = await AsyncStorage.getItem("email");
            if(value !== null) {
                this.setState({personalEmail : value});
            }
        }catch(e){}
    }

    handleGetGrades = async() =>{
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
                    let dataStudent = snapshot.val();
                    let objGrade = {}
                    objGrade.name = snapshot.key;
                    let countGrade = 1;
                    count = count + 1;
                    snapshot.forEach( (childSnapshot2) => {
                        const pathGrade = absPath + '/' + childSnapshot2.key;
                        if (countGrade === 1) objGrade.gradeOne = childSnapshot2.val();
                        else if (countGrade === 2) objGrade.gradeTwo = childSnapshot2.val();
                        else objGrade.gradeThree = childSnapshot2.val();
                        countGrade = countGrade + 1;
                    })
                    objGrade.key = count;
                    tempArray.push(objGrade);
                    //this.DataGrades = tempArray;
                });
            });
        });
        console.log(this.DataGrades);
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
                <View style={{flex: 0.1, flexDirection: "row", justifyContent:'space-between'}}>
                    <TouchableOpacity onPress={this.handleGetGrades} style={{width: 30, height: 30, marginTop:"12%", marginLeft: "7%"}}>
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
                                <GradesObject name={this.DataGrades[0].name} gradeOne={this.DataGrades[0].gradeOne} gradeTwo={this.DataGrades[0].gradeTwo} gradeThree={this.DataGrades[0].gradeThree} />
                            </View>
                            <View style={{flex: 0.33, width:"100%"}}>
                                <GradesObject name={this.DataGrades[1].name} gradeOne={this.DataGrades[1].gradeOne} gradeTwo={this.DataGrades[1].gradeTwo} gradeThree={this.DataGrades[1].gradeThree} />
                            </View>
                            <View style={{flex: 0.33, width:"100%"}}>
                                <GradesObject name={this.DataGrades[2].name} gradeOne={this.DataGrades[2].gradeOne} gradeTwo={this.DataGrades[2].gradeTwo} gradeThree={this.DataGrades[2].gradeThree} />
                            </View>
                        </View>
                        <View style={{flexDirection: 'column', alignItems:'center' , flex: 0.5}}>
                            <View style={{flex: 0.33, width:"100%"}}>
                                <GradesObject name={this.DataGrades[3].name} gradeOne={this.DataGrades[3].gradeOne} gradeTwo={this.DataGrades[3].gradeTwo} gradeThree={this.DataGrades[3].gradeThree} />
                            </View>
                            <View style={{flex: 0.33, width:"100%"}}>
                                <GradesObject name={this.DataGrades[4].name} gradeOne={this.DataGrades[4].gradeOne} gradeTwo={this.DataGrades[4].gradeTwo} gradeThree={this.DataGrades[4].gradeThree} />
                            </View>
                            <View style={{flex: 0.33, width:"100%"}}>
                                <GradesObject name={this.DataGrades[5].name} gradeOne={this.DataGrades[5].gradeOne} gradeTwo={this.DataGrades[5].gradeTwo} gradeThree={this.DataGrades[5].gradeThree} />
                            </View>    
                        </View>
                    </View>
                    <View style={{flex:0.4, marginTop:"4%"}}>
                        <Text style={{color: "#96A793", fontSize:18, fontFamily:'bold-font', fontWeight:'bold', marginLeft:"5%", marginBottom:"4%"}}>
                            PARENT DETAILS
                        </Text>
                        <View style={{backgroundColor:"#96A793",width:"90%", borderRadius:30, marginHorizontal:"5%", height:"75%", justifyContent:'space-around'}}>
                                <View style={{flexDirection:'column', marginHorizontal:"7%"}}>
                                    <Text style={{color: "white", fontSize:14, fontFamily:'bold-font'}}>NAME</Text>
                                    <Text style={{color: "white", fontSize:14, fontFamily:'normal-font'}}>Sofran Sebastian2</Text>
                                </View>
                                <View style={{flexDirection:'column', marginHorizontal:"7%"}}>
                                    <Text style={{color: "white", fontSize:14, fontFamily:'bold-font'}}>EMAIL</Text>
                                    <Text style={{color: "white", fontSize:14, fontFamily:'normal-font'}}>sebastiansofran@yahoo.com</Text>
                                </View>
                                <View style={{flexDirection:'column', marginHorizontal:"7%"}}>
                                    <Text style={{color: "white", fontSize:14, fontFamily:'bold-font'}}>PHONE</Text>
                                    <Text style={{color: "white", fontSize:14, fontFamily:'normal-font'}}>0729 580 659</Text>
                                </View>
                        </View>
                    </View>
                </View>
                <View style={{flex:0.15}}>
                       <Pressable style={{backgroundColor: '#96A793', alignItems:'center', width:"55%", marginHorizontal:"25%", height:47, justifyContent:'center', borderRadius:30, marginTop: "2%"}}
                                onPress={()=> this.props.navigation.navigate("ParentPosts")} > 
                            <Text  style={{color:'white', fontFamily:'bold-font', fontSize:16}}>PARENT POSTS</Text>
                        </Pressable>
                </View>
            </View>
        );
    }
}