import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";

import HomeViewTops from "./homeView/HomeViewTops";
import HomeViewBottoms from "./homeView/HomeViewBottoms";
import HomeViewDresses from "./homeView/HomeViewDresses";
import HomeViewShoes from "./homeView/HomeViewShoes";

const HomeViewPhotos = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  //TOPS

  const [topPhotos, setTopPhotos] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "tops"), where("userId", "==", user.uid)),
      (snapshot) => {
        setTopPhotos(snapshot.docs);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [db]);

  //BOTTOMS

  const [bottomPhotos, setBottomPhotos] = useState([]);

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

  //DRESSES

  const [dressPhotos, setDressPhotos] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "dresses"), where("userId", "==", user.uid)),
      (snapshot) => {
        setDressPhotos(snapshot.docs);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [db]);

  //SHOES

  const [shoePhotos, setShoePhotos] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "shoes"), where("userId", "==", user.uid)),
      (snapshot) => {
        setShoePhotos(snapshot.docs);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [db]);

  return (
    <View style={styles.container}>
      {/*TOPS */}
      <TouchableOpacity
        style={styles.bannerButton}
        onPress={() => navigation.navigate("Tops")}
      >
        <Text style={styles.bannerText}>Tops</Text>
      </TouchableOpacity>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "flex-start",
          paddingBottom: 30,
        }}
        horizontal={true}
        numColumns={1}
        data={topPhotos}
        keyExtractor={(item) => item.data().id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate("Tops")}
          >
            <HomeViewTops imageUrl={item.data().imageUrl} id={item.id} />
          </TouchableOpacity>
        )}
      />
      {/*BOTTOMS */}
      <TouchableOpacity
        style={styles.bannerButton}
        onPress={() => navigation.navigate("Bottoms")}
      >
        <Text style={styles.bannerText}>Bottoms</Text>
      </TouchableOpacity>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "flex-start",
          paddingBottom: 30,
        }}
        horizontal={true}
        numColumns={1}
        data={bottomPhotos}
        keyExtractor={(item) => item.data().id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate("Bottoms")}
          >
            <HomeViewBottoms imageUrl={item.data().imageUrl} id={item.id} />
          </TouchableOpacity>
        )}
      />

      {/*DRESSES */}

      <TouchableOpacity
        style={styles.bannerButton}
        onPress={() => navigation.navigate("Dresses")}
      >
        <Text style={styles.bannerText}>Dresses</Text>
      </TouchableOpacity>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "flex-start",
          paddingBottom: 30,
        }}
        horizontal={true}
        numColumns={1}
        data={dressPhotos}
        keyExtractor={(item) => item.data().id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate("Dresses")}
          >
            <HomeViewDresses imageUrl={item.data().imageUrl} id={item.id} />
          </TouchableOpacity>
        )}
      />

      {/*SHOES */}

      <TouchableOpacity
        style={styles.bannerButton}
        onPress={() => navigation.navigate("Shoes")}
      >
        <Text style={styles.bannerText}>Shoes</Text>
      </TouchableOpacity>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "flex-start",
          paddingBottom: 30,
        }}
        horizontal={true}
        numColumns={1}
        data={shoePhotos}
        keyExtractor={(item) => item.data().id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate("Shoes")}
          >
            <HomeViewShoes imageUrl={item.data().imageUrl} id={item.id} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeViewPhotos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 100,
  },
  bannerButton: {
    backgroundColor: "#fa79a0",
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    borderRadius: 50,
    paddingVertical: 5,
  },
  bannerText: {
    fontSize: 30,
    color: "white",
    paddingHorizontal: 10,
    fontWeight: "700",
  },
});
