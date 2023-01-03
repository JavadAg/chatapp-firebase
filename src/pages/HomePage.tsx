import Layout from '../components/Layout/Layout'
import Login from '../components/Form/Login/Login'
import { useAuthStateContext } from '@/context/AuthContext'
import UserList from '@/components/UserList/UserList'

const HomePage = () => {
  const session = useAuthStateContext()

  return (
    <Layout>
      <main className='flex items-center justify-center w-full min-h-screen font-inter text-text-primary'>
        {session.status === 'authenticated' ? (
          <UserList />
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
