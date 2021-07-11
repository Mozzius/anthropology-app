import * as React from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { format } from "date-fns";

import { TabParamList } from "..";
import Card from "../../../components/Card";
import Screen from "../../../components/Screen";
import useFirebase from "../../../hooks/useFirebase";
import { Event } from "../events/Events";
import { UserContext } from "../User";

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 20,
    marginTop: 15,
  },
  bold: {
    fontWeight: "bold",
    marginTop: 5,
  },
});

export interface HomeProps {
  navigation: BottomTabNavigationProp<TabParamList, "Home">;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const user = React.useContext(UserContext);
  const events = useFirebase<Event>("/events");

  const event: Event | null =
    events.length > 0 ? events.sort((a, b) => a.date - b.date)[0] : null;

  return (
    <Screen full>
      <ScrollView>
        <Text style={styles.title}>Hello, {user.name}</Text>
        {event && (
          <>
            <Text style={styles.subtitle}>Next Event</Text>
            <Card
              title={event.name}
              key={event.id}
              onPress={
                user.committee
                  ? () => {
                      navigation.navigate("Events");
                    }
                  : undefined
              }
            >
              <Text>{event.description}</Text>
              <Text style={styles.bold}>When?</Text>
              <Text>
                {format(new Date(event.date), "MMMM do, h:mm aaaaa'm'")}
              </Text>
              <Text style={styles.bold}>Where?</Text>
              <Text>{event.location}</Text>
            </Card>
          </>
        )}
      </ScrollView>
    </Screen>
  );
};

export default Home;
