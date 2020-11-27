import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppLoading } from "expo";
import Navigation from "./components/Navigation";

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function f() {
      await Expo.Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
      });
    }
    
    f().then(()=>setLoading(false)).catch(err=>{
      console.error(err)
      setLoading(false)
    })
  })

  if (loading) {
    return <AppLoading />;
  }

  return <Navigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
