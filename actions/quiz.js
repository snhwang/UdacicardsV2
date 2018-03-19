import C from '../constants'

export function getQuizParameters() {
  return {
    type: C.GET_QUIZ_PARAMETERS    
  }  
}

export function setQuizDeck(deckTitle) {
  return {
    type: C.SET_QUIZ_DECK,
    deckTitle
  }
}

export function incrementScore() {
 return {
    type: C.INCREMENT_SCORE
  }
}

export function decrementScore() {
  return {
    type: C.DECREMENT_SCORE
  }
}

export function setScore (score) {
  return {
    type: C.SET_SCORE,
    score
  }
}

export function setActiveQuestion(index) {
  return {
    type: C.SET_ACTIVE_QUESTION,
    index  
  } 
}

//boolean. true if the answer is to be shown
export function setShowAnswer (showAnswer) {
  return {
    type: C.SET_SHOW_ANSWER,
    showAnswer
  }
}

//boolean. true if the quiz is finished
export function setFinished (finished) {
  return {
    type: C.SET_FINISHED,
    finished
  }
}

