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
import TextButton from "./TextButton";
import AndroidBtn from "./AndroidBtn";
import IosBtn from "./IosBtn";
import { white, gray, blue, yellow } from "../utils/colors";

class Quiz extends Component {
  state = {
    index: 0,
    correctAnswers: 0,
    revealAnswer: false
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz',
      headerLeft: (
        <HeaderBackButton onPress={() => navigation.navigate("Home")} />
      )
    };
  };

  processQuiz = () => {
    const { questions } = this.props.navigation.state.params;
    const { index } = this.state;

    if (index < questions.length - 1) {
      this.setState({ index: index + 1, revealAnswer: false });
    } else {
      this.finalScore(questions);
    }
  };

  finalScore = questions => {
    const { correctAnswers } = this.state;
    const { navigation } = this.props;

    Alert.alert(
      "Your score: " +
        Math.round(correctAnswers / questions.length * 100) +
        "%",
      `${correctAnswers} out of ${questions.length} questions`,
      [
        {
          text: "Try Again",
          onPress: () =>
            this.setState({
              index: 0,
              correctAnswers: 0,
              revealAnswer: false
            })
        },
        { text: "Cancel", onPress: () => navigation.goBack(), style: "cancel" }
      ],
      { cancelable: false }
    );
  };

  quizCounter = (index, questions) => {
    return (
      <View>
        <Text style={styles.index}>
          {index + 1} / {questions.length}
        </Text>
      </View>
    );
  };

  quizActions = questions => {
    return (
      <View>
        {Platform.OS === "ios" ? (
          <View>
            <IosBtn
              onPress={() =>
                this.setState(
                  { correctAnswers: this.state.correctAnswers + 1 },
                  this.processQuiz
                )
              }
            >
              Correct
            </IosBtn>

            <IosBtn
              style={{ backgroundColor: white, borderColor: blue, borderWidth: 1}}
              onPress={() => this.processQuiz()}
              textStyle={{color: blue}}
            >
              Incorrect
            </IosBtn>

          </View>
        ) : (
          <View>
            <AndroidBtn
              onPress={() =>
                this.setState(
                  { correctAnswers: this.state.correctAnswers + 1 },
                  this.processQuiz
                )
              }
            >
              Correct
            </AndroidBtn>

            <AndroidBtn onPress={() => this.processQuiz()}>
              Incorrect
            </AndroidBtn>
          </View>
        )}
      </View>
    );
  };

  render() {
    const { questions } = this.props.navigation.state.params;
    const { index, revealAnswer } = this.state;

    const card = revealAnswer ? (
      <Text
        style={{
          marginTop: 50,
          fontSize: 24
        }}
        key={questions[index].answer}
      >
        {questions[index].answer}
      </Text>
    ) : (
      <Text
        style={{
          marginTop: 50,
          fontSize: 40
        }}
        key={questions[index].question}
      >
        {questions[index].question}
      </Text>
    );

    return (
      <View style={styles.container}>
        {this.quizCounter(index, questions)}
        <View>
          {questions && questions[index] && <View>{card}</View>}
          {revealAnswer && this.quizActions(questions)}

          <TextButton
            style={{ padding: 20 }}
            onPress={() => this.setState({ revealAnswer: !revealAnswer })}
          >
            {revealAnswer ? "Question" : "Answer"}
          </TextButton>
        </View>
      </View>
    );
  }
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
  },
});

export default Quiz;
