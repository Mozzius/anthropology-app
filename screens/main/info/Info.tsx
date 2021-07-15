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
      {user.committee ? (
        <Card
          title="Messages"
          onPress={() => navigation.navigate("Messages")}
        />
      ) : (
        <Card
          title="Contact the Committee"
          onPress={() => navigation.navigate("Contact", { id: user.uid })}
        />
      )}
      <Card title="My Info" onPress={() => navigation.navigate("My Info")} />
      {user.committee && (
        <Card title="Users" onPress={() => navigation.navigate("Users")} />
      )}
    </Screen>
  );
};

export default InfoHome;
