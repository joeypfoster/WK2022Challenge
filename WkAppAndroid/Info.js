import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, BackHandler, navigation } from 'react-native';
import React, {useEffect, useState, setNativeProps} from "react"

const WK = require('./Api')
const api = new WK();

const Info = ({ route, navigation}) => {
	
	function backClick() {
		navigation.replace("Search")
		return true;
	}
	
	const [info, setInfo] = useState([]);
	
	useEffect(() => {

		// Get the match id from the route params
		const { id } = route.params;
		api.GetMatch(id).then((id) => setInfo(id))

		// Add event listener for hardware back button
		BackHandler.addEventListener("hardwareBackPress", backClick);
		return () => BackHandler.removeEventListener("hardwareBackPress", backClick)
	}, []);

	let returnInfo = () => {
		console.log(info)
		if (info.length) {
			return (
				info.map((item, index) => (
				  <View key={index}>
					<Text>Winner: {item.winner}</Text>
					<Text>Location: {item.location}</Text>
					<Text>Attendance: {item.attendance}</Text>
					<Text>Stage: {item.stage_name}</Text>
					<Text>Home Team: {item.home_team_country}</Text>
					<Text>Away Team: {item.away_team_country}</Text>
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
	},
});
export default Info;