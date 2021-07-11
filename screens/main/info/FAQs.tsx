import * as React from "react";
import { Text, ScrollView, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import useFirebase, { useFirebaseValue } from "../../../hooks/useFirebase";
import { InfoStackParamList } from ".";
import Screen from "../../../components/Screen";
import { UserContext } from "../User";
import Button from "../../../components/Button";
import Card from "../../../components/Card";

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
  },
});

export type Question = {
  id: string;
  question: string;
  questionAuthor: string;
  anonymous: boolean;
  answer?: string;
  answerAuthor?: string;
};

interface QuestionCardProps {
  question: Question;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const { name = "" } =
    useFirebaseValue(`/users/${question.answerAuthor}`) ?? {};

  return (
    <Card key={question.id} title={question.question}>
      <Text>
        Answered by <Text style={styles.bold}>{name}</Text>:
      </Text>
      <Text>{question.answer}</Text>
    </Card>
  );
};

export interface FAQsProps {
  navigation: StackNavigationProp<InfoStackParamList, "FAQs">;
}

const FAQs: React.FC<FAQsProps> = ({ navigation }) => {
  const questions = useFirebase<Question>("/questions");
  const user = React.useContext(UserContext);

  return (
    <Screen>
      <ScrollView>
        <Button
          title="Ask a question"
          onPress={() => {
            navigation.navigate("Ask");
          }}
        />
        {questions
          .filter(q => q.answer && q.answerAuthor)
          .map(question => (
            <QuestionCard key={question.id} question={question} />
          ))}
        {user.committee &&
          questions
            .filter(q => !(q.answer && q.answerAuthor))
            .map(question => (
              <Card key={question.id} title={question.question}>
                <Button
                  title="Answer"
                  onPress={() => {
                    console.log(question);
                    navigation.navigate("Answer", {
                      id: question.id,
                    });
                  }}
                />
              </Card>
            ))}
      </ScrollView>
    </Screen>
  );
};

export default FAQs;
