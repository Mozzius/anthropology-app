import * as React from "react";
import { Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { InfoStackParamList } from ".";
import Screen from "../../../components/Screen";
import Card from "../../../components/Card";
import useFirebase from "../../../hooks/useFirebase";

type Conversion = {
  id: string;
  name: string;
  lastMessage: string;
  lastSent: number;
};

export interface ContactProps {
  navigation: StackNavigationProp<InfoStackParamList, "Messages">;
}

const Contact: React.FC<ContactProps> = ({ navigation }) => {
  const conversations = useFirebase<Conversion>("/conversations");

  return (
    <Screen>
      {conversations.map(conversation => (
        <Card
          title={conversation.name}
          key={conversation.id}
          onPress={() =>
            navigation.navigate("Contact", {
              name: conversation.name,
              id: conversation.id,
            })
          }
        >
          <Text>{conversation.lastMessage}</Text>
        </Card>
      ))}
    </Screen>
  );
};

export default Contact;
