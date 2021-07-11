import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableNativeFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import firebase from "firebase/app";

import Screen from "../../../components/Screen";
import { UserContext } from "../User";
import Button from "../../../components/Button";
import { StackNavigationProp } from "@react-navigation/stack";
import { StampStackParamList } from ".";
import useFirebase from "../../../hooks/useFirebase";

const styles = StyleSheet.create({
  text: {
    marginTop: 15,
    fontSize: 16,
  },
  scroll: {
    flex: 1,
    marginVertical: 15,
    borderRadius: 10,
    backgroundColor: "#852092",
  },
  stamps: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    padding: 10,
  },
  container: {
    flex: 1,
    minWidth: 90,
    alignItems: "center",
    margin: 10,
  },
  stamp: {
    height: 60,
    width: 60,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    color: "white",
    marginTop: 15,
  },
});

type Stamp = {
  id: string;
  name: string;
  description: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
};

// firebase.database().ref("/stamps").push({
//   name: "Visiting Kess",
//   description: "cute doggie",
//   icon: "dog",
//   color: "#16bfc5",
// });

export interface StampbookProps {
  navigation: StackNavigationProp<StampStackParamList, "Stampbook">;
}

const Stampbook: React.FC<StampbookProps> = ({ navigation }) => {
  const stamps = useFirebase<Stamp>("/stamps");
  const user = React.useContext(UserContext);

  return (
    <Screen>
      <Text style={styles.text}>
        Attend Anthropology Society socials to get stamps for your stamp book!
      </Text>
      <Button
        title="Scan QR code"
        onPress={() => {
          navigation.navigate("Scanner");
        }}
      />
      <ScrollView style={styles.scroll}>
        <View style={styles.stamps}>
          {stamps.map(stamp => {
            const attended = user.stamps[stamp.id]?.attended ?? false;

            return (
              <View key={stamp.id} style={styles.container}>
                <TouchableNativeFeedback
                  onPress={() => {
                    firebase
                      .database()
                      .ref(`/users/${user.uid}/stamps/${stamp.id}`)
                      .set({ attended: !attended });
                  }}
                >
                  <View
                    style={[
                      styles.stamp,
                      { backgroundColor: attended ? stamp.color : "#eeeeee" },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={stamp.icon}
                      size={30}
                      color="white"
                    />
                  </View>
                </TouchableNativeFeedback>
                <Text style={styles.name}>{stamp.name}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </Screen>
  );
};

export default Stampbook;
