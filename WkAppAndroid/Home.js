import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useEffect, useState} from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

const WK = require('./Api')
const api = new WK();



const Home = ({navigation}) => {

  //useEffect(() => {
    // AsyncStorage.getItem('teams', (err, result) => {
    //   const r = JSON.parse(result);
    //   console.log(r)
    // });
    // AsyncStorage.getItem('matches', (err, result) => {
    //   const r = JSON.parse(result);
    //   console.log(r)
    // });d
  //});



  let returnTeams = () => {
	  if (teams.length) {
		return (
			teams.map((item, index) => (
				<View key={index}>
					<Text>name: {item.name}</Text>
					<Text>country: {item.country}</Text>
					<Text>group_letter: {item.group_letter}</Text>
					<Text>draws: {item.draws}</Text>
					<Text>games_played: {item.games_played}</Text>
					<Text>goal_differential: {item.goal_differential}</Text>
					<Text>goals_against: {item.goals_against}</Text>
					<Text>goals_for: {item.goals_for}</Text>
					<Text>group_points: {item.group_points}</Text>
		 			<Text>losses: {item.losses}</Text>
					<Text>wins: {item.wins}</Text>
				</View>
			))
		)
	}
	else return ( <View style={styles.error}><Text>Error in returnTeams()</Text></View> )
}


  return (
	  <View style={styles.container}>
		  <Text>{returnMatches()}</Text>
		  <Text>--------------------------</Text>
		  <Text>{returnTeams()}</Text>
		<StatusBar style="auto" />
	  </View>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    flex: 1,
    backgroundColor: '#DC143C',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;