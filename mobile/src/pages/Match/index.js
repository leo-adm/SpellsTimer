import React, { useState, useEffect } from "react";
import { Image, View, Text, FlatList, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import { useRoute } from "@react-navigation/native"

import styles from "./styles"

const formatMin = number => `0${number}`.slice(-1);
const formatSec = number => `0${number}`.slice(-2);

const getRemaining = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time - mins * 60;
    return { mins: formatMin(mins), secs: formatSec(secs) };
}

export default function Match(){
    const route = useRoute();

    const championsData = route.params.championsData;
    const spellsData = route.params.spellsData;
    const players = route.params.players;
    const playerName = route.params.player.name;

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
                championSource: getChampImage(players[i].championId),
                spell1: {
                    source: getSpellImage(players[i].spell1Id),
                    cooldown: getSpellCooldown(players[i].spell1Id)
                },
                spell2: {
                    source: getSpellImage(players[i].spell2Id),
                    cooldown: getSpellCooldown(players[i].spell2Id)
                }
            })
        }
    }

    function getChampImage(champId){
        let championName;
        for (var i in championsData) {
            if (championsData[i].key == champId) {
                championName = championsData[i].id
                break;
            }
        }
        return { uri: "http://ddragon.leagueoflegends.com/cdn/10.7.1/img/champion/" + championName + ".png" }
    }

    function getSpellImage(spellId){
        let spellName;
        for (var i in spellsData) {
            if (spellsData[i].key == spellId) {
                spellName = spellsData[i].id
                break;
            }
        }
        return { uri: "http://ddragon.leagueoflegends.com/cdn/10.7.1/img/spell/" + spellName + ".png" }
    }

    function getSpellCooldown(spellId){
        let spellCooldown;
        for (var i in spellsData) {
            if (spellsData[i].key == spellId) {
                spellCooldown = spellsData[i].cooldown[0];
            }
        }
        return spellCooldown;
    }

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <Text style={styles.pageTitle}>SpellCounter</Text>

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

function PlayerView({player}){
    return (
        <View style={styles.playerBox}>
            <Image source={player.championSource} style={styles.championImage}/>

            <View style={styles.spells}>
                <SpellView spell={player.spell1}/>
                <SpellView spell={player.spell2}/>
            </View>                 
        </View>
    )
}

function SpellView({spell}){
    const [remainingSecs, setRemainingSecs] = useState(spell.cooldown);
    const [isActive, setIsActive] = useState(false);
    const { mins, secs } = getRemaining(remainingSecs);

    toggle = () => {
        setIsActive(!isActive);
    }

    reset = () => {
        setRemainingSecs(spell.cooldown);
        setIsActive(false);
    }

    useEffect(() => {
        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                setRemainingSecs(remainingSecs => remainingSecs - 1);
                if(remainingSecs === 0){
                    reset();
                }
            }, 1000);
        } else if (!isActive && remainingSecs !== 0) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, remainingSecs]);

    return (
        <View style={styles.spellbox}>
            <TouchableOpacity style={styles.spellImage} onPress={toggle} disabled={isActive}>
                <Image source={spell.source} style={isActive? styles.spellOn : styles.spellOff}/>
                {/* <Image source={spell.source} style={styles.spellFilter}/> */}
            </TouchableOpacity>

            <Text style={styles.timer}>{isActive? `${mins}:${secs}` : ""}</Text> 
        </View>
    )
}