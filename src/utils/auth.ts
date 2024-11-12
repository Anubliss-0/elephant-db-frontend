import { logOutUser, signUpUser } from "./api"
import { loginUser } from "./api"
import { setCookies, removeCookies } from "./cookieManager"

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