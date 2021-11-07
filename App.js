import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppLoading from "expo-app-loading";

import * as firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBvfkr3uTshApCveGyykcvrnNC7fUDWWn0",
  authDomain: "parentassist-cf18e.firebaseapp.com",
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

    };
  }

  async componentDidMount(){
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  render(){
      return(
        <AppLoading/>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});