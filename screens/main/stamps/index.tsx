import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Stampbook from "./Stampbook";
import Scanner from "./Scanner";

export type StampStackParamList = {
  Stampbook: undefined;
  Scanner: undefined;
};

const Stack = createStackNavigator<StampStackParamList>();

const Info: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Stampbook" component={Stampbook} />
      <Stack.Screen name="Scanner" component={Scanner} />
    </Stack.Navigator>
  );
};

export default Info;
