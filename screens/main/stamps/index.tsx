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

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
  },
  subtitle: {
    fontSize: 18,
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
  uid: string;
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

const Stamps: React.FC = () => {
  const [stamps, setStamps] = React.useState<Stamp[]>([]);
  const user = React.useContext(UserContext);

  React.useEffect(() => {
    const stampsRef = firebase.database().ref("/stamps");
    const getStamps = snapshot => {
      const values = snapshot.val();
      setStamps(Object.keys(values).map(key => ({ uid: key, ...values[key] })));
    };
    stampsRef.on("value", getStamps);
    return () => stampsRef.off("value", getStamps);
  }, [user.stamps]);

  return (
    <Screen full>
      <Text style={styles.title}>Stamps</Text>
      <Text style={styles.subtitle}>
        Attend Anthropology Society socials to get stamps for your stamp book!
      </Text>
      <ScrollView style={styles.scroll}>
        <View style={styles.stamps}>
          {stamps.map(stamp => {
            const attended = user.stamps[stamp.uid]?.attended ?? false;

            return (
              <View key={stamp.uid} style={styles.container}>
                <TouchableNativeFeedback
                  onPress={() => {
                    firebase
                      .database()
                      .ref(`/users/${user.uid}/stamps/${stamp.uid}`)
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

export default Stamps;
