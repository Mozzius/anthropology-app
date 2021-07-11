import * as React from "react";
import { StackNavigationProp } from "@react-navigation/stack";

import { UserContext } from "../User";
import { InfoStackParamList } from ".";
import Screen from "../../../components/Screen";
import Card from "../../../components/Card";

export interface InfoHomeProps {
  navigation: StackNavigationProp<InfoStackParamList, "Info">;
}

const InfoHome: React.FC<InfoHomeProps> = ({ navigation }) => {
  const user = React.useContext(UserContext);

  return (
    <Screen>
      <Card
        title="Frequently Asked Questions"
        onPress={() => navigation.navigate("FAQs")}
      />
      <Card title="Contact" onPress={() => navigation.navigate("Contact")} />
      <Card title="My Info" onPress={() => navigation.navigate("My Info")} />
      {user.committee && (
        <Card title="Users" onPress={() => navigation.navigate("Users")} />
      )}
    </Screen>
  );
};

export default InfoHome;
