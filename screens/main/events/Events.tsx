import * as React from "react";
import { Text, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { InfoStackParamList } from ".";
import Screen from "../../../components/Screen";
import { UserContext } from "../User";
import Button from "../../../components/Button";
import useFirebase from "../../../hooks/useFirebase";
import Card from "../../../components/Card";
import { format } from "date-fns";
import { ScrollView } from "react-native";

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
    marginTop: 5,
  },
});

export type Event = {
  id: string;
  name: string;
  description: string;
  location: string;
  date: number;
  time: string;
};

export interface EventsProps {
  navigation: StackNavigationProp<InfoStackParamList, "Events">;
}

const Events: React.FC<EventsProps> = ({ navigation }) => {
  const user = React.useContext(UserContext);
  const events = useFirebase<Event>(`/events`);

  return (
    <Screen>
      <ScrollView>
        {events
          .sort((a, b) => a.date - b.date)
          .map(event => (
            <Card
              title={event.name}
              key={event.id}
              onPress={
                user.committee
                  ? () => {
                      navigation.navigate("Edit Event", { event });
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
          ))}
        {user.committee && (
          <Button
            title="add an event"
            onPress={() => {
              navigation.navigate("Add Event", { event: undefined });
            }}
          />
        )}
      </ScrollView>
    </Screen>
  );
};

export default Events;
