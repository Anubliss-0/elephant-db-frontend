import axios from 'axios';

const baseURL:string = 'http://localhost:3000'

// Get all elephants
export const getAllElephants = async () => {
  return axios.get(`${baseURL}/elephants`);
};

// Get elephant by ID
export const getElephantById = async (id: string) => {
  return axios.get(`http://localhost:3000/elephants/${id}`);
};

// Delete elephant by ID
export const deleteElephant = async (id: string) => {
  return axios.delete(`http://localhost:3000/elephants/${id}`);
};

// Create new elephant
export const createElephant = async (elephantData: { name: string; bio: string }) => {
  return axios.post('http://localhost:3000/elephants', {
    elephant: elephantData,
  });
};