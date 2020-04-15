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

    searchView:{
        alignItems:"center",
        backgroundColor:"#6200ee",
        borderRadius:8,
        padding:24
    },

    searchInput:{
        color:"white",
        borderWidth:1,
        borderColor:"white",
        padding:10,
        width:"100%",
        fontSize:18,
        marginBottom:24
    },

    searchButton:{
        backgroundColor:"#03dac6",
        paddingVertical:10,
        paddingHorizontal:20,
    },

    searchButtonText: {
        fontSize:20,
        textAlign:"center",
        fontWeight:"bold",
        letterSpacing:0
    }
})