import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { blue, white } from "../utils/colors";

export default function AndroidBtn({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity
      style={[styles.androidBtn, style]}
      raised={true}
      onPress={onPress}
    >
      <Text style={styles.btnText}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  androidBtn: {
    height: 50,
    borderRadius: 2,
    marginTop: 15,
    padding: 10,
    backgroundColor: blue
  },

  btnText: {
    textAlign: "center",
    color: white,
    fontSize: 18
  }
});
