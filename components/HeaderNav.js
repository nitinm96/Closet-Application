import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Header } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import useAuth from "../hooks/useAuth";
import { resetCameraImage } from "../slices/cameraSlice";

const HeaderNav = () => {
  const navigation = useNavigation();

  const { user, logout,signOut } = useAuth();
  const dispatch = useDispatch();
  const takePhotoAgain = () => {
    navigation.navigate("Camera", dispatch(resetCameraImage()));
  };
  return (
    <View style={styles.container}>
      <Header
        containerStyle={{
          height: 128,
          backgroundColor: "white",
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 10,
        }}
        rightComponent={
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ marginRight: 20, marginTop: 15 }}
            onPress={takePhotoAgain}
          >
            <Ionicons name="camera" color="black" size={45} />
          </TouchableOpacity>
        }
        centerComponent={
          <Image style={styles.logo} source={require("../assets/logo.png")} />
        }
        leftComponent={
          <TouchableOpacity
            style={{ marginLeft: 20, marginTop: 17 }}
            onPress={() =>
              Alert.alert(
                "Sign Out?",
                user.displayName + ", do you want to sign out? ",
                [
                  {
                    text: "Sign Out",
                    onPress: () => {
                      signOut();
                    },
                  },
                  { text: "Cancel" },
                ]
              )
            }
          >
            <Image
              style={{ width: 45, height: 45, borderRadius: 50 }}
              source={{ uri: user.photoURL }}
            />
          </TouchableOpacity>
        }
      />
    </View>
  );
};

export default HeaderNav;

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  logo: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    bottom: 5,
  },
});
