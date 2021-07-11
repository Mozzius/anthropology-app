import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";


import { InfoStackParamList } from ".";
import Screen from "../../../components/Screen";
import { UserContext } from "../User";
import Button from "../../../components/Button";
const style = StyleSheet.create({});

export interface AnswerProps {
  navigation: StackNavigationProp<InfoStackParamList, "Answer">;
  route: RouteProp<InfoStackParamList, "Answer">;
}

const Answer: React.FC<AnswerProps> = ({ navigation }) => {
  const user = React.useContext(UserContext);

  React.useEffect(() => {}, []);

  return (
    <Screen>
      <Button
        title="Answer a question"
        onPress={() => {
          navigation.navigate("Answer");
        }}
      />
    </Screen>
  );
};

export default Answer;
