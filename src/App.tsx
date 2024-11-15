import { Outlet } from 'react-router-dom'
import NewNavBar from './components/NewNavBar/NewNavBar'

function App() {
  return (
    <>
      <NewNavBar />
      <Outlet />
    </>
  )
}

export default App
