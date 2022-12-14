import AsyncStorage from "@react-native-async-storage/async-storage";

let WK = class {
	constructor(TEAMS) {
		// this.team = TEAMS
	}
	/**
	 * @param {string} teamName 
	 * @description Get all information about a team
	 * @example
	 * api.GetTeam("Netherlands").then((team) => {
	 * 	console.log(team);
	 * }) 
	*/
	getTeams(teamName) {
		return new Promise((resolve, reject) => {
			AsyncStorage.getItem('teams', (err, result) => {
				const teams = JSON.parse(result);

				teams.groups.forEach(group => {
					group.teams.forEach(team => {
						// Return the team as an array
						if (teamName === team.name) resolve([team])
					})
				})
			});

		})
	}


	/**
	 * @param {string} teamName
	 * @description Get all matches for a team
	 * @example
	 * api.GetMatches("Netherlands").then((match) => {
	 * 	console.log(match);
	 * })
	*/
	getMatches(teamName){
		return new Promise((resolve, reject) => {
			AsyncStorage.getItem('matches', (err, result) => {
				const matches = JSON.parse(result);

				if (!teamName) resolve(matches)

				let teamMatches = []
				matches.forEach((match) => {
					if (match.home_team.name === teamName || match.away_team.name === teamName) teamMatches.push(match)
				})
				resolve(teamMatches);
			})
		})
	}

	GetMatch(matchId) {
		return new Promise((resolve, reject) => {
			AsyncStorage.getItem('matches', (err, result) => {
				const matches = JSON.parse(result);

				matches.forEach(match => {
					if (match.id === matchId) resolve([match])
				})
			})
		})
	}

	searchMatch(searchTerm) {
		// find a match using a search term with wildcards

		return new Promise((resolve, reject) => {
			AsyncStorage.getItem('matches', (err, result) => {
				const matches = JSON.parse(result);

				let searchMatches = []

				matches.forEach(match => {
					// filter out bad characters
					searchTerm = searchTerm.replace(/[^a-zA-Z ]/g, "")
					
					// do a regex check for the first few characters of the search term
					// if (match.home_team.name.match(new RegExp(`^${searchTerm}`, "g")) || match.away_team.name.match(new RegExp(`^${searchTerm}`, "g"))) searchMatches.push(match)
					// Do a regex check to find the match where it does not contain the search term
					if (!match.home_team.name.match(new RegExp(`^${searchTerm}`, "g")) && !match.away_team.name.match(new RegExp(`^${searchTerm}`, "g"))) searchMatches.push(match)
				})

				resolve(searchMatches)
			})
		})
	}
};

module.exports = WK