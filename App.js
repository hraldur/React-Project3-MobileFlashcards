import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform
} from "react-native";
import Toast, {DURATION} from 'react-native-easy-toast'
import Decks from "./components/Decks";
import DeckDetail from "./components/DeckDetail";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import NewDeck from "./components/NewDeck";
import NewCard from "./components/NewCard";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import { StackNavigator, TabNavigator } from "react-navigation";
import { white, gray, blue } from "./utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { setLocalNotification } from './utils/helpers'


const Tabs = TabNavigator(
  {
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarLabel: "Decks",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-albums" size={30} color={tintColor} />
        )
      }
    },
    AddDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: "New Deck",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? blue : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? white : blue,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckDetail: {
    screen: DeckDetail
  },
  Quiz: {
    screen: Quiz
  },
  Results: {
    screen: Results
  },
  NewCard: {
    screen: NewCard
  }
});

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <MainNavigator />
           <Toast ref="toast"/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({});
