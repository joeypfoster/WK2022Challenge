import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, BackHandler, navigation } from 'react-native';
import React, {useEffect, useState, setNativeProps} from "react"

const WK = require('./Api')
const api = new WK();

var sLocation = 0;

const Info = ({ route, navigation}) => {
	
	function backClick() {
		console.log(sLocation)
		navigation.replace("Search", { scrollLocation: sLocation })
		return true;
	}
	
	const [info, setInfo] = useState([]);
	
	useEffect(() => {

		// Get the match id from the route params
		const { id, scrollLocation } = route.params;
		api.GetMatch(id).then((id) => setInfo(id))
		sLocation = scrollLocation

		// Add event listener for hardware back button
		BackHandler.addEventListener("hardwareBackPress", backClick);
		return () => BackHandler.removeEventListener("hardwareBackPress", backClick)
	}, []);

	let imageLink = (team) => {
		let baseUrl = 'https://cdn.countryflags.com/thumbs/'

		if (team == 'United States') {
			return `${baseUrl}united-states-of-america/flag-400.png`
		} else {
			return `${baseUrl}${team.toLowerCase().replace('korea republic', 'south-korea').replace(' ', '-')}/flag-400.png`
		}
	}
	

	let returnInfo = () => {
		console.log(info)
		if (info.length) {
			return (
				info.map((item, index) => (
				  <View key={index}>
					<View style={styles.containerFlags}>
						<Image style={styles.flag} source={{ uri: imageLink(item.home_team.name)}}/>
						<Image style={styles.flag} source={{ uri: imageLink(item.away_team.name)}}/>
					</View>	
					<View style={styles.textInfo}>
					<Text>Winner: {item.winner}</Text>
					<Text>Location: {item.location}</Text>
					<Text>Attendance: {item.attendance}</Text>
					<Text>Stage: {item.stage_name}</Text>
					<Text>Home Team: {item.home_team_country}</Text>
					<Text>Away Team: {item.away_team_country}</Text>
					</View>

					
				  </View>
				))
			)
		}
	}

	return (
		<View style={styles.container}>
			<Text>{returnInfo()}</Text>
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
		borderColor:'black',
		borderWidth:24,
		
	},

	flag: {
		alignContent:'center',
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
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		margin: 10,
		padding: 10,
		borderWidth: 1,

	},

});
export default Info;