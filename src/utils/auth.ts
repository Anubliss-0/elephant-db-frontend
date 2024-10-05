import axios from "axios"

export const setToken = (jwtToken: string, storeInCookies = false) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

  if (storeInCookies) {
    document.cookie = `token=${jwtToken}; path=/; Secure; SameSite=Strict`;
  }
};

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