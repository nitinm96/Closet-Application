import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useDispatch } from "react-redux";
import { resetCameraImage } from "../slices/cameraSlice";

const FooterNav = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const home = () => {
    navigation.navigate("Home", dispatch(resetCameraImage()));
  };

  const tops = () => {
    navigation.navigate("Tops", dispatch(resetCameraImage()));
  };

  const bottoms = () => {
    navigation.navigate("Bottoms", dispatch(resetCameraImage()));
  };

  const dresses = () => {
    navigation.navigate("Dresses", dispatch(resetCameraImage()));
  };
  const shoes = () => {
    navigation.navigate("Shoes", dispatch(resetCameraImage()));
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconStyle} onPress={tops}>
        <Image
          style={{ width: 50, height: 50 }}
          source={require("../assets/top.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconStyle} onPress={bottoms}>
        <Image
          style={{ width: 50, height: 50 }}
          source={require("../assets/bottoms.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconStyle} onPress={home}>
        <Image
          style={{ width: 58, height: 58 }}
          source={require("../assets/home.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconStyle} onPress={dresses}>
        <Image
          style={{ width: 50, height: 50 }}
          source={require("../assets/dress.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconStyle} onPress={shoes}>
        <Image
          style={{ width: 50, height: 50 }}
          source={require("../assets/shoe.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FooterNav;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 85,
    bottom: 0,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  iconStyle: {
    paddingHorizontal: 18,
    bottom: 7,
  },
});
