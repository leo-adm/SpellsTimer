import {StyleSheet} from "react-native"
import Constants from "expo-constants";

export default StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
        backgroundColor:"#31393E"
    },

    logo:{
        alignSelf:"center",
        height:60,
        width:120,
        marginBottom:20
    },

    searchView:{
        alignItems:"center",
        backgroundColor:"#282F33",
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
        backgroundColor:"#FF9000",
        paddingVertical:10,
        paddingHorizontal:20,
    },

    searchButtonText: {
        color:"#FFF",
        fontSize:20,
        textAlign:"center",
        fontWeight:"bold",
        letterSpacing:0
    }
})