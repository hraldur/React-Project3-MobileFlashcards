import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform
} from "react-native";
import { saveDeckTitle, fetchDeckResults } from "../utils/api";
import { connect } from "react-redux";
import { addDeck, receiveDecks } from "../actions";
import { white, gray, blue } from "../utils/colors";
import AndroidBtn from "./AndroidBtn";
import IosBtn from "./IosBtn";

class NewDeck extends Component {
  state = {
    title: ""
  };

  handleChange(input) {
    this.setState({ title: input });
  }

  submit = () => {
    const { dispatch, navigation } = this.props;
    const { title } = this.state;

    let deck = {};
    if (title) {
      saveDeckTitle(title);

      deck["title"] = title;
      dispatch(addDeck(deck));

      fetchDeckResults()
        .then(decks => dispatch(receiveDecks(decks)))
        .then(navigation.navigate("DeckDetail", { deckId: title }));

      this.setState(() => ({
        title: ""
      }));
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What is the title of your new Deck?</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            onChangeText={input => this.handleChange(input)}
            value={this.state.title}
          />
        </View>

        {Platform.OS === "ios" ? (
          <IosBtn onPress={() => this.submit()}>Create Deck</IosBtn>
        ) : (
          <AndroidBtn onPress={() => this.submit()}>Create Deck</AndroidBtn>
        )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
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
    borderRadius: 10
  },
  inputView: {
    marginTop: 100
  }
});

export default connect(mapStateToProps)(NewDeck);
