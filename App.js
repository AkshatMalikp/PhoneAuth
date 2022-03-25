import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import Login from "./AuthScreens/Login";
import SignUp from "./AuthScreens/SignUp";
import OTP from "./AuthScreens/OTP";
import Activity from "./AuthScreens/Activity";
import OTPLogin from "./AuthScreens/OTPLogin";
import { Home } from "./HomePage";
export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="Activity" component={Activity} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OTP" component={OTP} />
        <Stack.Screen name="OTPLogin" component={OTPLogin} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
