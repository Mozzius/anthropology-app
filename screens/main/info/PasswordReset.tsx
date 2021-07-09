import * as React from "react";
import { Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import firebase from "firebase/app";

import { StackParamList } from ".";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import Screen from "../../../components/Screen";

export interface PasswordResetProps {
  navigation: StackNavigationProp<StackParamList, "Password Reset">;
}

const PasswordReset: React.FC<PasswordResetProps> = ({ navigation }) => {
  const [code, setCode] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <Screen>
      <Text>Password Reset</Text>
      <TextInput
        secureTextEntry
        label="New Password"
        value={password}
        onChangeText={setPassword}
      />
      <Text>A reset code has been sent to your Kent email</Text>
      <TextInput label="Reset code" value={code} onChangeText={setCode} />
      <Button
        title="Submit"
        onPress={() => {
          firebase.auth().confirmPasswordReset(code, password);
        }}
      />
    </Screen>
  );
};

export default PasswordReset;
