import React, { Component } from 'react'
import { Text, ActivityIndicator } from 'react-native';
import styled from 'styled-components'

import { getDeck } from '../../../storage'

const Wrapper = styled.TouchableOpacity`
  flex: 1;
  padding: 20px;
`

const Title = styled.Text`
  font-size: 24px;
`

const SubTitle = styled.Text`
  font-size: 14px;
`;

class Deck extends Component {
  state = { loading: true };
  async componentDidMount() {
    const deck = await getDeck(this.props.id);
    this.setState({...JSON.parse(deck), loading: false})
  }

  render() {
    const { id, navigate } = this.props; 
    const { loading, title, cards = [] } = this.state;

    if (loading) {
      return (
      <Wrapper>
        <ActivityIndicator size="small" color="#0000ff" />
      </Wrapper>
      )
    }

    return (
      <Wrapper onPress={() => navigate('DeckView', { id })}>
        <Title>{title}</Title>
        <SubTitle>Cards: {cards.length}</SubTitle>
      </Wrapper>
    );
  }
}

export default Deck;
