// Some of the code was adapted from the UdaciFitness code of the Udacity React Nanodegree course

import { AsyncStorage } from 'react-native'
import _ from 'lodash'
import objectWithoutProperties  from 'object-without-properties'
import C from '../constants'


export const defaultData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

// Save all of the decks
export function saveDataStorage (decks) {
  return (_.map(decks, deck => {
    AsyncStorage.mergeItem(
      C.UDACICARDS_STORAGE_KEY,
      JSON.stringify({[deck.title]: deck})
    )
  }))
}

// Get all the decks
export function getDecksStorage () {
  return AsyncStorage.getItem(C.UDACICARDS_STORAGE_KEY).then((results) => {
    data = (results ? JSON.parse(results) : defaultData)
    return data
//    return (results ? JSON.parse(results) : defaultData)
  })
}


// Display all the data on the console
export function consoleDataStorage () {
  AsyncStorage.getItem(C.UDACICARDS_STORAGE_KEY).then((results) => {
    const data = JSON.parse(results)
  })
}

export function saveDeckTitleStorage (title) {
  AsyncStorage.mergeItem(C.UDACICARDS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title: title,
      questions: []
    }
  }))
}

export function addCardToDeckStorage (card) {
  getDecksStorage().then(results => {
    var newQuestions = []
    if (!Array.isArray(results[card.deckTitle].questions) || !results[card.deckTitle].questions) {
      newQuestions = [{question: card.question, answer: card.answer}]
    }
    else {
      newQuestions = results[card.deckTitle].questions.concat({question: card.question, answer: card.answer})
    }
    const newDeck = {title: card.deckTitle, questions: newQuestions}
    AsyncStorage.mergeItem(
      C.UDACICARDS_STORAGE_KEY,
      JSON.stringify({
        [card.deckTitle]: newDeck
      })
    )
  })
} 

export function fetchFlashcards () {
  return AsyncStorage.getItem(C.UDACICARDS_STORAGE_KEY)
}

export function submitDeck ({ deck , key }) {
  return AsyncStorage.mergeItem(C.UDACICARDS_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}

export function removeDeck (key) {
  return AsyncStorage.getItem(C.UDACICARDS_STORAGE_KEY)
    .then((results) => {
      const decks = JSON.parse(results)
      AsyncStorage.setItem(C.UDACICARDS_STORAGE_KEY, JSON.stringify(objectWithoutProperties(decks, [key])))
    })
}

export function deleteDeckFromStorage(key) {
  return AsyncStorage.getItem(C.UDACICARDS_STORAGE_KEY).then((results) => {
    AsyncStorage.setItem(C.UDACICARDS_STORAGE_KEY, JSON.stringify(objectWithoutProperties(decks, [key])))
  })
}