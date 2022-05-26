import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Image from "react-native-image-progress";
import * as Progress from "react-native-progress";
import Ionicons from "react-native-vector-icons/Ionicons";
import { db, storage } from "../../firebase";
import { deleteObject, ref } from "firebase/storage";
import { deleteDoc, doc } from "firebase/firestore";

const ShoesPhoto = ({ id, userId, timeStamp, imageUrl, color, size }) => {
  const imageRef = ref(storage, `shoes/${id}`);
  const deleteImage = async () => {
    await deleteDoc(doc(db, "shoes", id)).then(deleteObject(imageRef));
  };
  return (
    <View style={styles.pictureContainer}>
      <Image
        style={{
          width: "100%",
          height: "90%",
          resizeMode: "cover",
          borderRadius: 5,
          top: 10,
        }}
        source={{ uri: imageUrl }}
        indicator={Progress.CircleSnail}
        indicatorProps={{
          position: "absolute",
          size: 50,
          color: "#fa79a0",
        }}
      />
      <View style={styles.pictureInfoContainer}>
        <Text style={{ color: "black" }}>Size: {size}</Text>
      </View>
      <TouchableOpacity
        style={{
          left: 60,
          bottom: 5,
        }}
      >
        <Ionicons
          name="trash"
          color="#fa79a0"
          size={22}
          onPress={deleteImage}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ShoesPhoto;

const styles = StyleSheet.create({
  pictureContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: 180,
    height: 310,
    top: 20,
    padding: 15,
    marginBottom: 30,
    marginHorizontal: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  pictureInfoContainer: {
    top: 18,
    right: 17,
    width: 100,
    height: 20,
    backgroundColor: "#fa79a0",
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingTop: 2,
  },
});
