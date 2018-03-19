import React, { Component } from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Platform, View } from 'react-native';
import DefaultDeckListView from './DefaultDeckListView'
import NewDeckView from './NewDeckView'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { purple, white, headerTextColor, headerBackgroundColor } from '../utils/colors'


export default TabNavigator({
    DeckList: {
      screen: DefaultDeckListView,
      navigationOptions: {
        title: "Flashcard Decks",
        tabBarLabel: 'Deck List',
        tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />,
      },
    },
    NewDeck: {
      screen: NewDeckView,
      navigationOptions: {
        title: 'Create a Deck',
        tabBarLabel: 'New Deck',
        tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />,
      },
    },
  }, {
    navigationOptions: {
      headerTintColor: headerTextColor,
      headerStyle: {
        backgroundColor: headerBackgroundColor,
        elevation: 0,
        shadowOpacity: 0,
        shadowRadius: 0,
        shadowOffset: {
          height: 0
        },
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
