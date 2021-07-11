import * as React from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";

const styles = StyleSheet.create({
  card: {
    marginTop: 15,
    backgroundColor: "#ffffff",
    borderRadius: 3,
    padding: 15,
    borderWidth: 1,
    borderColor: "#cccccc",
  },
  title: {
    fontSize: 18,
  },
  content: {
    marginTop: 5,
  },
});

export interface CardProps {
  title: string;
  onPress?: () => void;
}

const Card: React.FC<CardProps> = ({ title, onPress, children }) => {
  const card = (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {children && <View style={styles.content}>{children}</View>}
    </View>
  );
  return onPress ? (
    <TouchableNativeFeedback onPress={onPress}>{card}</TouchableNativeFeedback>
  ) : (
    card
  );
};

export default Card;
