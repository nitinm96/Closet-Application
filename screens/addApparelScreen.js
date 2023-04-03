import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import FooterNav from "../components/FooterNav";
import HeaderNav from "../components/HeaderNav";
import useAuth from "../hooks/useAuth";
import { selectCameraImage } from "../slices/cameraSlice";
import uuid from "react-native-uuid";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import Ionicons from "react-native-vector-icons/Ionicons";

const AddApparelScreen = ({ navigation }) => {
  const cameraImage = useSelector(selectCameraImage);
  const { user } = useAuth();
  const id = uuid.v4();
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const windowWidth = Dimensions.get("window").width;

  const uploadImageTops = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", cameraImage, true);
      xhr.send(null);
    });
    const docRef = await addDoc(collection(db, "tops"), {
      id: id,
      userId: user.uid,
      color: color,
      size: size,
      timeStamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `tops/${docRef.id}`);
    const metadata = {
      contentType: "image/jpeg",
    };

    await uploadBytes(imageRef, blob, metadata)
      .then(async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "tops", docRef.id), {
          imageUrl: downloadURL,
        });
        blob.close();
      })
      .then(navigation.navigate("Home"));
  };

  const uploadImageBottoms = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", cameraImage, true);
      xhr.send(null);
    });
    const docRef = await addDoc(collection(db, "bottoms"), {
      id: id,
      userId: user.uid,
      color: color,
      size: size,
      timeStamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `bottoms/${docRef.id}`);
    const metadata = {
      contentType: "image/jpeg",
    };

    await uploadBytes(imageRef, blob, metadata)
      .then(async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "bottoms", docRef.id), {
          imageUrl: downloadURL,
        });
        blob.close();
      })
      .then(navigation.navigate("Home"));
  };

  const uploadImageDresses = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", cameraImage, true);
      xhr.send(null);
    });
    const docRef = await addDoc(collection(db, "dresses"), {
      id: id,
      userId: user.uid,
      color: color,
      size: size,
      timeStamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `dresses/${docRef.id}`);
    const metadata = {
      contentType: "image/jpeg",
    };

    await uploadBytes(imageRef, blob, metadata)
      .then(async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "dresses", docRef.id), {
          imageUrl: downloadURL,
        });
        blob.close();
      })
      .then(navigation.navigate("Home"));
  };

  const uploadImageShoes = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", cameraImage, true);
      xhr.send(null);
    });
    const docRef = await addDoc(collection(db, "shoes"), {
      id: id,
      userId: user.uid,
      color: color,
      size: size,
      timeStamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `shoes/${docRef.id}`);
    const metadata = {
      contentType: "image/jpeg",
    };

    await uploadBytes(imageRef, blob, metadata)
      .then(async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "shoes", docRef.id), {
          imageUrl: downloadURL,
        });
        blob.close();
      })
      .then(navigation.navigate("Home"));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <HeaderNav />

      <ScrollView
        keyboardDismissMode="interactive"
        contentContainerStyle={{ width: windowWidth, paddingBottom: 30 }}
      >
        <View style={styles.photoContainer}>
          <Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
              borderRadius: 15,
            }}
            source={{ uri: cameraImage }}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Size"
            value={size}
            onChangeText={(text) => setSize(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Color"
            value={color}
            onChangeText={(text) => setColor(text)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={uploadImageTops}
          >
            <Ionicons name="add-circle-outline" color={"#fa79a0"} size={30} />

            <Text style={styles.buttonTextStyle}>Add to Tops</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={uploadImageBottoms}
          >
            <Ionicons name="add-circle-outline" color={"#fa79a0"} size={30} />

            <Text style={styles.buttonTextStyle}>Add to Bottoms</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={uploadImageDresses}
          >
            <Ionicons name="add-circle-outline" color={"#fa79a0"} size={30} />

            <Text style={styles.buttonTextStyle}>Add to Dresses</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={uploadImageShoes}
          >
            <Ionicons name="add-circle-outline" color={"#fa79a0"} size={30} />

            <Text style={styles.buttonTextStyle}>Add to Shoes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{ height: -20 }} />

      <FooterNav />
    </KeyboardAvoidingView>
  );
};

export default AddApparelScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFD6cF",
  },
  photoContainer: {
    backgroundColor: "white",
    width: 290,
    height: 460,
    borderRadius: 19,
    marginHorizontal: 70,
    top: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    top: 22,
    marginTop: 10,
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    width: 200,
    marginHorizontal: 115,
    marginTop: 20,
    top: 15,
    height: 35,
    bottom: 5,
  },
  input: {
    fontSize: 18,
    fontWeight: "700",
    width: 200,
    paddingHorizontal: 10,
    height: 35,
    borderRadius: 50,
  },
  buttonStyle: {
    backgroundColor: "white",
    flexDirection: "row",
    padding: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    borderRadius: 15,
    marginHorizontal: 10,
    width: 180,
  },
  buttonTextStyle: {
    fontSize: 18,
    color: "#fa79a0",
    fontWeight: "700",
    marginLeft: 5,
  },
});
