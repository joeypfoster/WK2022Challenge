import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, Dimensions, TouchableOpacity, Button, BackHandler, navigation, Platform} from 'react-native';
import React, {useEffect, useState, setNativeProps, useRef} from "react";
import Display from 'react-native-display';
import { SearchBar } from 'react-native-elements';


const WK = require('./Api')
const api = new WK();

var blockedIDs = []
var scrollLocation = 0
// const scrollTo = useScrollTo();

const Search = ({route, navigation}) => {

	const [searchString, setSearch] = useState('');
	const [matches, setMatches] = useState([]);
	const [teams, setTeams] = useState([]);
	// const [ref, setRef] = useState(0);
	const scrollViewRef = useRef(null);

	let updateSearch = (search) => {
		setSearch({ search });

		console.log('Searching for: ' + search)
		
		
		if (search.length > 0 && search != "") {
			api.searchMatch(search).then((match) => {
				match.forEach((item, index) => blockedIDs.push(item.id))
			})
		} else blockedIDs = []
	};

	const selectedTeam = "";

	useEffect(() => {
		scrollParam = route.param;
		
		api.getMatches(selectedTeam).then((match) => setMatches(match))
		api.getTeams(selectedTeam).then((team) => setTeams(team))
	}, []);


	//  console.log(scrollLocation)
	if (scrollLocation && scrollLocation > 0) {
		console.log('Scrolling to: ' + Math.floor(scrollLocation))

		scrollViewRef.current?.scrollTo({y: scrollLocation}); 
	}


	// Redirect to Info page with match id
	let showMatch = (id) => {
		console.log('Showing match: ' + id)
		navigation.replace("Info", { id: id });
	}

	let imageLink = (team) => {
		let baseUrl = 'https://cdn.countryflags.com/thumbs/'

		if (team == 'United States') {
			return `${baseUrl}united-states-of-america/flag-400.png`
		} else {
			return `${baseUrl}${team.toLowerCase().replace('korea republic', 'south-korea').replace(' ', '-')}/flag-400.png`
		}
	}

	let handleScroll = (event) => {
		scrollLocation = event.nativeEvent.contentOffset.y;
	}

	let returnMatches = () => {
		  if (matches.length) {
			  return (
				matches.map((item, index) => (
					<View key={index}>
						{/* Check if our id is in the block list then hide it */}
						<Display enable={!blockedIDs.includes(item.id)}>
							<TouchableOpacity onPress={() => showMatch(item.id)}>
								<Text style={styles.match}>{item.home_team.name}: {item.home_team.goals} - {item.away_team.goals} {item.away_team.name}</Text>
								
								<View style={styles.containerFlags}>
									<Image style={styles.flag} source={{ uri: imageLink(item.home_team.name)}}/>
									<Image style={styles.flag} source={{ uri: imageLink(item.away_team.name)}}/>
								</View>					
							</TouchableOpacity>
						</Display>
					  </View>
				  ))
			  )
		  }
		// else return ( <View style={styles.error}><Text>Error in returnMatches()</Text></View> )
	}
	
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView onScroll={(e) => handleScroll(e)} ref={scrollViewRef}>
				<SearchBar style={styles.search}
					placeholder="Find match..."
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
  },
});
export default Search;