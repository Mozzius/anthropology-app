import * as React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import firebase from "firebase/app";
import DateTimePicker from "@react-native-community/datetimepicker";

import { InfoStackParamList } from ".";
import Screen from "../../../components/Screen";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import { format } from "date-fns";

const styles = StyleSheet.create({
  label: {
    marginTop: 15,
    marginBottom: 5,
  },
});

export interface EventsProps {
  navigation: StackNavigationProp<InfoStackParamList, "Events">;
}

const Events: React.FC<EventsProps> = ({ navigation }) => {
  const [mode, setMode] = React.useState<null | "date" | "time">(null);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [date, setDate] = React.useState<Date>(new Date());
  const [time, setTime] = React.useState<Date>(new Date());

  const datetime =
    date.valueOf() -
    (date.getHours() * 3600000 +
      date.getMinutes() * 60000 +
      date.getSeconds() * 1000 +
      date.getMilliseconds()) +
    (time.getHours() * 3600000 + time.getMinutes() * 60000);

  return (
    <Screen>
      <KeyboardAvoidingView behavior="position">
        <TextInput label="Event name" value={name} onChangeText={setName} />
        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <TextInput
          label="Location"
          value={location}
          onChangeText={setLocation}
        />
        <Text style={styles.label}>Time</Text>
        <Text>{format(datetime, "MMMM do, h:mm aaaaa'm'")}</Text>
        <Button title="set date" onPress={() => setMode("date")} />
        <Button title="set time" onPress={() => setMode("time")} />
        {mode !== null && (
          <DateTimePicker
            mode={mode}
            value={mode === "date" ? date : time}
            onChange={(evt, selected) => {
              console.log(evt);
              console.log(selected);
              setMode(m => (Platform.OS === "ios" ? m : null));
              mode === "date" ? setDate(selected) : setTime(selected);
            }}
          />
        )}
        <Button
          title="Save"
          onPress={() => {
            firebase
              .database()
              .ref("/events")
              .push({ name, description, location, date: datetime });
            navigation.navigate("Events");
          }}
        />
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default Events;
