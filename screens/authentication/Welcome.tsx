import * as React from "react";
import { Text, StyleSheet, Image, KeyboardAvoidingView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { AuthStackParamList } from ".";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Screen from "../../components/Screen";
import logo from "../../assets/anthsoc-logo.png";

const styles = StyleSheet.create({
  image: {
    alignSelf: "center",
    height: 250,
    width: 250,
    marginVertical: 20,
  },
  forgot: {
    textAlign: "center",
    marginTop: 25,
  },
});

export interface WelcomeProps {
  navigation: StackNavigationProp<AuthStackParamList, "Welcome">;
}

const Welcome: React.FC<WelcomeProps> = ({ navigation }) => {
  const [email, setEmail] = React.useState("");

  return (
    <Screen>
      <KeyboardAvoidingView behavior="position">
        <Image source={logo} style={styles.image} />
        <Text>Welcome to the Anthropology Society app!</Text>
        <TextInput
          label="Kent Email"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />
        <Button
          title="Sign In"
          disabled={email.slice(-11) !== "@kent.ac.uk"}
          onPress={() => {
            navigation.navigate("Sign In", { email });
          }}
        />
        <Button
          title="Sign Up"
          disabled={email.slice(-11) !== "@kent.ac.uk"}
          onPress={() => {
            navigation.navigate("Sign Up", { email });
          }}
        />
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default Welcome;
