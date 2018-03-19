import React from 'react';
import { View } from 'react-native'
import { Button, Divider } from 'react-native-elements'
import { buttonBackgroundColor, mainBackgroundColor } from '../utils/colors'

export const MyButton = ({title, onPress}) =>
  <View>
    <Divider style={{ height: 20, backgroundColor: mainBackgroundColor}} />
    <Button
      onPress={onPress}
      title={title}
      raised={true}
      borderRadius={10}
      buttonStyle={{backgroundColor: buttonBackgroundColor}}
    />
  </View>



