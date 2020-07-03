import * as React from 'react';
import {View, Text} from 'react-native';
import {Styles} from './App';

export const Result = ({navigation, movie}) => {
  return (
    <View style={Styles.container}>
      <Text
        onPress={() => navigation.goBack()}
        style={Styles.backer}
        title="back">
        back
      </Text>
      <Text style={Styles.text}>Results!</Text>
      {movie}
    </View>
  );
};

export default Result;
