
import C from '../constants'
import { removeDeck } from '../utils/api'

export const getDecks = () => 
  dispatch => dispatch({
    type: C.GET_DECKS
  })

export const loadDecks = (decks) =>
  dispatch => dispatch({
    type: C.LOAD_DECKS,
    decks
  })

export const getDeck = (title) =>
  dispatch => dispatch({
    type: C.GET_DECK,
    title
  })

export const addDeck = (title) =>
  dispatch => dispatch({
    type: C.ADD_DECK,
    title
  })


export const addCardToDeck = (card) => 
  dispatch => dispatch({
    type: C.ADD_CARD,
    card
  })

export const deleteDeck = (deckTitle) => 
  dispatch => dispatch({
    type: C.DELETE_DECK,
    deckTitle
  })
