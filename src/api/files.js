import apiUrl from '../apiConfig'
import axios from 'axios'

export const uploadFile = (fileData) => {
  return axios({
    url: apiUrl + '/uploads',
    method: 'POST',
    data: fileData
  })
}
