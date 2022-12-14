import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, Dimensions, TouchableOpacity, Button } from 'react-native';
import React, {useEffect, useState, setNativeProps} from "react";

import { SearchBar } from 'react-native-elements';

const WK = require('./Api')
const api = new WK();


const Search = ({navigation}) => {
	// var className = '';
	const [searchString, setSearch] = useState('');
	
	  updateSearch = (search) => {
		setSearch({ search });

		console.log('Searching for: ' + search)
		
		if (search.length > 0) {
			api.searchMatch(search).then((match) => {
				match.forEach((item, index) => {
					// {style: styles.DontShow}
					
				
				})
			})
		}
	  };


  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);

  const selectedTeam = "";

  useEffect(() => {
	api.getMatches(selectedTeam).then((match) => setMatches(match))
	api.getTeams(selectedTeam).then((team) => setTeams(team))
	
  }, []);

  let showMatch = (id) => {
	currentMatch = id
	navigation.replace("Info");
	console.log('Viewing match: ' + currentMatch)
  }

  let returnMatches = () => {
	  let baseUrl = 'https://cdn.countryflags.com/thumbs/'
	  if (matches.length) {
		  return (
			matches.map((item, index) => (
        
				<View key={index} >
					<TouchableOpacity onPress={() => showMatch(item.id)}>
						<Text style={styles.match}>{item.home_team.name}: {item.home_team.goals} - {item.away_team.goals} {item.away_team.name}</Text>
						<View style={styles.containerFlags}>
							
						<Image  style={styles.flag} source={{ uri: item.home_team.name !== 'United States' ? `${baseUrl}${item.home_team.name.toLowerCase().replace('korea republic', 'south-korea').replace(' ', '-')}/flag-400.png` : baseUrl + 'united-states-of-america/flag-400.png' }}/>
						<Image  style={styles.flag} source={{ uri: item.away_team.name !== 'United States' ? `${baseUrl}${item.away_team.name.toLowerCase().replace('korea republic', 'south-korea').replace(' ', '-')}/flag-400.png` : baseUrl + 'united-states-of-america/flag-400.png' }}/>
						</View>
					</TouchableOpacity>
				  </View>
			  ))
		  )
	  }
	//   else return ( <View style={styles.error}><Text>Error in returnMatches()</Text></View> )
  }


  return (
	  <SafeAreaView  style={styles.container}>
	  <ScrollView>
		<SearchBar style={styles.search}
		  placeholder="Type Here..."
		  onChangeText={(e) => updateSearch(e)}
		  value={searchString}
		/>
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
	minWidth: Dimensions.get('window').width + 20,
  },
  search: {
	// backgroundColor: '#fff',
	width: 400,
},

  error: {
	flex: 1,
	backgroundColor: '#DC143C',
	alignItems: 'center',
	justifyContent: 'center',
  },
  match: {
	flex: 1,
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	margin: 10,
	padding: 10,
	borderWidth: 1,
	borderRadius: 5,
	borderColor: '#DC143C',
	backgroundColor: '#fff',
	color: '#DC143C',
	fontWeight: 'bold',
	fontSize: 20,
  },
  flag: {
	width: 400 / 6,
	height: 288 / 4,
	flex: 1,
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	margin: 10,
	padding: 10,
	borderWidth: 2,
	borderRadius: 5,
	borderColor: 'black',
	backgroundColor: '#fff',
  },
  containerFlags: {
	// flex: 1,
	flexDirection: 'row',
	margin: 10,
	padding: 10,
	borderWidth: 1,
	width: (Dimensions.get('window').width ) * 0.75,
  },
  DontShow: {
	display: 'none',
	backgroundColor: '#FF0000',
  }
});
export default Search;