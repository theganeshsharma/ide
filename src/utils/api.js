import axios from 'axios'
import store from '../store/index'

class API {
  constructor () {
    this.axi = axios.create({
      baseURL: process.env.api,
      timeout: 5000,
    })
  }

  setToken = (token) => {
    this.axi.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  }

  httpGet = (uri, params) => {
    return this.axi.get(uri, {
      params
    })
  }
}

const api = new API()

export const httpGet = api.httpGet
export const setToken = api.setToken