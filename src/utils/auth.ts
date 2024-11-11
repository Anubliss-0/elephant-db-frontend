import axios from "axios"
import { User } from "../types"
import { logOutUser } from "./api"
import { loginUser } from "./api"

export const setUserCookies = (jwtToken: string, user: User) => {
  setToken(jwtToken, true)
  setUser(user, true)
}

export const removeUserCookies = () => {
  removeToken()
  removeUser()
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

export const removeUser = () => {
  document.cookie = 'user_id=; path=/; Secure; SameSite=Strict'
  document.cookie = 'user_name=; path=/; Secure; SameSite=Strict'
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

export const handleLogin = async (formData: FormData, setUserName: (name: string) => void, setUserId: (id: string) => void, setShowLoginModal: (show: boolean) => void, setError: (error: any) => void) => {
  try {
      const userData = new FormData()
      formData.forEach((value, key) => {
          userData.append(`user[${key}]`, value)
      })

      const response = await loginUser(userData)
      const jwtToken = response.headers.authorization.split(' ')[1]
      const user = response.data.data.profile
      setUserCookies(jwtToken, user)
      setUserName(user.name)
      setUserId(user.id)
      setShowLoginModal(false)
  } catch (err) {
      setError(err)
  }
}

export const handleLogout = async (setUserName: (name: string) => void, setUserId: (id: string) => void, setShowUserProfile: (show: boolean) => void) => {
  await logOutUser()
  removeUserCookies()
  setUserName(null)
  setUserId(null)
  setShowUserProfile(false)
}