import { useAuthStateContext } from '@/context/AuthContext'
import { ReactNode } from 'react'
import { ToastContainer, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './Header/Header'

const Layout = ({ children }: { children: ReactNode }) => {
  const session = useAuthStateContext()

  return (
    <div className='bg-gradient-to-tr from-bg-primary to-bg-secondary'>
      {session.status === 'loading' ? (
        <div>Loading...</div>
      ) : (
        <>
          {session.status === 'authenticated' ? <Header /> : null}
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
    </div>
  )
}

export default Layout
