// import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AsyncStorage } from 'react-native';

export function loadapi() {
	
	let types = ["teams", "matches"];
	for (let i = 0; i < types.length; i++) {
		setTimeout(() => {
			let value = types[i];
			let request = new XMLHttpRequest();
		
			request.onreadystatechange = (e) => {
				if (request.readyState !== 4) return
		
				if (request.status !== 200) {
					console.warn('error');
					return
				}
				console.log(`Getting JSON for ${value}`)
				let data = JSON.parse(request.responseText);
				AsyncStorage.setItem(value, JSON.stringify(data));
			};  
			request.open('GET', 'https://worldcupjson.net/' + value);
			request.send();  
		}, i * 100)
	}
}
