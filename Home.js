import React, {useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Linking,
  Button,
} from 'react-native';
import {Styles} from './App';
import {Result} from './Result';
import Autocomplete from 'react-native-autocomplete-input';
import axios from 'axios';
import useGlobalContext from './App';

export const Home = ({navigation}) => {
  const [movies, setMovies] = React.useState('');
  const [query, setQuery] = React.useState('');
  const [error, setError] = React.useState('');

  async function Retrevie() {
    try {
      const response = await axios.get(
        'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup',
        {
          headers: {
            'content-type': 'application/octet-stream',
            'x-rapidapi-host':
              'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com',
            'x-rapidapi-key':
              '233f9e3fb2mshe2518225ea8c98ap17cf57jsn67146f1ed83b',
            useQueryString: true,
          },
          params: {
            term: query,
            country: 'us',
          },
        },
      );
      console.log(response);

      console.log(response.data);
      setMovies(response.data.results);

      return response;
    } catch (error) {
      setError('no');
    }
  }
  const OpenURLButton = ({url}) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return (
      <Text style={Styles.twitter} onPress={handlePress}>
        {' '}
        Twitter!
      </Text>
    );
  };
  const Navi = () => {
    navigation.navigate(Result);
  };
  const Fetch = e => {
    Retrevie();
    setQuery(e);
  };
  const Go = f => {
    setQuery(f);
    navigation.navigate(Result);
  };
  return (
    <View style={Styles.container}>
      <Text style={Styles.text}>WhatToWatch?</Text>
      <Autocomplete
        onSubmitEditing={() => Navi()}
        style={Styles.input}
        data={movies}
        defaultValue={query}
        onChangeText={text => Fetch(text)}
        renderItem={({item, i}) => (
          <TouchableOpacity onPress={() => Go()}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <Text>{error}</Text>
      <Text style={Styles.follow}>
        Follow me on
        <OpenURLButton url="https://twitter.com/RobbieReview?s=20" />
      </Text>
    </View>
  );
};
