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

export const addFriend = (data, user) => {
  return axios({
    url: apiUrl + '/requests',
    method: 'POST',
    data: {
      request: {
        recipient: data,
        sender: user._id
      }
    },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
export const findRequester = (data, user) => {
  return axios({
    url: apiUrl + '/userrequests',
    method: 'POST',
    data: {
      sender: { id: data }
    },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
export const acceptRequest = (data, user) => {
  return axios({
    url: apiUrl + '/friends',
    method: 'POST',
    data: {
      friend: { potentialFriend: data }
    },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
export const removeRequest = (data, user) => {
  return axios({
    url: apiUrl + '/requests/' + user._id,
    method: 'DELETE',
    data: {
      request: { id: data }
    },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
