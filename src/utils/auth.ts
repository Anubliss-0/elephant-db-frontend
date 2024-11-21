import { logOutUser, signUpUser } from "./api"
import { loginUser } from "./api"
import { removeTokenCookies, setTokenCookies } from "./cookieManager"
import { clearProfileData, storeProfileData } from "./localStorageManager"

export const handleLogin = async (formData: FormData) => {
  const userData = new FormData()
  formData.forEach((value, key) => {
    userData.append(`user[${key}]`, value)
  })

  try {
    const response = await loginUser(userData)
    const token = response.headers.authorization.split(' ')[1]
    const user = response.data.data

    setTokenCookies(token, true)
    storeProfileData(user)

    return response

  } catch (error) {
    console.error('Login failed:', error)
    throw error
  }
}

export const handleLogout = async () => {
  await logOutUser()
  removeTokenCookies()
  clearProfileData()
}

export const handleSignup = async (formData: FormData) => {
  try {
    const response = await signUpUser(formData)
    const token = response.headers.authorization.split(' ')[1]
    const user = response.data.data

    setTokenCookies(token, true)
    storeProfileData(user)

    return user
    
  } catch (error) {
    console.error('Signup failed:', error)
    throw error
  }
}