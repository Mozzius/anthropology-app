import * as React from "react";
import { Text, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import firebase from "firebase/app";

import { AuthStackParamList } from ".";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Screen from "../../components/Screen";
import Error from "../../components/Error";

const styles = StyleSheet.create({
  forgot: {
    textAlign: "center",
    marginTop: 25,
  },
});

export interface SignInProps {
  navigation: StackNavigationProp<AuthStackParamList, "Sign In">;
}

const SignIn: React.FC<SignInProps> = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  return (
    <Screen>
      <Error message={error} />
      <TextInput
        label="Kent Email"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        label="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Button
        title="Next"
        disabled={loading || !password || email.slice(-11) !== "@kent.ac.uk"}
        onPress={() => {
          setError(null);
          setLoading(true);
          firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(creds => {
              setLoading(false);
            })
            .catch(err => {
              setLoading(false);
              switch (err.code) {
                case "auth/user-not-found":
                  navigation.navigate("Sign Up", { email, password });
                  break;
                case "auth/invalid-email":
                  setError("Your email is invalid");
                  break;
                case "auth/user-disabled":
                  setError("Your account has been disabled");
                  break;
                case "auth/wrong-password":
                  setError("Incorrect password");
                  break;
                default:
                  console.error(err.message);
                  break;
              }
            });
        }}
      />
      <Text
        style={styles.forgot}
        onPress={() => navigation.navigate("Forgot Password", { email })}
      >
        Forgotten password?
      </Text>
    </Screen>
  );
};

export default SignIn;
