import React, { Component } from 'react';
import { Platform, View, StatusBar } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Constants } from 'expo'
import reducer from './reducers'
import thunk from 'redux-thunk'
import { defaultData } from './utils/api'
import { setLocalNotification, clearLocalNotification } from './utils/notifications'
import MainNav from './components/MainNav'
import { headerBackgroundColor } from './utils/colors'

function FlashcardsStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
} 

export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store=
        {createStore(reducer, {decks: defaultData}, applyMiddleware(thunk))}>
        <View style={{flex: 1}}>
          <FlashcardsStatusBar backgroundColor={headerBackgroundColor} barStyle="light-content" />
          <MainNav />
        </View>
      </Provider>
    )
  }
}

