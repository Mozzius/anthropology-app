import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { UserContext } from "../User";
import Info from "./Info";
import FAQs from "./FAQs";
import Contact from "./Contact";
import MyInfo from "./MyInfo";
import PasswordReset from "./PasswordReset";
import Ask from "./Ask";
import Answer from "./Answer";
import Users from "./Users";

export type InfoStackParamList = {
  Info: undefined;
  FAQs: undefined;
  Contact: undefined;
  "My Info": undefined;
  "Password Reset": undefined;
  Ask: undefined;
  Answer: { id: string };
  Users: undefined;
};

const Stack = createStackNavigator<InfoStackParamList>();

const InfoStack: React.FC = () => {
  const user = React.useContext(UserContext);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Info" component={Info} />
      <Stack.Screen
        name="FAQs"
        component={FAQs}
        options={{ title: "Frequently Asked Questions" }}
      />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="My Info" component={MyInfo} />
      <Stack.Screen name="Password Reset" component={PasswordReset} />
      <Stack.Screen name="Ask" component={Ask} />
      <Stack.Screen name="Answer" component={Answer} />
      {user.committee && <Stack.Screen name="Users" component={Users} />}
    </Stack.Navigator>
  );
};

export default InfoStack;
