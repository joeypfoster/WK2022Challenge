// import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AsyncStorage } from 'react-native';

export function loadapi() {
    var request = new XMLHttpRequest();
    const teams = () => {
        // console.log(n);
        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) return;
            if (request.status === 200) {
                var data = JSON.parse(request.responseText).group;
                AsyncStorage.setItem("teams", JSON.stringify(data));
            } else {
                console.warn('error');
            }
        };  
    }
    request.open('GET', 'https://worldcupjson.net/teams');
    request.send();  
    teams();

    var request = new XMLHttpRequest();
    const matches = () => {
        // console.log(n);
        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) return;
            if (request.status === 200) {
                var data = JSON.parse(request.responseText);
                AsyncStorage.setItem("matches", JSON.stringify(data));
            } else {
                console.warn('error');
            }
        };  
    }
    request.open('GET', 'https://worldcupjson.net/matches');
    request.send();  
    matches();
}
