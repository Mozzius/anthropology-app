import * as React from "react";
import { Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { StackParamList } from ".";
import Screen from "../../../components/Screen";

export interface PasswordResetProps {
  navigation: StackNavigationProp<StackParamList, "Password Reset">;
}

const PasswordReset: React.FC<PasswordResetProps> = ({ navigation }) => {
  return (
    <Screen>
      <Text>A reset code has been sent to your Kent email</Text>
    </Screen>
  );
};

export default PasswordReset;
