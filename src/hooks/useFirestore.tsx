import { db } from '@/services/firebase'
import { User } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

interface Error {
  code: string
  message: string
}

export const useFirestore = () => {
  const handleStore = async (user: User) => {
    try {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      })
    } catch (error) {
      const errorCode = error as Error
      throw new Error(errorCode.code)
    }
  }

  return { handleStore }
}
