import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Alert,
  Platform
} from "react-native";
import { HeaderBackButton, NavigationActions } from "react-navigation";
import { white, blue } from "../utils/colors";
import AndroidBtn from "./AndroidBtn";
import IosBtn from "./IosBtn";

export default function Results({navigation}) {
  const { correctAnswers, questions } = navigation.state.params
  return (
    <View style={styles.container}>
      <Text>Your score is {Math.round(correctAnswers / questions * 100)}%</Text>
      <Text>
        {correctAnswers} out of {questions} questions
      </Text>

      <View>
        {Platform.OS === "ios" ? (
          <View>
            <IosBtn onPress={() => navigation.pop(2)}>
              Try Again
            </IosBtn>

            <IosBtn
              style={{
                backgroundColor: white,
                borderColor: blue,
                borderWidth: 1
              }}
              onPress={() => navigation.pop(3)}
              textStyle={{ color: blue }}
            >
              Cancel
            </IosBtn>
          </View>
        ) : (
          <View>
            <AndroidBtn onPress={() => navigation.pop(2)}>
              Try Again
            </AndroidBtn>
            <AndroidBtn onPress={() => navigation.pop(3)}>
              Cancel
            </AndroidBtn>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 20
  },
  index: {
    fontSize: 14,
    fontWeight: "bold"
  }
});
