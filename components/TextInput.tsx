import * as React from "react";
import {
  StyleSheet,
  Text,
  TextInput as ReactNativeTextInput,
  TextInputProps as ReactNativeTextInputProps,
  View,
} from "react-native";

const styles = StyleSheet.create({
  container: {},
  label: {},
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    backgroundColor: "#fff",
  },
});

export interface TextInputProps extends ReactNativeTextInputProps {
  label?: string;
  style?: any;
  containerStyle?: any;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  style,
  containerStyle,
  ...props
}) => {
  return (
    <View
      style={StyleSheet.flatten([
        containerStyle,
        styles.container,
        label && { marginTop: 15 },
      ])}
    >
      {label && <Text style={styles.label}>{label}</Text>}
      <ReactNativeTextInput
        style={StyleSheet.flatten([
          style,
          styles.input,
          label && { marginTop: 10 },
        ])}
        {...props}
      />
    </View>
  );
};

export default TextInput;
