import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import UserLoader from './components/UserLoader'

function App() {
  return (
    <>
      <UserLoader />
      <NavBar />
      <Outlet />
    </>
  )
}

export default App
