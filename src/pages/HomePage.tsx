import Layout from '../components/Layout/Layout'
import Login from '../components/Form/Login/Login'
import ChatList from '@/components/ChatList/ChatList'
import useStore from '@/store/useStore'

const HomePage = () => {
  const status = useStore((state) => state.status)

  return (
    <Layout>
      <main className='flex items-center justify-center w-full font-inter text-text-primary'>
        {status === 'authenticated' ? (
          <ChatList />
        ) : status === 'unauthenticated' ? (
          <Login />
        ) : (
          ''
        )}
      </main>
    </Layout>
  )
}

export default HomePage
