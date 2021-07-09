import * as React from "react";
import { Text, StyleSheet } from "react-native";
import Screen from "../../../components/Screen";
import { UserContext } from "../User";

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    marginTop: 30,
  },
});

const Home: React.FC = () => {
  const user = React.useContext(UserContext);
  return (
    <Screen full>
      <Text style={styles.title}>Hello, {user.name}</Text>
    </Screen>
  );
};

export default Home;
