import React from 'react'
import styled from 'styled-components'
import { Button, ActivityIndicator, Text } from 'react-native'

import Question from './Question';
import Divider from '../../components/Divider'
import { getDeck } from '../../storage'

const Container = styled.View` flex: 1; `

const QuestionsRemaining = styled.Text`
  padding: 20px;
  font-size: 16px;
`

const Score = styled.Text`
  padding: 50px 10px;
  font-size: 20px;
`

export default class Quiz extends React.Component {
  state = { loading: true, currentCard: 0, score: 0};
  async componentDidMount() {
    const { id } = this.props.navigation.state.params
    const deck = await getDeck(id);
    this.setState({...JSON.parse(deck), loading: false})
  }

  getCardView = () => {
    const { currentCard, cards = [], score } = this.state
    const {  navigation } = this.props
    const { id } = navigation.state.params;

    if (currentCard == cards.length ) {
      return (
        <Container>
          <Score>Correct answers: {score}</Score>
          <Button title='Restart Quiz' onPress = {() => this.setState({currentCard: 0, score: 0})} />
          <Divider />
          <Button title='Back to Deck' onPress = {() => navigation.navigate('DeckView', {id})} />
        </Container>
      )
    }
    return <Question 
      {...cards[currentCard]}
      next={(points) => this.setState({ score: score + points, currentCard: currentCard + 1 })}
    />
  }

  render() {
    const { loading, cards = [] , currentCard} = this.state;

    if (loading) {
      return (
        <Container>
          <ActivityIndicator size="small" color="#0000ff" />
        </Container>
      );
    }

    return (
      <Container>
        {
          currentCard != cards.length &&
            <QuestionsRemaining>{currentCard + 1} / {cards.length} questions</QuestionsRemaining>
        }
        { this.getCardView()}
      </Container>
    )
  }
}
