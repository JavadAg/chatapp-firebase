import { useAuthStateContext } from '@/context/AuthContext'
import { ReactNode } from 'react'
import { ToastContainer, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './Header/Header'

const Layout = ({ children }: { children: ReactNode }) => {
  const session = useAuthStateContext()

  return (
    <>
      {session.status === 'loading' ? (
        <div>Loading...</div>
      ) : (
        <>
          <Header />
          {children}
          <ToastContainer
            position='bottom-right'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition={Zoom}
            theme='light'
            className='toast'
          />
        </>
      )}
    </>
  )
}

export default Layout
