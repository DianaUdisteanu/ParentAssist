import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import GradesObject from '../components/grades-object';
import { getDatabase, ref, onValue} from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Grades extends React.Component{
    constructor(){
        super();
        this.state = {
            email: "",
            DataGrades: []
        };
    }

    async componentDidMount() {
        await this.handleGetEmail();
        this.handleGetGrades();
    }


    handleGetEmail = async() =>{
        try{
            const value = await AsyncStorage.getItem("email");
            if(value !== null) {
                this.setState({email : value});
            }
        }catch(e){}
    }

    handleGetGrades = () =>{
        let count = 0;
        const db = getDatabase();
        const referinta = ref(db, '/users/' + this.state.email + '/IDnumber');
        onValue(referinta, (snapshot) => {
            const idStudent = snapshot.val();
            const starCountRef = ref(db, '/students/' + idStudent + '/grades');
            onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            let tempArray = []
            snapshot.forEach( (childSnapshot) => {
                const absPath = "/students/" + idStudent + '/grades/' + childSnapshot.key;
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
        })
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
            </View>
            </View>
        );
    }
}