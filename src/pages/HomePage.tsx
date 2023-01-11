import Layout from '../components/Layout/Layout'
import Login from '../components/Form/Login/Login'
import ChatList from '@/components/ChatList/ChatList'
import useStore from '@/store/useStore'
import ChatScreen from '@/components/ChatScreen/ChatScreen'
import { motion } from 'framer-motion'

const HomePage = () => {
  const status = useStore((state) => state.status)

  return (
    <Layout>
      <main className='flex items-center justify-center w-full font-inter text-text-primary dark:text-text-dark-primary'>
        {status === 'authenticated' ? (
          <motion.div
            layout
            className='flex relative items-center justify-center w-full max-w-[60rem]'
          >
            <ChatList />
            <ChatScreen />
          </motion.div>
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
