// 1) Displays the title of each Deck
// 2) Displays the number of cards in each deck

import React, {Component} from 'react'
import { StyleSheet, ScrollView, Text, View, AsyncStorage, StatusBar} from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import _ from 'lodash'
import { TabNavigator, StackNavigator } from 'react-navigation'
import objectWithoutProperties  from 'object-without-properties'
import { MaterialIcons } from '@expo/vector-icons'
import { getDecks, addDeck , loadDecks, deleteDeck} from '../actions/decks'
import { setQuizDeck } from '../actions/quiz'
import C from '../constants'
import { primaryColor, mainBackgroundColor } from '../utils/colors'
import { saveDataStorage, consoleDataStorage, getDecksStorage } from '../utils/api'
import { Constants } from 'expo'

function FlashcardsStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
} 

class DefaultDeckListView extends Component {
  componentDidMount() {
    
    getDecksStorage()
      .then(decks => {
        this.props.loadDecks(decks)
      })
  }

  onNavigationChange = (prevState, currentState) => {
    this.setState({
      keys: currentState.routes
    });
  }

  getData () {
    consoleDataStorage()
    getDecksStorage()
      .then(decks => {
        this.props.loadDecks(decks)
      })
  }

  // gets the current screen from navigation state
  getCurrentRouteName (navigationState) {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
      return getCurrentRouteName(route);
    }
    return route.routeName;
  }

  render() {  
    decks = this.props.decks
    var temp
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center'}}>Press a deck to choose</Text>
        <ScrollView>
          <List>
            {
              _.map(decks, deck =>  (
                <ListItem
                  key={deck.title}
                  title={deck.title}
                  subtitle={typeof deck.questions === "undefined"
                    ? "Number of cards: 0"
                    : "Number of cards: " + deck.questions.length}
                  rightIcon={<MaterialIcons name='navigate-next' size={20}/>}
                  titleStyle={{color: primaryColor}}
                  onPress={() => {
                    console.log("onPress", 'test')
                    this.props.setQuizDeck(deck.title);
                    this.props.navigation.navigate('SingleDeck')}
                  }
                />
              ))
            }
          </List>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainBackgroundColor,
    justifyContent: 'center',
  },
})

function mapStateToProps(state, { navigation }) {
  decks = state.decks
  quiz = state.quiz
  return {
    decks,
    quiz
  }
}

export default connect(
  mapStateToProps, { loadDecks, getDecks, setQuizDeck, deleteDeck }
)(DefaultDeckListView)

