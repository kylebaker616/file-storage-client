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
export const showUploads = (user) => {
  return axios({
    url: apiUrl + '/uploads',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
