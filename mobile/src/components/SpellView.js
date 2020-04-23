import React, { useState, useEffect} from "react"
import { View, Image, Text, TouchableOpacity, TouchableWithoutFeedback} from "react-native"

const formatMin = number => `0${number}`.slice(-1);
const formatSec = number => `0${number}`.slice(-2);

const getRemaining = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time - mins * 60;
    return { mins: formatMin(mins), secs: formatSec(secs) };
}

function SpellView({spellSource, cooldown, cdr}){

    const [remainingSecs, setRemainingSecs] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const { mins, secs } = getRemaining(remainingSecs);

    startCountdown = () => {
        setRemainingSecs(parseInt(cooldown * (1 - cdr)))
        setIsActive(!isActive);
    }

    useEffect(() => {
        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                setRemainingSecs(remainingSecs => remainingSecs - 1);
                if(remainingSecs <= 0){
                    setIsActive(false);
                }
            }, 1000);
        } else if (!isActive && remainingSecs !== 0) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, remainingSecs]);

    handleDecrease = () => {
        if(isActive && remainingSecs > 5){
            setRemainingSecs(remainingSecs - 5);
        }
    }

    return (
        <View style={styles.spellbox}>
            <TouchableOpacity onPress={startCountdown} disabled={isActive}>
                <Image source={spellSource} style={isActive? styles.spellOn : styles.spellOff}/>
            </TouchableOpacity>

            <Text style={styles.timer}>{isActive? `${mins}:${secs}` : ""}</Text>

            <TouchableOpacity
                onPress={handleDecrease}
                style={isActive ? {display:"flex", alignItems:"center"} : {display:"none"}}>
                <Text style={styles.decreaseButton}>+</Text>
            </TouchableOpacity>
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
        opacity:0.2
    },

    spellOff:{
        width:50,
        height:50,
        opacity:1
    },

    timer:{
        marginLeft:15,
        fontSize:24,
        fontWeight:"800",
        color:"white"
    },

    decreaseButton:{
        color:"white",
        fontSize:32,
        fontWeight:"800",
        width:32,
        textAlign:"center",
        marginLeft:5,
        marginBottom:5
    }
}

export default SpellView