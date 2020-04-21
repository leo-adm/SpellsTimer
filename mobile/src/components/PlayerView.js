import React from "react"
import { View, Image } from "react-native"
import SpellView from "./SpellView"

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

const styles = {
    playerBox:{
        marginBottom:5,
        flexDirection:"row"        
    },
    
    championImage:{
        width:105,
        height:105,
        marginRight:5
    },

    spells:{
        justifyContent:"space-between",
        height:105
    }
}

export default PlayerView