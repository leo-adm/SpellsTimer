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
    }
})