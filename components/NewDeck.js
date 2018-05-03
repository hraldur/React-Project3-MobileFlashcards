import React, { Component } from "react";
import { View, Button, Text, TextInput, StyleSheet } from "react-native";
import { saveDeckTitle, fetchDeckResults } from "../utils/api";
import { connect } from "react-redux";
import { addDeck, receiveDecks } from "../actions";
import { white, gray, blue } from "../utils/colors";

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
      <View style={styles.button}>
        <Button color={white} title="Create Deck" onPress={() => this.submit()}/>
</View>
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
    fontSize: 40,
  },
  input: {
    height: 40,
    borderColor: gray,
    borderWidth: 1,
    borderRadius: 10,
  },
  inputView: {
    marginTop: 100
  },
  button: {
    height: 50,
    backgroundColor: blue,
    borderRadius: 15,
    marginTop: 25
  },
});

export default connect(mapStateToProps)(NewDeck);
