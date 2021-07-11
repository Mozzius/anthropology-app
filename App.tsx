import * as React from "react";
import { LogBox } from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import firebase from "firebase/app";
import "./firebase";

import Main from "./screens/main";
import Auth from "./screens/authentication";

LogBox?.ignoreLogs(["Setting a timer"]);

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export type AuthUser = {
  uid: string;
  email: string;
};

const App: React.FC = () => {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [loading, setLoading] = React.useState(true);

  // log in
  React.useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged(newUser => {
      setLoading(false);
      setUser(newUser);
    });
    return unsub;
  }, []);

  return (
    <NavigationContainer
    >
      {loading ? null : user !== null ? (
        <Main user={user} />
      ) : (
        <Auth setUser={setUser} />
      )}
    </NavigationContainer>
  );
};

export default App;
