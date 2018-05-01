import { AsyncStorage } from 'react-native'

const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export const NOTIFICATION_KEY = 'NOTIFICATION_KEY'

export const addCard = async (id, card) => {
  const deck = JSON.parse(await getDeck(id))
  deck.cards = deck.cards || [];
  deck.cards.push({...card, id: guid()})
  return AsyncStorage.setItem(id, JSON.stringify(deck))
}

export const isNotificationCreated = async () => AsyncStorage.getItem(NOTIFICATION_KEY)

export const setNotification =  async () => AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));

export const addDeck = async (data) => {
  const id = guid();
  await AsyncStorage.setItem(id, JSON.stringify(data));
  return id
}

export const getDeck = async (id) => AsyncStorage.getItem(id)

export const getKeys = async () =>  AsyncStorage.getAllKeys()

export const getDecks = async () => {
  const keys = AsyncStorage.getAllKeys();
  return Promise.all((keys || []).map(async (id) => getDeck(id)))
}
