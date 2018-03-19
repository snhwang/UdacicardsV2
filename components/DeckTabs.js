import React, { Component } from 'react'
import MainTabs from './MainTabs'
import SingleDeckHome from './SingleDeckHome'
import ShowQuestion from './ShowQuestion'
import NewCardView from './NewCardView'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import { purple, white, headerBackgroundColor } from '../utils/colors'


export default TabNavigator({
    SingleDeckHome: {
      screen: SingleDeckHome,
      navigationOptions: {
        title: 'Single Deck',
        tabBarLabel: 'Single Deck',
        tabBarIcon: ({ tintColor }) => <FontAwesome name='square' size={30} color={tintColor} />,
      },
    },
    Quiz: {
      screen: ShowQuestion,
      navigationOptions: {
        title: 'Quiz',
        tabBarLabel: 'Quiz',
        tabBarIcon: ({ tintColor }) => <FontAwesome name='square' size={30} color={tintColor} />
      },
    },
    NewCard: {
      screen: NewCardView,
      navigationOptions: {
        title: 'Create a Flashcard',
        tabBarLabel: 'New Card',
        tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
      },
    },
  }, {
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: headerBackgroundColor,
        elevation: 0,
        shadowOpacity: 0,
        shadowRadius: 0,
        shadowOffset: {
          height: 0
        },
        shadowColor: 'transparent',
        marginTop:0
      }
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : purple,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  })
