import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import useAuth from "./hooks/useAuth";
import addApparelScreen from "./screens/addApparelScreen";
import bottomsScreen from "./screens/bottomsScreen";
import cameraScreen from "./screens/cameraScreen";
import dressesScreen from "./screens/dressesScreen";
import homeScreen from "./screens/homeScreen";
import loginScreen from "./screens/loginScreen";
import previewScreen from "./screens/previewScreen";
import shoesScreen from "./screens/shoesScreen";
import topsScreen from "./screens/topsScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="Home"
            component={homeScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Camera"
            component={cameraScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Preview"
            component={previewScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddApparel"
            component={addApparelScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tops"
            component={topsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Bottoms"
            component={bottomsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Dresses"
            component={dressesScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Shoes"
            component={shoesScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={loginScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default Navigation;
