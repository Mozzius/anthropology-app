import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import InfoHome from "./InfoHome";
import FAQs from "./FAQs";
import Contact from "./Contact";
import MyInfo from "./MyInfo";
import PasswordReset from "./PasswordReset";

export type StackParamList = {
  Info: undefined;
  FAQs: undefined;
  Contact: undefined;
  "My Info": undefined;
  "Password Reset": undefined;
};

const Stack = createStackNavigator<StackParamList>();

const Info: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Info" component={InfoHome} />
      <Stack.Screen name="FAQs" component={FAQs} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="My Info" component={MyInfo} />
      <Stack.Screen name="Password Reset" component={PasswordReset} />
    </Stack.Navigator>
  );
};

export default Info;
