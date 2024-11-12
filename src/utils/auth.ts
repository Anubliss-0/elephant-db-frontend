import axios from "axios"
import { User } from "../types"
import { logOutUser, signUpUser } from "./api"
import { loginUser } from "./api"
import Cookies from "js-cookie"

export const handleLogin = async (formData: FormData) => {
  const userData = new FormData()
  formData.forEach((value, key) => {
    userData.append(`user[${key}]`, value)
  })

  try {
    const response = await loginUser(userData)
    const token = response.headers.authorization.split(' ')[1]
    const user = response.data.data

    setCookies(token, user)

  } catch (error) {
    console.error('Login failed:', error)
    throw error
  }
}

export const handleLogout = async () => {
  await logOutUser()
  removeCookies()
}

export const handleSignup = async (formData: FormData) => {
  try {
    const response = await signUpUser(formData)
    const token = response.headers.authorization.split(' ')[1]
    const user = response.data.data

    setCookies(token, user) 
  } catch (error) {
    console.error('Signup failed:', error)
    throw error
  }
}

export const setCookies = (jwtToken: string, user: User) => {
  setTokenCookies(jwtToken, true)
  setUserCookies(user, true)
}

export const setTokenCookies = (jwtToken: string, storeInCookies = false) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`

  if (storeInCookies) {
    Cookies.set('token', jwtToken, {
      path: '/',
      secure: true,
      sameSite: 'Strict',
      expires: 1
    });
  }
}

export const setUserCookies = (user: User, storeInCookies = false) => {
  if (storeInCookies) {
    Cookies.set('user', JSON.stringify(user), {
      path: '/',
      secure: true,
      sameSite: 'Strict',
      expires: 1
    });
  }
}

export const getUserCookies = (): User | null => {
  const user = Cookies.get('user');
  try {
    return user ? JSON.parse(user) as User : null;
  } catch (error) {
    console.error('Failed to parse user data from cookies:', error);
    return null;
  }
}

export const getTokenFromCookies = () => {
  return Cookies.get('token')
}

export const removeCookies = () => {
  Cookies.remove('token', { path: '/' })
  Cookies.remove('user', { path: '/' })

  delete axios.defaults.headers.common['Authorization']
}