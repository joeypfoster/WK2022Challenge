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

				let teamMatches = []
				
				matches.forEach((match) => {
					if (match.home_team.name === teamName || match.away_team.name === teamName) teamMatches.push(match)
				})

				resolve(teamMatches);
			})
		})
	}
};

module.exports = WK