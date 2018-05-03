import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Platform } from "react-native";
import Decks from "./components/Decks";
import DeckDetail from "./components/DeckDetail";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import NewDeck from "./components/NewDeck";
import NewCard from "./components/NewCard";
import Quiz from "./components/Quiz";
import { StackNavigator, TabNavigator } from 'react-navigation';
import { white, gray, blue } from "./utils/colors";
import { FontAwesome, Ionicons } from '@expo/vector-icons'

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-albums' size={30} color={tintColor} />

    },
  },
  AddDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  }
}, {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? blue : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : blue,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}
)

const Home = ({ navigation }) => (
  <View >
    <Text>This is the Home view</Text>
    {console.log("home")}
    <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
      <Text>Press here for the Dashboard</Text>
    </TouchableOpacity>
  </View>
);



const MainNavigator = StackNavigator({
    Home: {
      screen: Tabs
    },
    DeckDetail: {
    screen: DeckDetail,
    },
    Quiz: {
      screen: Quiz,
    },
    NewCard: {
    screen: NewCard,
    }
  })


export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({

});
