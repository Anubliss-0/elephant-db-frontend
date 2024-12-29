import { Outlet, useLoaderData } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ConfirmationModal from './components/ConfirmationModal/ConfirmationModal'
import 'react-toastify/dist/ReactToastify.css'
import PageContainer from './components/PageContainer/PageContainer'
import NavBar from './components/NavbarThree/NavBar'
import { useUser } from './contexts/UserContext'
import { useEffect } from 'react'
import { ProfileShowData } from './types'
import UserInfo from './components/UserInfo/UserInfo'

function App() {
  const { user: loadedUser } = useLoaderData() as { user: ProfileShowData }
  const { setUser, isUserInfoOpen } = useUser()

  useEffect(() => {
    setUser(loadedUser)
  }, [loadedUser])

  return (
    <>
      <ToastContainer position="bottom-left" />
      <NavBar />
      {isUserInfoOpen && <UserInfo />}
      <PageContainer>
        <Outlet />
      </PageContainer>
      <ConfirmationModal />
    </>
  )
}

export default App
