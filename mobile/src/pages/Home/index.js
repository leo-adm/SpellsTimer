import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native"

import styles from "./styles"
import api from "../../services/api"
import sample from "../../services/sampleMatch"

var championsData;
var spellsData;

loadData = async() => {
    championsData = await api.getChampionsData();
    spellsData = await api.getSpellsData();
}

loadData();

export default function Home(){
    const navigation = useNavigation();
    const [nickname, setNickname] = useState("");
    const apikey = "RGAPI-24aff48e-e564-408e-903d-3c401a64ce50"

    async function GoToMatch(){
        if(nickname == ""){
            alert("Type something!");
            return;
        }
        const player = await GetPlayer();
        if(player === undefined){
            return;
        }

        const url = "https://br1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/"+ player.id
        const response = await fetch(url, { headers: {"X-Riot-Token": apikey} })
        const data = await response.json()
        const players = data.participants;
        if(players === undefined){
            alert("Player not playing.")
            return;
        }

        navigation.navigate("Match", {players, player, championsData, spellsData});        
    }

    async function GetPlayer(){
        const url = "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + nickname
        const response = await fetch(url, { headers: {"X-Riot-Token": apikey} })
        let data;
        switch(response.status){
            case 404:
                alert("Player not found!");
                break;
            case 403:
                alert("Not valid API-Key");
                break;
            case 200:
                data = await response.json();
                break;
        }
        return data;
    };

    async function GoToSample(){
        let players = sample.sampleMatch.participants
        let player = sample.samplePlayer
        let championsData = await api.getChampionsData();
        let spellsData = await api.getSpellsData();

        navigation.navigate("Match", {players, player, championsData, spellsData});
    }

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <Text style={styles.pageTitle}>SpellCounter</Text>

            {/* SEARCH */}
            <View style={styles.searchView}>
                <TextInput style={styles.searchInput}
                    placeholder="Player"
                    placeholderTextColor="#ddd"
                    onChangeText={nickname => setNickname(nickname)}/>
                <TouchableOpacity style={styles.searchButton}
                    onPress={GoToMatch}>
                    <Text style={styles.searchButtonText}>Search game</Text>
                </TouchableOpacity>
            </View>

            {/* TEST */}
            <TouchableOpacity style={styles.searchButton}
                onPress={GoToSample}>
                <Text style={styles.searchButtonText}>Try Sample</Text>
            </TouchableOpacity>
        </View>
    )
}