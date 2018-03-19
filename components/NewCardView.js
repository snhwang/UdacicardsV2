
/*
New Question View
    An option to enter in the question
    An option to enter in the answer
    An option to submit the new question
*/

import React, {Component} from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, ScrollView, TextInput, Animated} from 'react-native'
import { Field, reset, change, destroy, blur, reduxForm } from 'redux-form'
import { addCardToDeck, getDecks } from '../actions/decks'
import { getQuizParameters } from '../actions/quiz'
import { addCardToDeckStorage } from '../utils/api'
import Dimensions from 'Dimensions'
import { setQuizDeck } from '../actions/quiz'
import { MyButton } from './MyButton'

class NewCardView extends Component {
  state = {
    fadeAnim: new Animated.Value(0),
  }
  componentDidMount() {
    this.props.getQuizParameters
    this.props.getDecks()
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1, // Animate until opaque
        duration: 2000,
      }
    ).start();
  }

  renderInput = ({ input: { onChange, onBlur, ...restInput }}) => {
    return <TextInput
      style={styles.input}
      onChangeText={onChange}
      onEndEditing={onBlur}
      {...restInput} />
  }

  render() {
    let { fadeAnim } = this.state
    const { handleSubmit, pristine, reset, submitting } = this.props
    var newCard = {}

    // The parameters are reversed in order from the onSubmit.bind() for handleSubmit
    const onSubmit = (values, dispatch) => {
      if (values.question != null && values.question.length > 0 && values.answer != null && values.answer.length > 0) {
        reset()
        var card = values
        card.deckTitle = this.props.quiz.deckTitle
        this.props.addCardToDeck(card)
        addCardToDeckStorage(card)
        this.props.setQuizDeck(this.props.quiz.deckTitle);
        this.props.navigation.navigate('SingleDeck', params = {title: this.props.quiz.deckTitle})  
      }
    }

    const myReset = () => {
      reset()
    }
    
    return (
      <View style={styles.container}>
        {this.props.deck
          ?
          <View>
            <Text>Please enter and submit the question and answer for your new flash card.</Text>
            <ScrollView keyboardShouldPersistTaps={'handled'}>
                <Text style={styles.fieldText}>Enter a question</Text>
                <Field
                  name={'question'}
                  component={this.renderInput}
                  onSubmitEditing={() => this.moveFocus()}
                />
                <Text style={styles.fieldText}>Enter the answer</Text>
                <Field
                  name={'answer'}
                  component={this.renderInput}
                  onSubmitEditing={() => this.moveFocus()}
                />
                <MyButton
                  title={'Create Card'}
                  onPress={handleSubmit(onSubmit.bind(this))}
                />
                <MyButton
                  title={'Clear'}
                  onPress={myReset}
                />
            </ScrollView>
          </View>
          :
          <Animated.View style={styles.container}>
            <Animated.Text style = {{opacity: fadeAnim, fontSize: 20}}>
              {"No deck"}
            </Animated.Text>
          </Animated.View>
        }
      </View>
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
  fieldText: {
    paddingTop: 20
  },
  input: {
    borderColor: 'black',
    borderWidth: 2,
    height: 35,
    margin:10,
    justifyContent:'center',
    width: Dimensions.get('window').width * 0.9
  }
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

export default reduxForm({
  form: 'cardViewForm'
})(connect(mapStateToProps, {  getDecks, getQuizParameters, addCardToDeck, setQuizDeck })(NewCardView))

