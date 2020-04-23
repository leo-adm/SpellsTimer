import React, { useState } from "react"
import { View, Image, TouchableOpacity } from "react-native"

import SpellView from "./SpellView"
import CooldownRuneImage from "../assets/CDRRune.png"
import CooldownBootImage from "../assets/CDRBoot.png"

function PlayerView({player}){
    const [cdr, setCdr] = useState(player.hasCooldownRune ? 0.05 : 0)
    const [hasBoots, setHasBoot] = useState(false);

    function ToggleBoot(){
        if(hasBoots){
            setCdr(cdr - 0.1);
        }
        else{
            setCdr(cdr + 0.1);
        }
        setHasBoot(!hasBoots);
    }

    return (
        <View style={styles.playerBox}>
            <View style={styles.championImageContainer}>
                <Image source={player.championSource} style={styles.championImage}/>

                <Image source={CooldownRuneImage} style={player.hasCooldownRune ? styles.cooldownRune : {display:"none"}} />

                <TouchableOpacity 
                    onPress={ToggleBoot}>                
                    <Image source={CooldownBootImage} style={hasBoots ? styles.cooldownBoot : {...styles.cooldownBoot, opacity:0.3} }/>                 
                </TouchableOpacity>

            </View>

            <View style={styles.spellsContainer}>
                <SpellView spellSource={player.spell1.source} cooldown={player.spell1.cooldown} cdr={cdr}/>
                <SpellView spellSource={player.spell2.source} cooldown={player.spell2.cooldown} cdr={cdr}/>
            </View>

        </View>
    )
}

const styles = {
    playerBox:{
        marginBottom:5,
        flexDirection:"row"
    },

    championImageContainer:{
        display:"block",
        flexDirection:"column",
    },
    
    championImage:{
        width:105,
        height:105,
        marginRight:5
    },

    spellsContainer:{
        justifyContent:"space-between",
        height:105
    },

    cooldownRune:{
        position:"absolute",
        width:30,
        height:30,
        top:4,
        left:3
    },

    cooldownBoot:{
        position:"absolute",
        height:30,
        width:30,
        bottom:4,
        left:4,
    },
}

export default PlayerView