import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import firebase from "firebase/app";

import HomeScreen from "./home";
import StampsScreen from "./stamps";
import InfoScreen from "./info";
import EventsScreen from "./events";
import { User, UserContext } from "./User";

export type TabParamList = {
  Home: undefined;
  Events: undefined;
  Stamps: undefined;
  Info: undefined;
};

const Tabs = createBottomTabNavigator<TabParamList>();

export interface MainProps {
  user: { uid: string; email: string };
}

const Main: React.FC<MainProps> = ({ user: authUser }) => {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const users = firebase.database().ref(`/users/${authUser.uid}`);
    const getUser = snapshot =>
      setUser({
        uid: authUser.uid,
        email: authUser.email,
        stamps: {},
        ...snapshot.val(),
      });
    users.on("value", getUser);
    return () => users.off("value", getUser);
  }, [authUser.uid, authUser.email]);

  if (user === null) return null;

  return (
    <UserContext.Provider value={user}>
      <Tabs.Navigator>
        <Tabs.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Events"
          component={EventsScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="calendar-multiple" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Stamps"
          component={StampsScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons
                name="stamper"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Info"
          component={InfoScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons
                name="information"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs.Navigator>
    </UserContext.Provider>
  );
};

export default Main;
