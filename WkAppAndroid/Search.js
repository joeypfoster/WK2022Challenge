import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, Dimensions, TouchableOpacity, Button, BackHandler, navigation} from 'react-native';
import React, {useEffect, useState, setNativeProps} from "react";
import Display from 'react-native-display';
import { SearchBar } from 'react-native-elements';

const WK = require('./Api')
const api = new WK();

var blockedIDs = []
var scrollLocation = 0

const Search = ({route, navigation}) => {

	const [searchString, setSearch] = useState('');
	const [matches, setMatches] = useState([]);
	const [teams, setTeams] = useState([]);
	const [ref, setRef] = useState(0);
	
	// const aref = useAnimatedRef();

	let updateSearch = (search) => {
		setSearch({ search });

		console.log('Searching for: ' + search)
		
		if (search.length > 0) {
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
		console.log('Scrolling to: ' + scrollLocation)

		// Q: How do I scroll to a specific location?
		// A: https://stackoverflow.com/questions/37096367/how-to-scroll-to-a-specific-position-in-react-native

		// scrollTo({ x: 0, y: 1000, animated: true })
		// aref.scrollTo({
		// 	x: 0,
		// 	y: scrollLocation,
		// 	animated: true,
		//   });
		// aref.current.scrollTo({ x, scrollLocation, animated: true });
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
			<ScrollView onScroll={(e) => handleScroll(e)} ref={(ref) => {setRef(ref)} }>
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
		backgroundColor: '#'+Math.floor(Math.random()*16777215).toString(16),
		// transform: [{ scale: 0 }]
	}
});
export default Search;