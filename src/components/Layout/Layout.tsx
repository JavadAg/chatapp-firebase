import useStore from '@/store/useStore'
import { ReactNode, useEffect } from 'react'
import { ToastContainer, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from '../Ui/Loading/Loading'

const Layout = ({ children }: { children: ReactNode }) => {
  const theme = useStore((state) => state.theme)
  const status = useStore((state) => state.status)

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-tr from-bg-primary to-bg-secondary dark:from-bg-dark-primary dark:to-bg-dark-secondary'>
      {status === 'loading' ? (
        <Loading text='Checking User' />
      ) : (
        <>
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
