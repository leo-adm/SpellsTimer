import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native"

import styles from "./styles"

export default function Home(){
    const navigation = useNavigation();

    const [nickname, setNickname] = useState("");

    const apikey = "RGAPI-9f2399d9-5fca-4ae8-a047-964d98da912d"

    async function goToMatch(){
        const player = await getPlayer();
        if(player.id === undefined){
            alert("Player não encontrado")
            return;
        }

        const championsData = await getChampionsData();
        const spellsData = await getSpellsData();
        
        var players;
        const url = "https://br1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/"+ player.id + "?api_key=" + apikey
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                players = data.participants;                
            })
            .catch(() => {})
        if(players !== undefined){
            navigation.navigate("Match", {players, player, championsData, spellsData});
        }
        else{
            alert("Player não está jogando.")
        }
    }

    async function getPlayer(){
        const url = "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + nickname + "?api_key=" + apikey
        var player = []
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                player = data;
            })
            .catch(() => {})
        return player;
    };

    async function getChampionsData(){
        const url = "http://ddragon.leagueoflegends.com/cdn/10.7.1/data/pt_BR/champion.json"
        var champData;
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                champData = data.data;
            })
            .catch(() => {})
        return champData
    };

    async function getSpellsData(){
        const url = "http://ddragon.leagueoflegends.com/cdn/10.7.1/data/pt_BR/summoner.json"
        var spellData;
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                spellData = data.data;
            })
            .catch(() => {})
        return spellData;
    };


    return (
        <View style={styles.container}>
            {/* HEADER */}
            <Text style={styles.pageTitle}>SpellCounter</Text>

            {/* SEARCH */}
            <View style={styles.searchView}>
                <TextInput style={styles.searchInput}
                    placeholder="Jogador"
                    placeholderTextColor="#ddd"
                    onChangeText={nickname => setNickname(nickname)}/>
                <TouchableOpacity style={styles.searchButton}
                    onPress={goToMatch}>
                    <Text style={styles.searchButtonText}>Procurar partida</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}