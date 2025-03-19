import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import ChessGame from "./ChessGame";
import AboutScreen from "./AboutScreen";


const Stack = createStackNavigator();

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <NavigationContainer>
      {gameStarted ? (
        <Stack.Navigator>
          <Stack.Screen name="ChessGame" component={ChessGame} options={{ headerShown: false }} />
          <Stack.Screen name="AboutScreen" component={AboutScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      ) : (
        <ImageBackground source={require("./assets/Chess.jpg")} style={styles.background}>
          <View style={styles.container}>
            <Text style={styles.title}>Chess Game</Text>
            <TouchableOpacity style={styles.startButton} onPress={() => setGameStarted(true)}>
              <Text style={styles.startButtonText}>Start Game</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    width: "100%",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  startButton: {
    backgroundColor: "#ffcc00",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    elevation: 5,
  },
  startButtonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    textTransform: "uppercase",
  },
});

