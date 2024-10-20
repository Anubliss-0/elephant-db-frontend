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
export const editElephantById = async (id: string, elephantData: any) => {
  const formData = new FormData();
  
  // Append name and bio
  formData.append("name", elephantData.name);
  formData.append("bio", elephantData.bio);

  // Append deleted photo IDs
  elephantData.remove_photo_ids.forEach((id: string) => {
    formData.append("remove_photo_ids[]", id);
  });

  // Append new photos
  elephantData.new_photos.forEach((photo: File, index: number) => {
    formData.append(`photos[new][${index}]`, photo);
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