import * as React from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import firebase from "firebase/app";

import { InfoStackParamList } from ".";
import Screen from "../../../components/Screen";
import { UserContext } from "../User";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";

const styles = StyleSheet.create({
  info: {
    marginTop: 15,
  },
});

export interface AskProps {
  navigation: StackNavigationProp<InfoStackParamList, "Ask">;
}

const Ask: React.FC<AskProps> = ({ navigation }) => {
  const user = React.useContext(UserContext);
  const [question, setQuestion] = React.useState("");

  return (
    <Screen>
      <ScrollView>
        <TextInput
          label="Question"
          value={question}
          onChangeText={setQuestion}
          multiline
        />
        <Text style={styles.info}>
          Your question will be asked anonymously, and will be displayed
          publicly when it has been answered.
        </Text>
        <Button
          title="Submit"
          onPress={() => {
            firebase
              .database()
              .ref(`/questions`)
              .push({ question, questionAuthor: user.uid, anonymous: true });
            navigation.navigate("FAQs");
          }}
        />
      </ScrollView>
    </Screen>
  );
};

export default Ask;
