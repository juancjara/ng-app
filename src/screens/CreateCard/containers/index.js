import React from 'react'
import { Button } from 'react-native'

import styled from 'styled-components'
import { addCard } from '../../../storage'

const Container = styled.View`
  flex: 1;
` 
const StyledTextInput = styled.TextInput`
  padding: 10px;
`

export default class CreateCard extends React.Component {
  static navigationOptions = {
    headerTitle: 'Create Card'
  }
  state = {
    question: '',
    answer: '',
  }
  submitCard = async () => {
    const { id } = this.props.navigation.state.params
    await addCard(id, this.state)
    this.props.navigation.navigate('DeckView', { id });
  }
  render() {
    const { question, answer } = this.state;
    const isDisabled = !question || !answer

    return  (
      <Container>
        <StyledTextInput 
          value={question}
          placeholder="Question"
          onChangeText={question => this.setState({ question })}
        />
        <StyledTextInput 
          value={answer}
          placeholder="Answer"
          onChangeText={answer => this.setState({ answer })}
        />
        <Button disabled={isDisabled} title="Submit" onPress={this.submitCard} />
      </Container>
    )
  }
}
