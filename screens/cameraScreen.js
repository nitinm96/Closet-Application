import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import { useDispatch } from "react-redux";
import { setCameraImage } from "../slices/cameraSlice";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { Header } from "react-native-elements";

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      navigation.navigate("Preview", dispatch(setCameraImage(photo.uri)));
    }
  };

  const goHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Header
        containerStyle={{
          height: 55,
          backgroundColor: "black",
        }}
      />

      <Camera style={styles.camera} type={type} ref={cameraRef}></Camera>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.flipButton}
          activeOpacity={0.5}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          <Ionicons name="camera-reverse" size={45} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.homeButton}
          activeOpacity={0.5}
          onPress={goHome}
        >
          <Ionicons name="close" size={45} color="white" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity activeOpacity={0.5} style={styles.pictureButton}>
        <Ionicons
          name="ellipse-outline"
          color="white"
          size={100}
          onPress={async () => {
            await takePhoto();
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    position: "relative",
    width: "100%",
    height: "81%",
    borderRadius: 50,
  },
  buttonContainer: {
    flexDirection: "row-reverse",
    alignItems: "flex-start",
    justifyContent: "space-between",
    margin: 20,
    bottom: 755,
  },
  pictureButton: {
    alignItems: "center",
    justifyContent: "center",
    bottom: 85,
  },
});
