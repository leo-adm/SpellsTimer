import React, { useState, useEffect } from "react";
import { Image, View, Text, FlatList, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import { useRoute } from "@react-navigation/native"

import styles from "./styles"
import api from "../../services/api"
import logo from "../../assets/logo.png"

import PlayerView from "../../components/PlayerView"

export default function Match(){
    const route = useRoute();

    const players = route.params.players;
    const playerName = route.params.player.name;
    const championsData = route.params.championsData;
    const spellsData = route.params.spellsData;

    var playerTeamId = 0;
    players.forEach(summoner => {
        if(summoner.summonerName === playerName){
            playerTeamId = summoner.teamId;
            return;
        }
    });   

    var enemyPlayers = [];
    for(var i in players){
        if(players[i].teamId != playerTeamId){
            enemyPlayers.push({
                id: players[i].summonerId, 
                championSource: api.getChampImage(players[i].championId, championsData),
                spell1: {
                    source: api.getSpellImage(players[i].spell1Id, spellsData),
                    cooldown: api.getSpellCooldown(players[i].spell1Id, spellsData)
                },
                spell2: {
                    source: api.getSpellImage(players[i].spell2Id, spellsData),
                    cooldown: api.getSpellCooldown(players[i].spell2Id, spellsData)
                },
                hasCooldownRune: api.HasCooldownRune(players[i].perks.perkIds)
            })
        }
    }

    return (
        <View style={styles.container}>
            {/* HEADER */}
            {/* <Text style={styles.pageTitle}>SpellCounter</Text> */}
            <Image source={logo} style={styles.logo}/>

            {/* SUMMONERS */}
            <FlatList
                scrollEnabled={false}
                data={enemyPlayers}
                showsVerticalScrollIndicator={false}
                keyExtractor={(player) => player.id.toString() } 
                renderItem={({ item: player }) => (
                    <PlayerView player={player}/>
                )}
            />
        </View>
    )
}