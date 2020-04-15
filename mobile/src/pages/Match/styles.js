import {StyleSheet} from "react-native"
import Constants from "expo-constants";

export default StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
        backgroundColor:"#eee"
    },

    pageTitle:{
        textAlign:"center",
        fontSize: 32,
        fontWeight:"800",
        color:"black",
        marginBottom:40
    },

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
    },

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
})