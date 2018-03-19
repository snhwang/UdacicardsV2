
/*
New Deck View

    An option to enter in the title for the new deck
    An option to submit the new deck title
*/


import React, {Component} from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, ScrollView, TextInput} from 'react-native'
import { Field, reduxForm } from 'redux-form'
import Dimensions from 'Dimensions'

import { setQuizDeck } from '../actions/quiz'
import { addDeck, getDecks } from '../actions/decks'
import { saveDeckTitleStorage } from '../utils/api'
import { MyButton } from './MyButton'

class NewDeckView extends Component {
  componentDidMount() {
    this.props.getDecks()
  }

  renderInput = ({ input: { onChange, onBlur, ...restInput }}) => {
    return <TextInput
      style={styles.input}
      onChangeText={onChange}
      onEndEditing={onBlur}
      {...restInput} />
  }

  // The parameters are reversed in order from the onSubmit.bind() for handleSubmit
  onSubmit(values) {
    // Only add the deck if a title is entered
    if (values.title != null && values.title.length > 0) {
      this.props.addDeck(values.title)
      saveDeckTitleStorage(values.title)
      this.props.reset()
      this.props.setQuizDeck(values.title);
      this.props.navigation.navigate('SingleDeck', params = {title: values.title})  
    }
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props

    var newCard = {}

    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <Text style={{textAlign: 'center'}}>Please enter the title of your new deck of flash cards then press the button:</Text>
          <Field style={styles.container}
            name={'title'}
            component={this.renderInput}
            onSubmitEditing={() => this.moveFocus()}
          />
          <MyButton
            onPress={handleSubmit(this.onSubmit.bind(this))}
            title='Create Deck'
          />
        </ScrollView>
      </View>
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
  input: {
    borderColor: 'black',
    borderWidth: 2,
    height: 35,
    margin:10,
    justifyContent:'center',
    width: Dimensions.get('window').width * 0.9
  }
})

function mapStateToProps(state) {
  const decks = state.decks
  return { 
    decks
  }
}

export default reduxForm({
  form: 'deckViewForm'
})(connect(mapStateToProps, {  getDecks, addDeck, setQuizDeck })(NewDeckView))

