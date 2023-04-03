import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import useAuth from "./hooks/useAuth";
import AddApparelScreen from "./screens/AddApparelScreen";
import BottomsScreen from "./screens/BottomsScreen";
import CameraScreen from "./screens/CameraScreen";
import DressesScreen from "./screens/DressesScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import PreviewScreen from "./screens/PreviewScreen";
import ShoesScreen from "./screens/ShoesScreen";
import TopsScreen from "./screens/TopsScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Camera"
            component={CameraScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Preview"
            component={PreviewScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddApparel"
            component={AddApparelScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tops"
            component={TopsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Bottoms"
            component={BottomsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Dresses"
            component={DressesScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Shoes"
            component={ShoesScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default Navigation;
