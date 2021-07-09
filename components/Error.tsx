import * as React from "react";
import { Text, StyleSheet } from "react-native";

const style = StyleSheet.create({
  message: {
    marginTop: 15,
    color: "#ff0000",
  },
});

export interface ErrorProps {
  message: null | string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return message && <Text style={style.message}>{message}</Text>;
};

export default Error;
