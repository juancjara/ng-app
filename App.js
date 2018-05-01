import React from 'react';
import { StackNavigator } from 'react-navigation';
import styled from 'styled-components'

import DeckList from './src/screens/DeckList';
import DeckView from './src/screens/Deck';
import CreateCard from './src/screens/CreateCard';
import CreateDeck from './src/screens/CreateDeck';
import Quiz from './src/screens/Quiz';

const Container = styled.View`
  flex: 1;
`

export const Stack = StackNavigator({
  DeckList: { screen: DeckList },
  DeckView: { screen: DeckView },
  CreateCard: { screen: CreateCard },
  CreateDeck: { screen: CreateDeck },
  Quiz: {screen: Quiz},
}, {
  initialRouteName: 'DeckList'
})

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <Stack />
      </Container>
    );
  }
}
