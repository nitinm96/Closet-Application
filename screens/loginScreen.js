import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import useAuth from "../hooks/useAuth";
import Ionicons from "react-native-vector-icons/Ionicons";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { signInWithGoogle,signIn} = useAuth();

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require("../assets/logo.png")} />

      <TouchableOpacity style={styles.buttonStyle} onPress={signIn}>
        <Ionicons name="logo-google" color={"#fa79a0"} size={30} />

        <Text
          style={{
            fontSize: 18,
            color: "#fa79a0",
            fontWeight: "700",
            marginLeft: 15,
          }}
        >
          Sign In With Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFD6cF",
  },
  img: {
    position: "relative",
    width: 400,
    height: 400,
    resizeMode: "contain",
    bottom: 40,
  },
  buttonStyle: {
    backgroundColor: "white",
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "white",
    top: 20,
  },
});
