import axios from 'axios'
import { setToken } from './auth'

const baseURL: string = 'http://localhost:3000'

// Get all elephants
export const getAllElephants = async () => {
  return axios.get(`${baseURL}/elephants`)
}

// Get elephant by ID
export const getElephantById = async (id: string) => {
  return axios.get(`${baseURL}/elephants/${id}`)
}

// Update elephant by ID
export const updateElephant = async (id: string, formData: FormData) => {
  return axios.patch(`${baseURL}/elephants/${id}`, formData);
};

// Delete elephant by ID
export const deleteElephant = async (id: string) => {
  return axios.delete(`${baseURL}/elephants/${id}`)
}

// Create new elephant
export const createElephant = async (formData: FormData) => {
  return axios.post(`${baseURL}/elephants`, formData)
}

// Log in User
export const loginUser = async (formData: FormData) => {
  return axios.post(`${baseURL}/login`, formData)
}

// Log out User
export const logOutUser = async () => {
  return axios.delete(`${baseURL}/logout`)
}

// Get profile by ID
export const getProfileById = async (id: string) => {
  return axios.get(`${baseURL}/profiles/${id}`)
}

// Update profile by ID
export const updateProfile = async (id: string, formData: FormData) => {
  return axios.patch(`${baseURL}/profiles/${id}`, formData)
}