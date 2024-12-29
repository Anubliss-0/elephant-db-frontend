import axios from 'axios'

const baseURL: string = 'http://localhost:3000'

// Get all elephants
export const getElephantsByQuery = async (query: string) => {
  return axios.get(`${baseURL}/elephants?query=${query}`)
}

// Experimental get all elephants
export const getAllElephants = async (page: string, habitat: string, gender: string, species: string) => {
  return axios.get(`${baseURL}/elephants`, {
    params: { page, habitat, gender, species }
  })
}

// Get elephant by ID
export const getElephantById = async (id: string) => {
  return axios.get(`${baseURL}/elephants/${id}`)
}

export const retreiveAllElephants = async (page: number) => {
  return axios.get(`${baseURL}/elephants`, {
    params: { page }
  })
}

// Update elephant by ID
export const updateElephant = async (id: string, formData: FormData) => {
  return axios.patch(`${baseURL}/elephants/${id}`, formData);
}

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

// Get current user
export const getCurrentUser = async () => {
  return axios.get(`${baseURL}/current_user`)
}

// Get profile by ID
export const getProfileById = async (id: string) => {
  return axios.get(`${baseURL}/profiles/${id}`, {
    params: {
      size: 'medium'
    }
  })
}

// Update profile by ID
export const updateProfile = async (id: string, formData: FormData) => {
  return axios.patch(`${baseURL}/profiles/${id}`, formData)
}

// Sign up user
export const signUpUser = async (formData: FormData) => {
  return axios.post(`${baseURL}/signup`, formData)
}