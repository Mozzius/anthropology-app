import * as React from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 15,
  },
});

export interface ScreenProps {
  full?: boolean;
}

const Screen: React.FC<ScreenProps> = ({ full = false, ...props }) => {
  return full ? (
    <SafeAreaView
      style={[
        styles.container,
        { marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
      ]}
      {...props}
    />
  ) : (
    <View style={styles.container} {...props} />
  );
};

export default Screen;
