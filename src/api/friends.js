/* eslint-disable no-tabs */
import apiUrl from '../apiConfig'
import axios from 'axios'

export const findFriend = (data, user) => {
  return axios({
    url: apiUrl + '/users',
    method: 'POST',
    data: {
      recipient: { username: data.recipient }
    },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const addFriend = (recipient, user) => {
  return axios({
    url: apiUrl + '/requests',
    method: 'POST',
    data: {
      request: {
        recipient: recipient.recipient,
        sender: user.id
      }
    }
  })
}
