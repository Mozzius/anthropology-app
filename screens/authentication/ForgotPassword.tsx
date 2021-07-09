import * as React from "react";
import { Text, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import firebase from "firebase/app";

import { AuthStackParamList } from ".";
import Screen from "../../components/Screen";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginTop: 15,
  },
});

export interface ForgotPasswordProps {
  route: RouteProp<AuthStackParamList, "Forgot Password">;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  route: {
    params: { email: emailProp },
  },
}) => {
  const [email, setEmail] = React.useState(emailProp);
  const [sent, setSent] = React.useState(false);

  return (
    <Screen>
      {sent ? (
        <Text style={styles.text}>
          A link to reset your password has been sent to {email}
        </Text>
      ) : (
        <>
          <TextInput label="Kent Email" value={email} onChangeText={setEmail} />
          <Button
            title="Reset"
            disabled={email.slice(-11) !== "@kent.ac.uk"}
            onPress={() => {
              firebase.auth().sendPasswordResetEmail(email);
              setSent(true);
            }}
          />
        </>
      )}
    </Screen>
  );
};

export default ForgotPassword;
