import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { InfoStackParamList } from ".";
import Screen from "../../../components/Screen";
import { UserContext } from "../User";
import Button from "../../../components/Button";

const style = StyleSheet.create({});

export interface FAQsProps {
  navigation: StackNavigationProp<InfoStackParamList, "FAQs">;
}

const FAQs: React.FC<FAQsProps> = ({ navigation }) => {
  const user = React.useContext(UserContext);

  React.useEffect(() => {}, []);

  return (
    <Screen>
      <Button
        title="Ask a question"
        onPress={() => {
          navigation.navigate("Ask");
        }}
      />
    </Screen>
  );
};

export default FAQs;
