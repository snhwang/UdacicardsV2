import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'


import DeckTabs from './DeckTabs'
import MainTabs from './MainTabs'

class MainNav extends Component {

  Navigator = StackNavigator({
    Home: {
      screen: MainTabs
    },
    SingleDeck: {
      screen: DeckTabs,
    }
  },{
    navigationOptions: {
      headerLeft: null
    }
  })

  render () {
    return (
      <this.Navigator/>
    )
  }
}

export default MainNav

