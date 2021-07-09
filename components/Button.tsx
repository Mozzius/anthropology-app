import * as React from "react";
import {
  Button as ReactNativeButton,
  ButtonProps as ReactNativeButtonProps,
  StyleSheet,
  View,
} from "react-native";

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
  },
});

const Button: React.FC<ReactNativeButtonProps> = ({ ...props }) => {
  return (
    <View style={styles.button}>
      <ReactNativeButton {...props} />
    </View>
  );
};

export default Button;
