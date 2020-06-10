import axios from 'axios'

export const getAPIPath = (path: string) => `/api/${path}`

export const request = (path: string, params = {}) => {

  return axios({ ...params, url: path })
    // @ts-ignore
    .then(({ data } = {}) => data)
    .catch(error => {
      throw new Error(error)
    })
}
