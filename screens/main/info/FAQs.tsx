import * as React from "react";
import { Text, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from ".";

export interface FAQsProps {
  navigation: StackNavigationProp<StackParamList, "FAQs">;
}

const FAQs: React.FC<FAQsProps> = ({ navigation }) => {
  return (
    <View>
      <Text>Frequently Asked Questions</Text>
    </View>
  );
};

export default FAQs;
