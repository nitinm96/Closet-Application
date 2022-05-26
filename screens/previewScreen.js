import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCameraImage,
  selectCameraImage,
  setCameraImage,
} from "../slices/cameraSlice";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Header } from "react-native-elements";

const previewScreen = ({ navigation }) => {
  const cameraImage = useSelector(selectCameraImage);
  const dispatch = useDispatch();

  const takePhotoAgain = () => {
    navigation.navigate("Camera", dispatch(resetCameraImage()));
  };
  const addPhoto = () => {
    navigation.navigate("AddApparel", dispatch(setCameraImage(cameraImage)));
  };
  return (
    <View style={styles.container}>
      <Header
        containerStyle={{
          height: 55,
          backgroundColor: "black",
        }}
      />
      <Image
        style={{
          position: "relative",
          width: "100%",
          height: "83%",
        }}
        source={{ uri: cameraImage }}
      />
      <TouchableOpacity
        style={{ bottom: 770 }}
        activeOpacity={0.5}
        onPress={takePhotoAgain}
      >
        <Ionicons style={{ margin: 15 }} name="close" size={45} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.addButton}
        onPress={addPhoto}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "700",
          }}
        >
          Add To
        </Text>
        <Ionicons
          style={{ top: 1, marginLeft: 15 }}
          name="send"
          color="white"
          size={22}
        />
      </TouchableOpacity>
    </View>
  );
};

export default previewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  addButton: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    top: 823,
    backgroundColor: "#fa79a0",
    padding: 15,

    width: "100%",
  },
});
