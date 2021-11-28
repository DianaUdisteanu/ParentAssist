import React from 'react';

import AddIntoStack from './routes/routes';
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import { initializeApp } from 'firebase/app';

const fontConfig = {
  "light-font": require("./fonts/Roboto-Light.ttf"),
  "normal-font": require("./fonts/Roboto-Regular.ttf"),
  "bold-font": require("./fonts/Roboto-Bold.ttf")
};

const firebaseConfig = {
  apiKey: "AIzaSyBvfkr3uTshApCveGyykcvrnNC7fUDWWn0",
  authDomain: "parentassist-cf18e.firebaseapp.com",
  databaseURL: "https://parentassist-cf18e-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "parentassist-cf18e",
  storageBucket: "parentassist-cf18e.appspot.com",
  messagingSenderId: "55989927625",
  appId: "1:55989927625:web:1b0eae0e8d92097e97d718",
  measurementId: "G-TFP1PNP7WB"
};
export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      fontsLoaded: false
    };
  }

  async loadFonts(){
    await Font.loadAsync(fontConfig)
    this.setState({fontsLoaded:true})
  }

  async componentDidMount(){
    this.loadFonts();
    initializeApp(firebaseConfig)
  }

  render(){
    if(this.state.fontsLoaded){
      return(
        <AddIntoStack/>
      );
    }
    else{
      return(
        <AppLoading/>
      );
    }
  }
}