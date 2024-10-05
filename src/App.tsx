import { Outlet, Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      <div>
        <h2>Test for state</h2>
        <Link to={'/login'}>Login</Link>
        <Link to={'/new_elephant'}>Add Elephant</Link>
        <Link to={'/elephants'}>Elephants</Link>
      </div>
      <Outlet />
    </>
  )
}

export default App
