import React from 'react'
import styled from 'styled-components'
import { Button } from 'react-native'

import Divider from '../../components/Divider'

const Container = styled.View`
  flex: 1;
`

const QuestionTitle = styled.Text`
  padding: 30px;
  font-size: 22;
`
const Answer = styled.Text`
  padding: 0 10px;
  font-size: 16;
`
const ShowAnswerWrapper = styled.TouchableOpacity`
  padding: 0 10px;
`
const ShowAnswerText = styled.Text`
  color: #F44336;
  font-size: 16px;
`

export default class Question  extends React.Component {
  state = { show: false }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id != this.props.id) {
      this.setState({ show: false })
    }
  }


  render() {
    const { question, answer, next } = this.props;
    const { show } = this.state;

    return (
      <Container>
        <QuestionTitle>{question}</QuestionTitle>
        {
          show ?
            <Answer>{answer}</Answer>:
            <ShowAnswerWrapper onPress={() => this.setState({ show: true })}>
              <ShowAnswerText>Show answer</ShowAnswerText>
            </ShowAnswerWrapper>
        }
        <Divider />
        <Button title="Correct" onPress={() => next(1)} color="#4CAF50"/>
        <Divider />
        <Button title="Incorrect" onPress={() => next(0)} color="#F44336" />
      </Container>
    )
  }
}
