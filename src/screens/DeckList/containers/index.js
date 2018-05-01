import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, Button, ActivityIndicator } from 'react-native';
import styled from 'styled-components'
import { Notifications, Permissions } from 'expo'

import {  getKeys, isNotificationCreated, setNotification, NOTIFICATION_KEY } from '../../../storage'
import Deck from './Deck'

const Container = styled.ScrollView`
  flex: 1;
`

class DeckList extends Component {
  static navigationOptions = {
    headerTitle: 'Decks'
  }
  state = {loading: true, ids: []};
  async componentDidMount() {
    const ids = await getKeys()
    this.setState({
      ids: (ids || []).filter(id => id != NOTIFICATION_KEY),
      loading: false,
    })
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    const isCreated = await isNotificationCreated();
    if (status === 'granted' && !isCreated) {
      const oneDay = 24 * 60 * 60 * 1000;
      Notifications.scheduleLocalNotificationAsync(
       createNotification(),
       {
         time: ((new Date()).getTime() + oneDay),
         repeat: 'day'
       }
      )
     await setNotification();
    }

  }

  render() {
    const { navigation } = this.props;
    const { loading, ids } = this.state 
    return (
      <Container>
        {
          loading ? <ActivityIndicator size="large" color="#0000ff" />:
          ids.map(id => <Deck navigate={navigation.navigate} key={id} id={id} />)
        }
        <Button title="Add deck" onPress={() => navigation.navigate('CreateDeck')} />
      </Container>
    )
  }
}

function createNotification () {
  return {
    title: 'Study app',
    body: "Don't forget to study today!",
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export default DeckList;
