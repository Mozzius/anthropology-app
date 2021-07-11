import * as React from "react";
import { Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import firebase from "firebase/app";

import { InfoStackParamList } from ".";
import Screen from "../../../components/Screen";
import { UserContext } from "../User";
import Button from "../../../components/Button";
import { useFirebaseValue } from "../../../hooks/useFirebase";
import { Question } from "./FAQs";
import TextInput from "../../../components/TextInput";

const styles = StyleSheet.create({
  question: {
    marginTop: 15,
    fontSize: 20,
  },
});

export interface AnswerProps {
  navigation: StackNavigationProp<InfoStackParamList, "Answer">;
  route: RouteProp<InfoStackParamList, "Answer">;
}

const Answer: React.FC<AnswerProps> = ({
  navigation,
  route: {
    params: { id },
  },
}) => {
  const user = React.useContext(UserContext);
  const question = useFirebaseValue<Question>(`/questions/${id}`) ?? {
    question: "Loading...",
  };
  const [answer, setAnswer] = React.useState("");

  return (
    <Screen>
      <KeyboardAvoidingView>
        <Text style={styles.question}>{question.question}</Text>
        <TextInput
          label="Your answer"
          value={answer}
          onChangeText={setAnswer}
          multiline
        />
        <Button
          title="Submit Answer"
          onPress={() => {
            firebase.database().ref(`/questions/${id}/answer`).set(answer);
            firebase
              .database()
              .ref(`/questions/${id}/answerAuthor`)
              .set(user.uid);
            navigation.navigate("FAQs");
          }}
        />
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default Answer;
