import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import firebase from "firebase/app";

import { InfoStackParamList } from ".";
import { UserContext } from "../User";
import Screen from "../../../components/Screen";
import Button from "../../../components/Button";

const styles = StyleSheet.create({
  section: {
    marginTop: 15,
  },
  bold: {
    fontWeight: "bold",
  },
});

export interface MyInfoProps {
  navigation: StackNavigationProp<InfoStackParamList, "My Info">;
}

const MyInfo: React.FC<MyInfoProps> = ({ navigation }) => {
  const user = React.useContext(UserContext);
  return (
    <Screen>
      <View style={styles.section}>
        <Text style={styles.bold}>Name:</Text>
        <Text>{user.name}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.bold}>Email:</Text>
        <Text>{user.email}</Text>
      </View>
      <Button
        title="Sign out"
        onPress={() => {
          firebase.auth().signOut();
        }}
      />
      <Button
        title="Reset Password"
        onPress={() => {
          firebase.auth().sendPasswordResetEmail(user.email);
          navigation.navigate("Password Reset");
        }}
      />
    </Screen>
  );
};

export default MyInfo;
