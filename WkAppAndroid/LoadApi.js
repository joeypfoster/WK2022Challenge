// import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AsyncStorage } from 'react-native';

export function loadapi() {
	
	for (var value of ["teams", "matches"]) {
		var request = new XMLHttpRequest();

		request.onreadystatechange = (e) => {
			if (request.readyState !== 4) return

			if (request.status !== 200) {
				console.warn('error');
				return
			}
			
			var data = JSON.parse(request.responseText);
			AsyncStorage.setItem(value, JSON.stringify(data));
		};  
		request.open('GET', 'https://worldcupjson.net/' + value);
		request.send();  
	}
	

    // const teams = () => {
    //     // console.log(n);
    //     request.onreadystatechange = (e) => {
	// 		console.log(1)
	// 		console.log(1)
    //         if (request.readyState !== 4) return;
    //         if (request.status === 200) {
    //             var data = JSON.parse(request.responseText);
	// 			console.log('SETTING TEAMS')
    //             AsyncStorage.setItem("teams", JSON.stringify(data));
    //         } else {
    //             console.warn('error');
    //         }
    //     };  
    // }
    // request.open('GET', 'https://worldcupjson.net/teams');
    // request.send();  
    // teams();

    // var request2 = new XMLHttpRequest();
    // const matches = () => {
    //     // console.log(n);
    //     request2.onreadystatechange = (e) => {
    //         if (request2.readyState !== 4) return;
    //         if (request2.status === 200) {
    //             var data = JSON.parse(request2.responseText);
    //             AsyncStorage.setItem("matches", JSON.stringify(data));
    //         } else {
    //             console.warn('error');
    //         }
    //     };  
    // }
    // request2.open('GET', 'https://worldcupjson.net/matches');
    // request2.send();  
    // matches();
}
