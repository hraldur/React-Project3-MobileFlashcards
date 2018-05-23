import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { getDecks } from "../utils/api";
import { white, gray } from "../utils/colors";
import { receiveDecks } from "../actions";
import { AppLoading } from "expo";

class Decks extends Component {
  state = {
    ready: false
  };

  componentWillMount() {
    const { dispatch } = this.props;

    getDecks()
      .then(decks => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ ready: true })));
  }

  renderItem = ({ item }) => (
    <View style={styles.list}>
      <TouchableOpacity
        style={styles.deck}
        onPress={() =>
          this.props.navigation.navigate("DeckDetail", { deckId: item.title })
        }
      >
        <Text style={styles.deckTitle}>{item.title}</Text>
        {item.questions && (
          <Text style={{ color: "black" }}>
            {Object.values(item.questions).length} Cards
            {/* {console.log(Object.values(item.questions).length)} */}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );

  render() {
    const { decks } = this.props;
    const { ready } = this.state;

    if (ready === false) {
      return <AppLoading />;
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={Object.values(decks)}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

function mapStateToProps(decks) {
  return {
    decks
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },

  list: {
    // paddingBottom: 50,
    borderBottomColor: gray,
    borderBottomWidth: 1,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  deck: {
    margin: 15,
    height: 100
  },
  deckTitle: {
    fontSize: 36
  },
  cards: {
    fontSize: 18,
    color: "black"
  }
});

export default connect(mapStateToProps)(Decks);
