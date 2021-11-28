import React from 'react';
import {View, TouchableOpacity, Text, Image, Pressable} from 'react-native';
import GradesObject from '../components/grades-object';

const DataGrades = [
    {
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
    }
]

export default class ParentDetails extends React.Component{
    constructor(){
        super();
        this.state = {
        };
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
                                <GradesObject name={DataGrades[0].name} gradeOne={DataGrades[0].gradeOne} gradeTwo={DataGrades[0].gradeTwo} gradeThree={DataGrades[0].gradeThree} />
                            </View>
                            <View style={{flex: 0.33, width:"100%"}}>
                                <GradesObject name={DataGrades[1].name} gradeOne={DataGrades[1].gradeOne} gradeTwo={DataGrades[1].gradeTwo} gradeThree={DataGrades[1].gradeThree} />
                            </View>
                            <View style={{flex: 0.33, width:"100%"}}>
                                <GradesObject name={DataGrades[2].name} gradeOne={DataGrades[2].gradeOne} gradeTwo={DataGrades[2].gradeTwo} gradeThree={DataGrades[2].gradeThree} />
                            </View>
                        </View>
                        <View style={{flexDirection: 'column', alignItems:'center' , flex: 0.5}}>
                            <View style={{flex: 0.33, width:"100%"}}>
                                <GradesObject name={DataGrades[3].name} gradeOne={DataGrades[3].gradeOne} gradeTwo={DataGrades[3].gradeTwo} gradeThree={DataGrades[3].gradeThree} />
                            </View>
                            <View style={{flex: 0.33, width:"100%"}}>
                                <GradesObject name={DataGrades[4].name} gradeOne={DataGrades[4].gradeOne} gradeTwo={DataGrades[4].gradeTwo} gradeThree={DataGrades[4].gradeThree} />
                            </View>
                            <View style={{flex: 0.33, width:"100%"}}>
                                <GradesObject name={DataGrades[5].name} gradeOne={DataGrades[5].gradeOne} gradeTwo={DataGrades[5].gradeTwo} gradeThree={DataGrades[5].gradeThree} />
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