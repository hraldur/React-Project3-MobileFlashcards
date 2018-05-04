import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { blue, white } from "../utils/colors";

export default function IosBtn({
  children,
  onPress,
  style = {},
  textStyle = {}
}) {
  return (
    <TouchableOpacity
      style={[styles.iosBtn, style]}
      raised={true}
      onPress={onPress}
    >
      <Text style={[styles.btnText, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iosBtn: {
    height: 50,
    backgroundColor: blue,
    borderRadius: 15,
    marginTop: 15,
    paddingBottom: 10
  },

  btnText: {
    textAlign: "center",
    color: white,
    fontSize: 18,
    marginTop: 10
  }
});
