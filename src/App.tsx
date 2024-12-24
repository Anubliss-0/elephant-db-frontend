import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import NewNavBar from './components/NewNavBar/NewNavBar'
import ConfirmationModal from './components/Shared/ConfirmationModal/ConfirmationModal'
import 'react-toastify/dist/ReactToastify.css'
import PageContainer from './components/PageContainer/PageContainer'

function App() {
  return (
    <>
      <ToastContainer position="bottom-left" />
      <NewNavBar />
      <PageContainer>
        <Outlet />
      </PageContainer>
      <ConfirmationModal />
    </>
  )
}

export default App
