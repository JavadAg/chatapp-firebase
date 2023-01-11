import Search from '@/components/Search/Search'
import Button from '@/components/Ui/Button/Button'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'react-toastify'
import { RiLogoutCircleRLine, RiSunLine, RiMoonLine } from 'react-icons/ri'
import cn from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import useStore from '@/store/useStore'

const Header = () => {
  const { logout } = useAuth()
  const theme = useStore((state) => state.theme)
  const setTheme = useStore((state) => state.setTheme)

  const handleLogout = async () => {
    await logout()
      .then(() => {
        toast.success('Logged out')
      })
      .catch((err) => {
        toast.error(err)
      })
  }

  const moonVariants = {
    checked: {
      scale: 1,
      opacity: 1,
    },
    unchecked: {
      scale: 0,
      opacity: 0,
    },
  }

  const sunVariants = {
    checked: {
      scale: 0,
      opacity: 0,
    },
    unchecked: {
      scale: 1,
      opacity: 1,
    },
  }

  return (
    <header className='relative flex items-center justify-between w-full gap-2 px-2 bg-main-primary h-14 dark:bg-main-dark-primary'>
      <Button
        className='w-8 h-8 text-red-400 duration-200 rounded-full hover:bg-red-100 md:w-9 md:h-9 dark:hover:bg-red-400 dark:hover:text-red-600'
        icon={<RiLogoutCircleRLine />}
        name=''
        onClick={() => {
          handleLogout()
        }}
      />
      <motion.button
        className={cn(
          'h-8 px-2 flex relative w-8 justify-center items-center bg-main-secondary text-lg duration-300 ease-in-out rounded-full md:w-9 md:h-9 hover:bg-neutral-200 dark:bg-main-dark-secondary dark:hover:bg-neutral-600'
        )}
        animate={theme ? 'checked' : 'unchecked'}
        onClick={() => setTheme(theme)}
      >
        <AnimatePresence>
          <motion.i
            key='moon'
            className='absolute'
            variants={moonVariants}
            transition={{ duration: 0.2 }}
          >
            <RiMoonLine />
          </motion.i>

          <motion.i
            key='sun'
            className='absolute'
            variants={sunVariants}
            transition={{ duration: 0.2 }}
          >
            <RiSunLine />
          </motion.i>
        </AnimatePresence>
      </motion.button>
      <Search />
    </header>
  )
}

export default Header
