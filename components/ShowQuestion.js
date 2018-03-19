import React, {Component} from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { Divider } from 'react-native-elements'
import { clearLocalNotification, setLocalNotification } from '../utils/notifications'
import { getDecks } from '../actions/decks'
import { getQuizParameters, setShowAnswer, setFinished, incrementScore, setScore, setActiveQuestion } from '../actions/quiz'
import { mainBackgroundColor } from '../utils/colors'
import { MyButton } from './MyButton'

class ShowQuestion extends Component {
  componentDidMount() {
    this.props.getQuizParameters()
    this.props.getDecks()
    this.props.setShowAnswer(false)
  }

  render() {

    //const { index, score, questions} = this.props.navigation.state.params

    deck = this.props.deck    
    quiz = this.props.quiz
    var index = quiz.index;
    const score = quiz.score

    const percentage = () => {
      if (index === 0) {
        return 0
      }
      else {
        return 100.0 * score / index
      }
    }

    var questionsLeft
    if(!deck || !deck.questions || !Array.isArray(deck.questions) || index >= deck.questions.length) {
      questionsLeft = 0
      quiz.finished = true
    }
    else {
      questionsLeft = deck.questions.length - index - 1
    }

    const EndQuizButton = () => {
      return(
        <MyButton
          onPress={() => onExitQuiz()}
          title='End Quiz'
        />
      )
    }
    
    const RestartQuizButton = () => {
      return(
        <MyButton
          onPress={() => onRestartQuiz()}
          title='Restart Quiz'
        />
      )
    }
    
    const onCorrect = () => {
      this.props.incrementScore()
      this.props.setShowAnswer(false);
      index += 1
      this.props.setActiveQuestion(index)
      if (questionsLeft <= 0) {
        clearLocalNotification().then(setLocalNotification)
        this.props.setFinished(true)
      }
    }
    
    const onIncorrect = () => {
      this.props.setShowAnswer(false);
      index += 1
      this.props.setActiveQuestion(index)
      if (questionsLeft <= 0) {
        clearLocalNotification().then(setLocalNotification)
        this.props.setFinished(true)
      }
    }

    const onExitQuiz = () => {
      this.props.setActiveQuestion(0)
      this.props.setShowAnswer(false);
      this.props.setFinished(false)
      this.props.setScore(0)
      this.props.navigation.navigate('SingleDeckHome')
    }

    const onRestartQuiz = () => {
      this.props.setActiveQuestion(0)
      this.props.setShowAnswer(false);
      this.props.setFinished(false)
      this.props.setScore(0)   
    }

    return(
      <ScrollView>
        {!deck || !deck.questions || !Array.isArray(deck.questions)
          ? 
          <View>
            <Text style = {{fontSize: 20}}> No cards </Text>
            <MyButton
              onPress={() => this.props.navigation.navigate('SingleDeckHome')}
              title='Return to Single Deck View'
            />
          </View>
          :
          <View>
            {!quiz.finished && deck.questions.length > 0
              ?
              <View>
                <Text style={[styles.cardText]}> {"Question " + (index + 1) + ":"}</Text>
                <Text style={[styles.cardText]}> {deck.questions[index].question} </Text>
                <Text style={[styles.cardText]}> {"Number of questions left: " + questionsLeft} </Text>
                <Text style={[styles.cardText]}> {"Score: " + percentage() + "%"} </Text>
                <Divider style={{ height: 20, backgroundColor: mainBackgroundColor}} />
                {quiz.showAnswer
                  ?
                  <View>
                    <View>
                    <Text style={[styles.cardText]}> {"Answer: "}</Text>
                    <Text style = {{fontSize: 20, padding: 20}}> {deck.questions[index].answer} </Text>
                    <MyButton
                      title='Correct'
                      onPress={() => onCorrect()}
                    />
                  <MyButton
                      title='Incorrect'
                      onPress={() => onIncorrect()}
                    />
                  </View>
                </View>
                  :
                  <View>
                    <MyButton
                      title='Show Answer'
                      onPress={() => this.props.setShowAnswer(true) }
                    />
                  </View>
                }
              </View>
              :
              <View>
                <Text style={styles.cardText}> {"Final Score: " + 100.0 * score / deck.questions.length + "%"} </Text>
                <Text style={styles.cardText}> {"of " + deck.questions.length + " questions."} </Text>
              </View>
            }
            <RestartQuizButton/>
            <EndQuizButton/>
          </View>  
        }
      </ScrollView>
  
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 20
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
  mapStateToProps, {getDecks, getQuizParameters, setShowAnswer, setFinished, setActiveQuestion, incrementScore, setScore}
)(ShowQuestion)