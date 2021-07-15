import * as React from "react";
import {
  KeyboardAvoidingView,
  Text,
  View,
  StyleSheet,
  TouchableNativeFeedback,
  ScrollView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import firebase from "firebase/app";

import { InfoStackParamList } from ".";
import useFirebase, { useFirebaseValue } from "../../../hooks/useFirebase";
import { User, UserContext } from "../User";
import TextInput from "../../../components/TextInput";

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%" },
  messages: {
    flex: 1,
    flexGrow: 1,
    width: "100%",
    alignItems: "flex-start",
  },
  message: {
    marginTop: 5,
    maxWidth: "75%",
    paddingHorizontal: 10,
  },
  sentMessage: {
    marginTop: 5,
    maxWidth: "75%",
    paddingHorizontal: 10,
    alignSelf: "flex-end",
  },
  author: {
    marginTop: 10,
    paddingLeft: 5,
    paddingBottom: 3,
  },
  sentAuthor: {
    marginTop: 10,
    paddingHorizontal: 5,
    paddingBottom: 3,
    textAlign: "right",
  },
  content: {
    borderRadius: 5,
    backgroundColor: "#ddd",
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf:"flex-start"
  },
  sentContent: {
    borderRadius: 5,
    backgroundColor: "#66388c",
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf:"flex-end"
  },
  text: {
    color: "#000",
  },
  sentText: {
    color: "#fff",
  },
  send: {
    padding: 5,
    backgroundColor: "white",
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sendText: {
    alignSelf: "center",
    paddingHorizontal: 15,
  },
  centered: {
    paddingVertical: 30,
    textAlign: "center",
    alignSelf: "stretch",
  },
});

type Message = {
  id: string;
  sent: number;
  author: string;
  content: string;
};

export interface MessageProps {
  message: Message;
  previous?: Message;
  user: User;
}

const Message: React.FC<MessageProps> = ({ message, user, previous }) => {
  const author = useFirebaseValue<User>(`/users/${message.author}`, {});

  const sent = user.uid === message.author;
  const prev = previous?.author === message.author;

  return (
    <View style={sent ? styles.sentMessage : styles.message}>
      {prev || <Text style={sent ? styles.sentAuthor: styles.author}>{author.name}</Text>}
      <View style={sent ? styles.sentContent : styles.content}>
        <Text style={sent ? styles.sentText : styles.text}>
          {message.content}
        </Text>
      </View>
    </View>
  );
};

export interface ContactProps {
  navigation: StackNavigationProp<InfoStackParamList, "Contact">;
  route: RouteProp<InfoStackParamList, "Contact">;
}

const Contact: React.FC<ContactProps> = ({
  navigation,
  route: {
    params: { name, id },
  },
}) => {
  const user = React.useContext(UserContext);
  const messages = useFirebase<Message>(`/messages/${id}`);
  const [message, setMessage] = React.useState<string>("");

  React.useEffect(() => {
    navigation.setOptions({ headerTitle: name ?? "Contact the Committee" });
  }, [name]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={styles.messages}>
        {messages.length > 0 ? (
          <>
            <Text style={styles.centered}>Start of your conversation</Text>
            {messages
              .sort((a, b) => a.sent - b.sent)
              .map((message, i) => (
                <Message
                  message={message}
                  user={user}
                  previous={messages[i - 1]}
                  key={message.id}
                />
              ))}
          </>
        ) : (
          <Text style={styles.centered}>Send a message to the committee</Text>
        )}
      </ScrollView>
      <View style={styles.send}>
        <TextInput
          multiline
          value={message}
          onChangeText={setMessage}
          containerStyle={{ flexGrow: 1 }}
        />
        <TouchableNativeFeedback
          onPress={() => {
            const time = Date.now();
            const db = firebase.database();
            db.ref(`/messages/${id}`).push(
              {
                sent: time,
                author: user.uid,
                content: message,
              },
              () => {
                db.ref(`/conversations/${id}`).set({
                  name: name ?? user.name,
                  lastMessage: message,
                  lastSend: time,
                });
                setMessage("");
              }
            );
          }}
        >
          <Text style={styles.sendText}>Send</Text>
        </TouchableNativeFeedback>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Contact;
