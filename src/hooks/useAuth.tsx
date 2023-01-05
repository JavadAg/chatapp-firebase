import { useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth'
import { auth, db } from '@/services/firebase'
import { useStorage } from './useStorage'
import { useFirestore } from './useFireStore'
import { collection, getDocs, limit, query, where } from 'firebase/firestore'

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
  const { handleSet } = useFirestore()

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
      if (authType === createUserWithEmailAndPassword) {
        const q = query(
          collection(db, 'users'),
          where('displayName', '==', name),
          limit(1)
        )
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(() => {
          throw { code: 'Name already exists' }
        })
      }
      const res = await authType(auth, email, password)

      if (authType === createUserWithEmailAndPassword) {
        let imageURL

        if (avatar && avatar.length > 0) {
          await handleUpload(avatar[0]).then(
            (avatarURL) => (imageURL = avatarURL)
          )
        }
        await updateProfile(res.user, {
          displayName: name,
          photoURL: avatar && avatar.length > 0 ? imageURL : '',
        })

        await handleSet(res.user)
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

  const logout = async () => {
    try {
      const res = await signOut(auth)
      return res
    } catch (error) {
      const errorCode = error as Error
      throw new Error(errorCode.code)
    }
  }

  return { user, handleAuth, isLoading, logout }
}
