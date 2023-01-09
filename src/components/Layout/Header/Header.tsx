import Search from '@/components/Search/Search'
import Button from '@/components/Ui/Button/Button'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'react-toastify'

const Header = () => {
  const { logout } = useAuth()
  const handleLogout = async () => {
    await logout()
      .then(() => {
        toast.success('Logged out')
      })
      .catch((err) => {
        toast.error(err)
      })
  }

  return (
    <header className='relative flex items-start justify-between gap-2 p-2 bg-main-primary'>
      <Button
        name='Menu'
        onClick={() => {
          handleLogout()
        }}
      />
      <Search />
    </header>
  )
}

export default Header
