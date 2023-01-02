import Layout from '../components/Layout/Layout'
import cn from 'clsx'
import Login from '../components/Form/Login/Login'
import { useAuthStateContext } from '@/context/AuthContext'
import Chat from '@/Chat/Chat'

const HomePage = () => {
  const session = useAuthStateContext()

  return (
    <Layout>
      <main
        className={cn(
          `font-inter bg-gradient-to-tr from-bg-primary to-bg-secondary w-full min-h-screen flex justify-center items-center text-text-primary`
        )}
      >
        {session.status === 'authenticated' ? (
          <Chat />
        ) : session.status === 'unauthenticated' ? (
          <Login />
        ) : (
          ''
        )}
      </main>
    </Layout>
  )
}

export default HomePage
