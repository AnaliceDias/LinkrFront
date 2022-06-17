import axios from "axios"

const BASE_URL = "http://localhost:4000"

function createUser(body) {
  const promise = axios.post(`${BASE_URL}/sign-up`, body)
  return promise
}

function login(body) {
  const promise = axios.post(`${BASE_URL}`, body)
  return promise
}

function getUser(text){
  const promise = axios.get(`${BASE_URL}/search/users/${text}`)
  return promise
}

const API = {
  createUser,
  login,
  getUser,
}

export default API
