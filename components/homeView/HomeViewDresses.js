import React from "react";
import { StyleSheet, View } from "react-native";
import Image from "react-native-image-progress";
import * as Progress from "react-native-progress";

const HomeViewDresses = ({ id, userId, timeStamp, imageUrl, color, size }) => {
  return (
    <View style={styles.pictureContainer}>
      <Image
        style={{
          width: "100%",
          height: "90%",
          resizeMode: "cover",
          borderRadius: 5,
        }}
        source={{ uri: imageUrl }}
        indicator={Progress.CircleSnail}
        indicatorProps={{
          position: "absolute",
          size: 50,
          color: "#fa79a0",
        }}
      />
    </View>
  );
};

export default HomeViewDresses;

const styles = StyleSheet.create({
  pictureContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: 190,
    height: 290,
    top: 20,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});
