import { useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from 'firebase/auth'
import { auth } from '@/services/firebase'
import { useStorage } from './useStorage'
import { useFirestore } from './useFirestore'

interface AuthProps {
  email: string
  name: string
  password: string
  avatar?: File[] | undefined
}

interface Error {
  code: string
  message: string
}

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User>()
  const { handleUpload } = useStorage()
  const { handleStore } = useFirestore()

  const handleAuth = async ({
    data,
    isLogin,
  }: {
    data: AuthProps
    isLogin: boolean
  }) => {
    const { email, name, password, avatar } = data

    const authType = isLogin
      ? signInWithEmailAndPassword
      : createUserWithEmailAndPassword

    setIsLoading(true)

    try {
      const res = await authType(auth, email, password)

      if (authType === createUserWithEmailAndPassword) {
        let imageURL
        if (avatar) {
          await handleUpload(avatar[0]).then(
            (avatarURL) => (imageURL = avatarURL)
          )
        }
        await updateProfile(res.user, {
          displayName: name,
          photoURL: imageURL,
        })
        await handleStore(res.user)
      }
      setUser(res.user)
      return res.user
    } catch (error) {
      const errorCode = error as Error
      throw new Error(errorCode.code)
    } finally {
      setIsLoading(false)
    }
  }
  return { user, handleAuth, isLoading }
}
