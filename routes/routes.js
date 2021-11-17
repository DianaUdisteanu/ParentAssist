import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/login';
import Announcement from '../screens/announcement';

const Stack = createStackNavigator();
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
                <Stack.Screen name="Announcement"
                              component={Announcement}
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