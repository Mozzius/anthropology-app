import * as React from "react";
import { KeyboardAvoidingView, SafeAreaView, Text } from "react-native";
import { RouteProp } from "@react-navigation/native";
import firebase from "firebase/app";

import { AuthStackParamList } from ".";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Screen from "../../components/Screen";
import Error from "../../components/Error";

export interface SignUpProps {
  route: RouteProp<AuthStackParamList, "Sign Up">;
}

const SignUp: React.FC<SignUpProps> = ({
  route: {
    params: { email },
  },
}) => {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeat, setRepeat] = React.useState("");
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  return (
    <Screen>
      <KeyboardAvoidingView behavior="position">
        <Error message={error} />
        <TextInput label="Full Name" onChangeText={setName} value={name} />
        <TextInput
          label="Password"
          onChangeText={setPassword}
          value={password}
        />
        <TextInput
          label="Repeat Password"
          onChangeText={setRepeat}
          value={repeat}
        />
        <Button
          title="Next"
          disabled={
            loading ||
            !password ||
            password !== repeat ||
            email.slice(-11) !== "@kent.ac.uk"
          }
          onPress={() => {
            setError(null);
            setLoading(true);
            firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then(creds => {
                setLoading(false);
                firebase
                  .database()
                  .ref(`/users/${creds.user.uid}`)
                  .set({ name, committee: false });
              })
              .catch(err => {
                setLoading(false);
                switch (err.code) {
                  case "auth/email-already-in-use":
                    setError("Your email is already in use");
                    break;
                  case "auth/invalid-email":
                    setError("Your email is invalid");
                    break;
                  case "auth/operation-not-allowed":
                    setError("Something went wrong");
                    break;
                  case "auth/weak-password":
                    setError(
                      "Password is not strong enough. Add additional characters including special characters and numbers."
                    );
                    break;
                  default:
                    console.error(err.message);
                    break;
                }
              });
          }}
        />
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default SignUp;
