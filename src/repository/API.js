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

const API = {
  createUser,
  login,
}

export default API