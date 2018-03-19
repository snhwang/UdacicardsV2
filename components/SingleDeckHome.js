// Individual Deck View
//  Displays the title of the Deck
//  Displays the number of cards in the deck
//  Displays an option to start a quiz on this specific deck
//  An option to add a new question to the deck

import React, {Component} from 'react'
import { StyleSheet, Text, View, Platform, Animated, Alert } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
import { getDecks, deleteDeck, loadDecks } from '../actions/decks'
import { getQuizParameters } from '../actions/quiz'
import NewCardView from './NewCardView'
import { deleteDeckFromStorage, getDecksStorage } from '../utils/api'
import { MyButton } from './MyButton'

class SingleDeckHome extends Component {
  state = {
    fadeAnim: new Animated.Value(0),
  }

  componentDidMount() {
    this.props.getDecks()
    this.props.getQuizParameters();
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1, // Animate until opaque
        duration: 2000,
      }
    ).start();
  }

  deleteAlert = () => {
    Alert.alert(
      'Alert',
      'Deletion is permanent',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel'},
        {text: 'Delete', onPress: () => {
          deleteDeckFromStorage(this.props.deck.title).then(
            this.props.deleteDeck(this.props.deck.title)                      
          )
          this.props.navigation.navigate('SingleDeck')
          this.props.navigation.navigate('DeckList')
        }},
      ],
      { cancelable: false }
    )
  }

  render() {
    let { fadeAnim } = this.state
    const deck = this.props.deck
  
    return (
      <Animated.View style={styles.container}>
        <Animated.Text style = {{opacity: fadeAnim, fontSize: 20}}>
          {deck ? deck.title : "No deck"}
        </Animated.Text>
        {!deck || !Array.isArray(deck.questions) // || deck.questions.length >= 0
          ?
          <Animated.Text style={{opacity: fadeAnim, fontSize: 20}}> Number of cards: 0 </Animated.Text>
          :
          <View>
            <Animated.Text style={{opacity: fadeAnim, fontSize: 20}}> Number of cards: {deck.questions.length} </Animated.Text>
            <MyButton title={
              'Delete Deck'}
              onPress={() => {
                this.deleteAlert()
              }}
            />
          </View>
        }
        <MyButton title={'Return to Deck List'} onPress={() => this.props.navigation.navigate('DeckList', params = {update: false})}/>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
//    justifyContent: 'center',
  },
})

function mapStateToProps(state, ownProps) {
  const quiz = state.quiz
  const deck = state.decks[quiz.deckTitle]
  return {
    decks,
    deck,
    quiz
  }
}

export default connect(
  mapStateToProps, { getDecks, loadDecks, getQuizParameters, deleteDeck }
)(SingleDeckHome)

