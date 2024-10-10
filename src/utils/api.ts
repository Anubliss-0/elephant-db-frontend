import axios from 'axios'
import { setToken } from './auth'

const baseURL: string = 'http://localhost:3000'

// Get all elephants
export const getAllElephants = async () => {
  return axios.get(`${baseURL}/elephants`);
}

// Get elephant by ID
export const getElephantById = async (id: string) => {
  return axios.get(`${baseURL}/elephants/${id}`);
}

// Edit elephant by ID
export const editElephantById = async (id: string, elephantData: { name: string; bio: string }) => {
  return axios.patch(`${baseURL}/elephants/${id}`, {
    elephant: elephantData
  })
}

// Delete elephant by ID
export const deleteElephant = async (id: string) => {
  return axios.delete(`${baseURL}/elephants/${id}`)
}

// Create new elephant
export const createElephant = async (elephantData: { name: string; bio: string }) => {
  return axios.post(`${baseURL}/elephants`, {
    elephant: elephantData,
  })
}

// Log in User
export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${baseURL}/login`, {
    user: { email, password }
  })

  const jwtToken = response.headers.authorization.split(' ')[1]
  setToken(jwtToken, true)

  return response
}