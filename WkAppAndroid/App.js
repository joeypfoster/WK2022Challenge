import { StyleSheet} from 'react-native';
import React, {useEffect} from "react";
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Search from "./Search";
import Info from "./Info";
import { loadapi } from './LoadApi';

const Stack = createNativeStackNavigator();
const loadAPI = loadapi();

import Home from "./Home";

export default function App({navigation}) {
    let startscreen = 'Search';
    // console.disableYellowBox = true;
    loadAPI;

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName={startscreen} >
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="Search" component={Search}/>
          <Stack.Screen name="Info" component={Info}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
