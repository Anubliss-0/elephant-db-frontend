import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import NewNavBar from './components/NewNavBar/NewNavBar'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer position="bottom-left"/>
      <NewNavBar />
      <Outlet />
    </>
  )
}

export default App
