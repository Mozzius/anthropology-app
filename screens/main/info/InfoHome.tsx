import * as React from "react";
import { Text, TouchableNativeFeedback, StyleSheet, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { StackParamList } from ".";
import Screen from "../../../components/Screen";

const styles = StyleSheet.create({
  section: {
    marginTop: 15,
    backgroundColor: "#ffffff",
    borderRadius: 3,
    padding: 15,
    borderWidth: 1,
    borderColor: "#cccccc",
  },
  title: {
    fontSize: 18,
  },
});

export interface InfoHomeProps {
  navigation: StackNavigationProp<StackParamList, "Info">;
}

const InfoHome: React.FC<InfoHomeProps> = ({ navigation }) => {
  return (
    <Screen>
      <TouchableNativeFeedback onPress={() => navigation.navigate("FAQs")}>
        <View style={styles.section}>
          <Text style={styles.title}>Frequently Asked Questions</Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={() => navigation.navigate("Contact")}>
        <View style={styles.section}>
          <Text style={styles.title}>Contact the Committee</Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={() => navigation.navigate("My Info")}>
        <View style={styles.section}>
          <Text style={styles.title}>My Info</Text>
        </View>
      </TouchableNativeFeedback>
    </Screen>
  );
};

export default InfoHome;
