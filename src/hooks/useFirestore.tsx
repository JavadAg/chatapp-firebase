import { db } from '@/services/firebase'
import { User } from 'firebase/auth'
import {
  collection,
  doc,
  FieldPath,
  getDocs,
  query,
  setDoc,
  where,
  WhereFilterOp,
} from 'firebase/firestore'

interface Error {
  code: string
  message: string
}

export const useFirestore = () => {
  const handleSet = async (user: User) => {
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

  const handleGet = async (
    collectionName: string,
    fieldPath: string | FieldPath,
    operationStr: WhereFilterOp,
    filterValue: unknown
  ) => {
    try {
      const q = query(
        collection(db, collectionName),
        where(fieldPath, operationStr, filterValue)
      )

      const querySnapshot = await getDocs(q)
      if (querySnapshot.empty) {
        return 'No results found'
      } else {
        return querySnapshot.docs
      }
    } catch (error) {
      throw new Error((error as { message: string; code: string }).message)
    }
  }

  return { handleGet, handleSet }
}
