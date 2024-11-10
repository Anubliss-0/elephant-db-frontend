import axios from "axios"
import { User } from "../types"

export const setUserCookies = (jwtToken: string, user: User) => {
  setToken(jwtToken, true)
  setUser(user, true)
}

export const logOutUser = () => {
  removeToken()
}

export const setToken = (jwtToken: string, storeInCookies = false) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`

  if (storeInCookies) {
    document.cookie = `token=${jwtToken}; path=/; Secure; SameSite=Strict`
  }
}

export const setUser = (user: User, storeInCookies = false) => {
  if (storeInCookies) { 
    document.cookie = `user_id=${user.id}; path=/; Secure; SameSite=Strict`;
    document.cookie = `user_name=${encodeURIComponent(user.name)}; path=/; Secure; SameSite=Strict`;
  }
}

export const getCookie = (name: string): string | null => {
  const cookieArr = document.cookie.split(';');
  for (const cookie of cookieArr) {
    const [cookieName, cookieValue] = cookie.trim().split('=')
    if (cookieName === name) {
      return cookieValue
    }
  }
  return null
}

export const removeToken = () => {
  axios.defaults.headers.common['Authorization'] = ''
  document.cookie = 'token=; path=/; Secure; SameSite=Strict'
}
