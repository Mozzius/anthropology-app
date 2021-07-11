import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Events, { Event } from "./Events";
import AddEvent from "./AddEvent";

export type InfoStackParamList = {
  Events: undefined;
  "Add Event": { event: undefined };
  "Edit Event": { event: Event };
};

const Stack = createStackNavigator<InfoStackParamList>();

const EventsScreen: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Events" component={Events} />
      <Stack.Screen name="Add Event" component={AddEvent} />
      <Stack.Screen name="Edit Event" component={AddEvent} />
    </Stack.Navigator>
  );
};

export default EventsScreen;
