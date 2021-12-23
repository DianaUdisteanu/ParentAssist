import React from 'react';
import { Image, Text } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Login from '../screens/login';
import Announcement from '../screens/announcement';
import Students from '../screens/students';
import CreateParentAccount from '../screens/create_account';
import EditProfile from '../screens/edit_profile';
import ChangePassword from '../screens/change_password';
import ParentReply from '../screens/parent_reply';
import TeacherPosts from '../screens/teacher_posts';
import Grades from '../screens/grades';
import ParentDetails from '../screens/parent_details';
import ParentPosts from '../screens/parent_posts';
import SetupPassword from '../screens/setup_password';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function viewScreens(){
    return(
        <Tab.Navigator barStyle={{backgroundColor: "#2d3a56", borderRadius: 20, overflow: 'hidden', marginBottom: 30, height: 50, marginHorizontal: 15, alignContent:'center'}}>
            <Tab.Screen name="Announcement"
                        component={Announcement}
                        options={({navigation}) => ({
                            tabBarIcon: ({focused}) => {return <Image source={focused ? require("../app/images/announcement_green.png") : require("../app/images/announcement_white.png")} style={{width: 30, height: 30}} resizeMode='contain'/>},
                            tabBarLabel: <Text></Text>
                        })}
            />
            <Tab.Screen name="Students"
                        component={Students}
                        options={({navigation}) => ({
                            tabBarIcon: ({focused}) => {return <Image source={focused ? require("../app/images/students_green.png") : require("../app/images/students_white.png") } style={{width: 30, height: 30}} resizeMode='contain'/>},
                            tabBarLabel: <Text></Text>
                        })}
            />
            <Tab.Screen name="CreateParentAccount"
                        component={CreateParentAccount}
                        options={({navigation}) => ({
                            tabBarIcon: ({focused}) => {return <Image source={focused ? require("../app/images/create_parent_account_green.png") : require("../app/images/create_parent_account_white.png")} style={{width: 30, height: 30}} resizeMode='contain'/>},
                            tabBarLabel: <Text></Text>
                        })}
            />
        </Tab.Navigator>
    );
}


function viewParentScreens(){
    return(
        <Tab.Navigator barStyle={{backgroundColor: "#2d3a56", borderRadius: 20, overflow: 'hidden', marginBottom: 30, height: 50, marginHorizontal: 15, alignContent:'center'}}>
            <Tab.Screen name="ParentReply"
                        component={ParentReply}
                        options={({navigation}) => ({
                            tabBarIcon: ({focused}) => {return <Image source={focused ? require("../app/images/announcement_green.png") : require("../app/images/announcement_white.png")} style={{width: 30, height: 30}} resizeMode='contain'/>},
                            tabBarLabel: <Text></Text>
                        })}
            />
            <Tab.Screen name="TeacherPosts"
                        component={TeacherPosts}
                        options={({navigation}) => ({
                            tabBarIcon: ({focused}) => {return <Image source={focused ? require("../app/images/teacher_posts_green.png") : require("../app/images/teacher_posts_white.png") } style={{width: 30, height: 30}} resizeMode='contain'/>},
                            tabBarLabel: <Text></Text>
                        })}
            />
            <Tab.Screen name="Grades"
                        component={Grades}
                        options={({navigation}) => ({
                            tabBarIcon: ({focused}) => {return <Image source={focused ? require("../app/images/grades_green.png") : require("../app/images/grades_white.png")} style={{width: 30, height: 30}} resizeMode='contain'/>},
                            tabBarLabel: <Text></Text>
                        })}
            />
        </Tab.Navigator>
    );
}


function AddIntoStack(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login"
                              component={Login}
                              options={({navigation}) => ({
                                headerShown: false,
                                gestureEnabled: false
                            })}
                />
                <Stack.Screen name="SecondScreen"
                              component={viewScreens}
                              options={({navigation}) => ({
                                headerShown: false,
                                gestureEnabled: false
                            })}
                />
                <Stack.Screen name="EditProfile"
                              component={EditProfile}
                              options={({navigation}) => ({
                                headerShown: false,
                                gestureEnabled: false
                            })}
                />
                <Stack.Screen name="ChangePassword"
                              component={ChangePassword}
                              options={({navigation}) => ({
                                headerShown: false,
                                gestureEnabled: false
                            })}
                />
                <Stack.Screen name="ThirdScreen"
                              component={viewParentScreens}
                              options={({navigation}) => ({
                                headerShown: false,
                                gestureEnabled: false
                            })}
                />
                <Stack.Screen name="ParentDetails"
                              component={ParentDetails}
                              options={({navigation}) => ({
                                headerShown: false,
                                gestureEnabled: false
                            })}
                />
                <Stack.Screen name="ParentPosts"
                              component={ParentPosts}
                              options={({navigation}) => ({
                                headerShown: false,
                                gestureEnabled: false
                            })}
                />
                <Stack.Screen name="SetupPassword"
                              component={SetupPassword}
                              options={({navigation}) => ({
                                headerShown: false,
                                gestureEnabled: false
                            })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AddIntoStack;