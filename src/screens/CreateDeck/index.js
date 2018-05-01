import React from 'react'
import { Button } from 'react-native'

import styled from 'styled-components'

import { addDeck } from '../../storage'

const Container = styled.View`
  flex: 1;
`

const Title = styled.Text`
  font-size: 20px;
`

const StyledTextInput = styled.TextInput`
  padding: 10px;
`

export default class CreateDeck extends React.Component {
  static navigationOptions = {
    headerTitle: 'Create Deck'
  }
  state = {
    title: '',
  }

  addDeck = async () => {
    const { title } = this.state;
    const id = await addDeck({title, cards: []})
    this.props.navigation.replace('DeckView', { id })
  }

  render() {
    const { title } = this.state;

    return  (
      <Container>
        <Title>
          What is the title of your new deck?
        </Title>
        <StyledTextInput 
          value={title}
          placeholder="Deck Title"
          onChangeText={title => this.setState({ title })}
        />
        <Button disabled={!title} title="Submit" onPress={this.addDeck} />
      </Container>
    )
  }
}
