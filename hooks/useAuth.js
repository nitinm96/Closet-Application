import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { auth } from "../firebase";

const AuthContext = createContext({});

const config = {
  iosClientId:
    "163159473008-h5e4gk9mh7amg55qkj44r2suohoo29tg.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  permissions: ["public_profile"],
};

GoogleSignin.configure({
  webClientId: "163159473008-h5e4gk9mh7amg55qkj44r2suohoo29tg.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
});
export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState();
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
        setLoadingInitial(false);
      }),
    []
  );

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, googleCredential);
      setUser(auth.currentUser);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  // const signInWithGoogle = async () => {
  //   setLoading(true);
  //   await Google.logInAsync(config)
  //     .then(async (loginResult) => {
  //       if (loginResult.type === "success") {
  //         //login
  //         const { idToken, accessToken } = loginResult;
  //         const credential = GoogleAuthProvider.credential(
  //           idToken,
  //           accessToken
  //         );
  //         await signInWithCredential(auth, credential);
  //       }
  //       return Promise.reject();
  //     })
  //     .catch((error) => setError(error))
  //     .finally(() => setLoading(false));
  // };

  const signOut = async () => {
  try {
    await GoogleSignin.signOut();
    setUser(null); // Remember to remove the user from your app's state as well
  } catch (error) {
    console.error(error);
  }
};
  // const logout = () => {
  //   setLoading(true);
  //   signOut(auth)
  //     .catch((error) => setError(error))
  //     .finally(() => setLoading(false));
  // };

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      //signInWithGoogle,
      //logout,
      signIn,
      signOut
    }),
    [user, loading, error,signIn,signOut]
  );
  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
