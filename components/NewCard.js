import React, { Component } from "react";
import {
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";
import { HeaderBackButton, NavigationActions } from "react-navigation";
import { addCardToDeck } from "../utils/api";
import { connect } from "react-redux";
import { addCard } from "../actions";
import { white, gray, blue } from "../utils/colors";
import AndroidBtn from "./AndroidBtn";
import IosBtn from "./IosBtn";

class NewCard extends Component {
  state = {
    question: "",
    answer: ""
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Add Card",
      headerLeft: (
        <HeaderBackButton onPress={() => navigation.navigate("Home")} />
      )
    };
  };

  handleChange(target, input) {
    if (target === "question") {
      this.setState({ question: input });
    } else if (target === "answer") {
      this.setState({ answer: input });
    }
    console.log(this.state);
  }

  submit = () => {
    const { dispatch, deckId, navigation } = this.props;
    const { question, answer } = this.state;
    const card = {
      question: question,
      answer: answer
    };

    if (card) {
      addCardToDeck(deckId, card);
      dispatch(addCard(deckId, card));

      this.setState(() => ({
        question: "",
        answer: ""
      }));
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 100 }}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              onChangeText={input => this.handleChange("question", input)}
              placeholder={"Question"}
              value={this.state.question}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              onChangeText={input => this.handleChange("answer", input)}
              placeholder={"Answer"}
              value={this.state.answer}
            />
          </View>
          {Platform.OS === "ios" ? (
            <View>
              <IosBtn style={{ marginTop: 230 }} onPress={() => this.submit()}>
                Create Card
              </IosBtn>
            </View>
          ) : (
            <View>
              <AndroidBtn
                style={{ marginTop: 200 }}
                onPress={() => this.submit()}
              >
                Create Card
              </AndroidBtn>
            </View>
          )}
        </View>
      </View>
    );
  }
}

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params;
  return {
    deckId
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 20
  },
  title: {
    marginTop: 50,
    fontSize: 40
  },
  input: {
    height: 40,
    borderColor: gray,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10
  },
  inputView: {
    marginTop: 10
  }
});

export default connect(mapStateToProps)(NewCard);
