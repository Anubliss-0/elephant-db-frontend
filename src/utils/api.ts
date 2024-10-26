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

// Edit elephant by ID
export const editElephantById = async (id: string, elephantData: { name: string; bio: string; photos: { id: string; position: number; status: "keep" | "deleted" | "new" }[] }) => {
  const formData = new FormData();
  
  // Nest name and bio under 'elephant'
  formData.append("elephant[name]", elephantData.name);
  formData.append("elephant[bio]", elephantData.bio);

  // Nest photo positions under 'elephant'
  elephantData.photos.forEach((photo, index) => {
    formData.append(`elephant[photos][${index}][id]`, photo.id);
    formData.append(`elephant[photos][${index}][position]`, photo.position.toString());
    formData.append(`elephant[photos][${index}][status]`, photo.status.toString());
  });

  // Send FormData to Rails API via Axios
  return axios.patch(`${baseURL}/elephants/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Delete elephant by ID
export const deleteElephant = async (id: string) => {
  return axios.delete(`${baseURL}/elephants/${id}`)
}

// Create new elephant
export const createElephant = async (elephantData: { name: string; bio: string; photos: File[] }) => {
  const formData = new FormData()
  
  formData.append('elephant[name]', elephantData.name)
  formData.append('elephant[bio]', elephantData.bio)
  
  elephantData.photos.forEach((photo) => {
    formData.append('elephant[photos][]', photo)
  })

  return axios.post(`${baseURL}/elephants`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
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
