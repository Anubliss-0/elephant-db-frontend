import axios from "axios"

export const storeToken = (jwtToken: string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`
    document.cookie = `token=${jwtToken}; path=/; Secure; SameSite=Strict`
  }