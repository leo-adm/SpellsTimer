import React, { useState, useEffect} from "react"
import { View, Image, Text, TouchableOpacity} from "react-native"

const formatMin = number => `0${number}`.slice(-1);
const formatSec = number => `0${number}`.slice(-2);

const getRemaining = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time - mins * 60;
    return { mins: formatMin(mins), secs: formatSec(secs) };
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

const styles = {
    spellbox:{
        alignItems:"center",
        flexDirection:"row"
    },

    spellOn:{
        width:50,
        height:50,
        opacity:0.3
    },

    spellOff:{
        width:50,
        height:50,
        opacity:1
    },

    timer:{
        marginLeft:10,
        fontSize:24,
        fontWeight:"900"
    }
}

export default SpellView