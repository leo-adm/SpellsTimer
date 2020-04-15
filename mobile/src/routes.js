import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native"

const AppStack = createStackNavigator();

import Home from "./pages/Home"
import Match from "./pages/Match"

export default function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}}>
                <AppStack.Screen name="Home" component={Home}/>
                <AppStack.Screen name="Match" component={Match}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
}