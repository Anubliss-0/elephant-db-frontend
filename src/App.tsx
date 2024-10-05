import { useState, useEffect } from 'react'
import axios from 'axios'
import { Outlet, Link } from 'react-router-dom'
import './App.css'

const getCookie = (name: string): string | null => {
  const cookieArr = document.cookie.split(';');
  for (const cookie of cookieArr) {
    const [cookieName, cookieValue] = cookie.trim().split('=')
    if (cookieName === name) {
      return cookieValue
    }
  }
  return null
};

function App() {
  useEffect(() => {
    // Retrieve the token from cookies when the app loads
    const token = getCookie('token')
    
    if (token) {
      // Set Axios defaults with the token if it exists
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }, []) // Runs only on app/component mount

  const [testCount, setTestCount] = useState(0)

  return (
    <>
      <div>
        <h2>Test for state</h2>
        <button onClick={() => setTestCount(testCount + 1)}>{testCount}</button>
        <Link to={'/login'}>Login</Link>
        <Link to={'/new_elephant'}>Add Elephant</Link>
        <Link to={'/elephants'}>Elephants</Link>
      </div>
      <Outlet />
    </>
  )
}

export default App
