const fs = require('fs')
const fetch = require('node-fetch')

// check if images folder exists
if (!fs.existsSync('./images')) fs.mkdirSync('./images')

let downloadFlag = (countryName, fileName) => {
	console.log(`Saving ${countryName} to ./images/${fileName}.png`)

	fetch(`https://cdn.countryflags.com/thumbs/${countryName.toLowerCase()}/flag-400.png`)
		.then(res => res.buffer())
		.then(data => fs.writeFileSync(`./images/${fileName}.png`, data))
		.catch(err => console.log(err))
}

fetch('https://worldcupjson.net/teams').then(res => res.json()).then(data => {
	data.groups.forEach(e => {
		e.teams.forEach((team, i) => {
			setTimeout(() => {
				downloadFlag(team.name, team.country)
			}, i * 1000);
		});
	});
})