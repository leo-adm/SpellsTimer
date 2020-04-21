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
})