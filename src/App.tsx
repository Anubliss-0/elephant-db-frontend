import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'

function App() {
  const [testCount, setTestCount] = useState(0)

  return (
    <>
      <div>
        <h2>Test for state</h2>
        <button onClick={() => setTestCount(testCount + 1)}>{testCount}</button>
      </div>
      <Outlet />
    </>
  )
}

export default App
