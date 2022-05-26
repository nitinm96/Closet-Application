import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import FooterNav from "../components/FooterNav";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import { Header } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { resetCameraImage } from "../slices/cameraSlice";
import { useNavigation } from "@react-navigation/native";
import BottomsPhoto from "../components/renderPhotos/BottomsPhoto";
import ImageView from "react-native-image-viewing";

const bottomsScreen = () => {
  const navigation = useNavigation();

  const [bottomPhotos, setBottomPhotos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectImageView, setSelectImageView] = useState("");
  const { user } = useAuth();
  const dispatch = useDispatch();

  const takePhotoAgain = () => {
    navigation.navigate("Camera", dispatch(resetCameraImage()));
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "bottoms"), where("userId", "==", user.uid)),
      (snapshot) => {
        setBottomPhotos(snapshot.docs);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [db]);

  return (
    <View style={styles.container}>
      <Header
        containerStyle={{
          height: 110,
          backgroundColor: "white",
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 10,
        }}
        rightComponent={
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ marginRight: 20, bottom: 6 }}
            onPress={takePhotoAgain}
          >
            <Ionicons name="camera" color="black" size={45} />
          </TouchableOpacity>
        }
        centerComponent={
          <View style={styles.bannerStyle}>
            <Text
              style={{
                fontSize: 25,
                color: "white",
                fontWeight: "700",
              }}
            >
              Bottoms
            </Text>
          </View>
        }
      />
      <FlatList
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 100,
        }}
        numColumns={2}
        data={bottomPhotos}
        keyExtractor={(item) => item.data().id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setModalVisible(true);
              setSelectImageView(item.data().imageUrl);
            }}
          >
            <BottomsPhoto
              imageUrl={item.data().imageUrl}
              id={item.id}
              size={item.data().size}
            />
            {selectImageView ? (
              <ImageView
                imageIndex={0}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                images={[{ uri: selectImageView }]}
              />
            ) : null}
          </TouchableOpacity>
        )}
      />

      <FooterNav />
    </View>
  );
};

export default bottomsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFD6cF",
  },
  picContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  bannerStyle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fa79a0",
    width: 200,
    paddingVertical: 5,
    borderRadius: 25,
  },
});
