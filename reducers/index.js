import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import _ from 'lodash'
import objectWithoutProperties  from 'object-without-properties'
import C from '../constants'

function decks (state={}, action) {
  switch(action.type) {
    case C.GET_DECKS: {
      console.log("GET_DECKS reducer", state)
      return state
    }
    case C.LOAD_DECKS: {
      console.log("loading decks", action.decks)
      return action.decks
    }
//    case C.GET_DECK: {
//      return state
//    }
    case C.ADD_DECK: {
      console.log("ADD DECk", action)
      return Object.assign({}, state, {[action.title]: {title: action.title, questions: new Array()}})
    }
    case C.ADD_CARD: {
      console.log("case add", action)
      const deckTitle = action.card.deckTitle
      var newQuestions = []
      if (!state[deckTitle] || !Array.isArray(state[deckTitle].questions) || state[deckTitle].length <= 0) {
        newQuestions = [action.card]
      }
      else {
        newQuestions = state[deckTitle].questions.concat(action.card)
      }
      const newDeck = {title: deckTitle, questions: newQuestions}
      return Object.assign({}, objectWithoutProperties(state, [deckTitle]), {[deckTitle]: newDeck})
    }
    case C.DELETE_DECK: {
      newDecks = objectWithoutProperties(state, [action.deckTitle])
      return newDecks
    }
    default: {
      return state
    }
  }
}


function quiz (state={score: 0, index: 0, showAnswer: false, finished: false}, action) {
  console.log(action.type)
  switch(action.type) {
    case C.GET_QUIZ_PARAMETERS: {
      return state
    }
    case C.SET_QUIZ_DECK: {
      console.log("setQuizDeck", action.deckTitle)
      return Object.assign({}, state, {deckTitle: action.deckTitle})
    }
    case C.INCREMENT_SCORE: {
      return Object.assign({}, state, {score: state.score + 1})
    }
    case C.DECREMENT_SCORE: {
      return Object.assign({}, state, {score: state.score - 1})
    }
    case C.SET_SCORE: {
      return Object.assign({}, state, {score: action.score})
    }
    case C.SET_ACTIVE_QUESTION: {
      return Object.assign({}, state, {index: action.index})
    }
    case C.SET_SHOW_ANSWER: {
      console.log("SET show answer", action.showAnswer)
      return Object.assign({}, state, {showAnswer: action.showAnswer})
    }
    case C.SET_FINISHED: {
      return Object.assign({}, state, {finished: action.finished})
    }

    default: {
      return state
    }
  }

}

//export default decks
export default combineReducers({
  decks,
  quiz,
  form: formReducer
})
