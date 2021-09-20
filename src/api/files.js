import apiUrl from '../apiConfig'
import axios from 'axios'

export const uploadFile = (fileData, user) => {
  return axios({
    url: apiUrl + '/uploads',
    method: 'POST',
    data: fileData,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
export const pinFile = (upload, user) => {
  return axios({
    url: apiUrl + '/pins',
    method: 'POST',
    data: {
      upload: {
        url: upload.url,
        mimetype: upload.mimetype
      }
    },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
export const showUploads = (user) => {
  return axios({
    url: apiUrl + '/uploads',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
export const deleteFile = (id, key, user) => {
  return axios({
    url: apiUrl + '/uploads/' + id,
    method: 'DELETE',
    data: { data: key },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
export const showFriendUploads = (id) => {
  return axios({
    url: apiUrl + '/frienduploads/' + id,
    method: 'GET'
  })
}
