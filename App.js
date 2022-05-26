import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./hooks/useAuth";
import { Provider } from "react-redux";
import { store } from "./store";

import Navigation from "./Navigation";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthProvider>
            <Navigation />
          </AuthProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
