import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
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

export default class Grades extends React.Component{
    constructor(){
        super();
        this.state = {
            email: "",
            
        };
    }

    componentDidMount() {
        this.handleGetEmail();
    }


    handleGetEmail = async() =>{
        try{
            const value = await AsyncStorage.getItem("email");
            if(value !== null) {
                this.setState({email : value});
            }
        }catch(e){}
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
                <View style={{flex: 0.10, flexDirection: "row", justifyContent: "space-between"}}>
                <TouchableOpacity onPress={() => this.props.navigation.reset({index:0, routes:[{name:'Login'}]})} style={{width: 30, height: 30, marginTop:"12%", marginLeft: "3%"}}>
                        <Image source={require("../app/images/logout_blue.png")} style={{width: 30, height: 30}} resizeMode='contain'/>
                </TouchableOpacity>
                < Text style={{color: "#2d3a56", fontSize:19, fontFamily:'bold-font', fontWeight:'bold', marginTop: "13%"}}>
                       GRADES
                </Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("EditProfile")} style={{width: 30, height: 30, marginTop:"12%", marginRight: "3%", marginTop:"12%"}}>
                        <Image source={require("../app/images/settings_icon_blue.png")} style={{width: 30, height: 30}} resizeMode='contain'/>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 0.9}}>
                <Text style={{color: "#96A793", fontSize:18, fontFamily:'bold-font', fontWeight:'bold', marginTop: "17%", marginLeft:"5%", marginBottom:"4%"}}>
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
            </View>
            </View>
        );
    }
}