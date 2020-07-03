import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Home} from './Home';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
export const GlobalContext = React.createContext();

import Result from './Result';
const Stack = createStackNavigator();
const App = ({history}) => {
  const [movies, setMovies] = React.useState('');
  return (
    <GlobalContext.Provider value={{movies, setMovies}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Homeee" component={Home} />
          <Stack.Screen name="Result" component={Result} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const Styles = StyleSheet.create({
  backer: {
    bottom: 330,
    right: 130,

    color: 'white',
    fontSize: 20,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  twitter: {
    color: '#00aced',
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  follow: {
    color: 'white',
    fontSize: 16,
    top: 300,
  },
  input: {
    height: 25,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
export default App;
