import { Outlet, useLoaderData } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
// import NewNavBar from './components/NewNavBar/NewNavBar'
import ConfirmationModal from './components/Shared/ConfirmationModal/ConfirmationModal'
import 'react-toastify/dist/ReactToastify.css'
import PageContainer from './components/PageContainer/PageContainer'
import NavBar from './components/NavbarThree/NavBar'
import { useUser } from './contexts/UserContext'
import { useEffect } from 'react'
import { ProfileShowData } from './types'

function App() {
  const { user: loadedUser } = useLoaderData() as { user: ProfileShowData }
  const { setUser } = useUser()

  useEffect(() => {
    setUser(loadedUser)
  }, [loadedUser])

  return (
    <>
      <ToastContainer position="bottom-left" />
      {/* <NewNavBar /> */}
      <NavBar />
      <PageContainer>
        <Outlet />
      </PageContainer>
      <ConfirmationModal />
    </>
  )
}

export default App
