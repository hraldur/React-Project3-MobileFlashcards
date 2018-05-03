import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Button,
  StyleSheet,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { HeaderBackButton, NavigationActions } from "react-navigation";
import { blue, white } from "../utils/colors";

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;
    return {
      title: deckId,
      headerLeft: (
        <HeaderBackButton onPress={() => navigation.navigate("Home")} />
      )
    };
  };

  getColor = () => {
    if (Platform.OS === "ios") {
      return white;
    } else return blue;
  };
  render() {
    const { deck, navigation } = this.props;
    return (
      <View style={styles.container}>
        {deck && (
          <View style={{ marginTop: 100, width: "70%" }}>
            <Text style={styles.title}>{deck.title}</Text>
            <Text style={{ marginTop: 8 }}>
              {Object.values(deck.questions).length} Cards
            </Text>

            <View style={styles.groupButtons}>
              {Platform.OS === "ios" ? (
                <View >
                  <TouchableOpacity
                    style={[styles.iosBtn, { backgroundColor:white, borderColor: blue, borderWidth: 1,}]}
                    onPress={() =>
                      navigation.navigate("NewCard", { deckId: deck.title })
                    }
                  >
                    <Text style={[styles.btnText, {marginTop: 10, color: blue}]}>Add Card</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <TouchableOpacity
                    style={styles.androidBtn}
                    onPress={() =>
                      navigation.navigate("NewCard", { deckId: deck.title })
                    }>
                    <Text style={styles.btnText}>Add Card</Text>
                    </TouchableOpacity>
                </View>
              )}
            </View>

            {Object.values(deck.questions).length != 0 && Platform.OS === "ios" && (
              <View>
                <TouchableOpacity
                  style={styles.iosBtn}
                  color={this.getColor()}
                  raised={true}
                  onPress={() =>
                    navigation.navigate("Quiz", { questions: deck.questions })
                  }
                >
                  <Text style={[styles.btnText, {marginTop: 10}]}>Start Quiz</Text>
              </TouchableOpacity>
              </View>
            )}


            {Object.values(deck.questions).length != 0 && Platform.OS === "android" && (
              <View >
                <TouchableOpacity
                  style={styles.androidBtn}
                  color={this.getColor()}
                  raised={true}
                  onPress={() =>
                    navigation.navigate("Quiz", { questions: deck.questions })
                  }
                >
                  <Text style={styles.btnText}>Start Quiz</Text>
                </TouchableOpacity>
                
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: white
  },

  iosBtn: {
    height: 50,
    backgroundColor: blue,
    borderRadius: 15,
    marginTop: 15,
    paddingBottom: 10
  },

  androidBtn: {
    height: 50,
    borderRadius: 2,
    marginTop: 15,
    padding: 10,
    backgroundColor: blue,

  },

  title: {
    fontSize: 40
  },

  groupButtons: {
    marginTop: 10
  },

  btnText: {
    textAlign: 'center',
    color: white,
    fontSize: 18}
});

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params;
  return {
    deckId,
    deck: state[deckId]
  };
}

export default connect(mapStateToProps)(DeckDetail);
