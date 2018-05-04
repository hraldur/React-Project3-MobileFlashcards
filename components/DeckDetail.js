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
import AndroidBtn from "./AndroidBtn";
import IosBtn from "./IosBtn";

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
                <View>
                  <IosBtn
                    style={{
                      backgroundColor: white,
                      borderColor: blue,
                      borderWidth: 1
                    }}
                    textStyle={{ color: blue }}
                    onPress={() =>
                      navigation.navigate("NewCard", { deckId: deck.title })
                    }
                  >
                    Add Card
                  </IosBtn>
                </View>
              ) : (
                <View>
                  <AndroidBtn
                    onPress={() =>
                      navigation.navigate("NewCard", { deckId: deck.title })
                    }
                  >
                    Add Card
                  </AndroidBtn>
                </View>
              )}
            </View>

            {Object.values(deck.questions).length != 0 &&
              Platform.OS === "ios" && (
                <View>
                  <IosBtn
                    onPress={() =>
                      navigation.navigate("Quiz", { questions: deck.questions })
                    }
                  >
                    Start Quiz
                  </IosBtn>
                </View>
              )}

            {Object.values(deck.questions).length != 0 &&
              Platform.OS === "android" && (
                <View>
                  <AndroidBtn
                    onPress={() =>
                      navigation.navigate("Quiz", { questions: deck.questions })
                    }
                  >
                    Start Quiz
                  </AndroidBtn>
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

  title: {
    fontSize: 40
  },

  groupButtons: {
    marginTop: 10
  }
});

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params;
  return {
    deckId,
    deck: state[deckId]
  };
}

export default connect(mapStateToProps)(DeckDetail);
