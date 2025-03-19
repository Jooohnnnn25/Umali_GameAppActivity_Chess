import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground source={require("./assets/Chess.jpg")} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Chess Game</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ChessGame")}>
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
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
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ffcc00",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    elevation: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    textTransform: "uppercase",
  },
});
