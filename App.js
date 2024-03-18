import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screen/HomeScreen";
import UserScreen from "./screen/UserScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{
            headerTintColor: "#4169e1",
            title: "",
          }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="User"
          options={{ title: "User" }}
          component={UserScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
