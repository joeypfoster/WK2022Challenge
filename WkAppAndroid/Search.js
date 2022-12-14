import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import React, {useEffect, useState} from "react";

const WK = require('./Api')
const api = new WK();

const Search = ({navigation}) => {

  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);

  const selectedTeam = "";

  useEffect(() => {
	api.getMatches(selectedTeam).then((match) => setMatches(match))
	api.getTeams(selectedTeam).then((team) => setTeams(team))
  }, []);

  
  let returnMatches = () => {
	  if (matches.length) {
		  return (
			matches.map((item, index) => (
				  <View key={index}>
					  <Text style={styles.match}>{item.home_team.name}: {item.home_team.goals} - {item.away_team.goals} :{item.away_team.name}</Text>
				  </View>
			  ))
		  )
	  }
	  else return ( <View style={styles.error}><Text>Error in returnMatches()</Text></View> )
  }



  
  return (
    <SafeAreaView  style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <Text>{returnMatches()}</Text>
        </View>
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView >
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
  match: {
    flex: 1,
    backgroundColor: '#9F2B68',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  }
});
export default Search;