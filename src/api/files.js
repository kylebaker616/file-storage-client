import apiUrl from '../apiConfig'
import axios from 'axios'

export const upload = (data) => {
  return axios({
    url: apiUrl + '/uploads',
    method: 'POST',
    data: data
  })
}
