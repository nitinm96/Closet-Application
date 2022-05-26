import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import FooterNav from "../components/FooterNav";
import HeaderNav from "../components/HeaderNav";
import HomeViewPhotos from "../components/HomeViewPhotos";
import useAuth from "../hooks/useAuth";

const homeScreen = () => {
  const navigation = useNavigation();

  const { user, logout } = useAuth();
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <HeaderNav />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <HomeViewPhotos />
      </ScrollView>
      <FooterNav />
    </View>
  );
};

export default homeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFD6cF",
  },
});
