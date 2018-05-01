import React from 'react'
import styled from 'styled-components'
import { Button, ActivityIndicator } from 'react-native'

import Divider from '../../../components/Divider'
import { getDeck } from '../../../storage'

const Container = styled.View`
  flex: 1;
`
const Title = styled.Text`
  font-size: 24px;
  padding: 10px 15px;
`
const SubTitle = styled.Text`
  font-size: 18px;
  padding: 6px 10px;
`

export default class DeckView extends React.Component {
  static navigationOptions = {
    headerTitle: 'Deck view'
  }
  state = { loading: true };
  async componentDidMount() {
    const { id } = this.props.navigation.state.params
    const deck = await getDeck(id);
    this.setState({...JSON.parse(deck), loading: false})
  }

  render() {
    const { navigation } = this.props;
    const { id } = navigation.state.params
    const { loading, title, cards = [] } = this.state

    if (loading) {
      return (
        <Container>
          <ActivityIndicator size="small" color="#0000ff" />
        </Container>
      );
    }

    return (
      <Container>
        <Title>{title}</Title>
        <SubTitle>{cards.length} card{cards.length != 1 ? 's': ''}</SubTitle>
        <Button 
          title="Add Card"
          onPress={() => navigation.navigate('CreateCard', { id })}
        />
        <Divider />
        <Button 
          disabled={!cards.length}
          title="Start Quiz"
          onPress={() => navigation.navigate('Quiz', { id })}
        />
      </Container>
    )
  }
}
