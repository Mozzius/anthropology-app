import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { SetUserContext } from "./SetUserContext";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";

export type AuthStackParamList = {
  "Sign In": undefined;
  "Sign Up": { email: string; password: string };
  "Forgot Password": { email: string };
};

const Stack = createStackNavigator<AuthStackParamList>();

export interface AuthProps {
  setUser: React.Dispatch<any>;
}

const Authenication: React.FC<AuthProps> = ({ setUser }) => {
  return (
    <SetUserContext.Provider value={setUser}>
      <Stack.Navigator>
        <Stack.Screen name="Sign In" component={SignIn} />
        <Stack.Screen name="Sign Up" component={SignUp} />
        <Stack.Screen name="Forgot Password" component={ForgotPassword} />
      </Stack.Navigator>
    </SetUserContext.Provider>
  );
};

export default Authenication;
