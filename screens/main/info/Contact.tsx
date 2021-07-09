import * as React from "react";
import { Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from ".";
import Screen from "../../../components/Screen";

export interface ContactProps {
  navigation: StackNavigationProp<StackParamList, "Contact">;
}

const Contact: React.FC<ContactProps> = ({ navigation }) => {
  return (
    <Screen>
      <Text>WIP</Text>
    </Screen>
  );
};

export default Contact;
