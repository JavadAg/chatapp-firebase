import { db } from '@/services/firebase'
import {
  collection,
  doc,
  FieldPath,
  FieldValue,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  WhereFilterOp,
} from 'firebase/firestore'
import { useState } from 'react'

export const useFireStore = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSet = async (
    collectionName: string,
    documentId: string,
    data: {
      [x: string]: FieldValue | string | unknown[]
    }
  ) => {
    try {
      setIsLoading(true)
      await setDoc(doc(db, collectionName, documentId), data)
    } catch (error) {
      throw new Error((error as { message: string; code: string }).code)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdate = async (
    collectionName: string,
    documentId: string,
    data: {
      [x: string]: FieldValue | string
    }
  ) => {
    try {
      setIsLoading(true)
      await updateDoc(doc(db, collectionName, documentId), data)
    } catch (error) {
      throw new Error((error as { message: string; code: string }).code)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGet = async (
    collectionName: string,
    fieldPath: string | FieldPath,
    operationStr: WhereFilterOp,
    filterValue: unknown
  ) => {
    try {
      setIsLoading(true)
      const q = query(
        collection(db, collectionName),
        where(fieldPath, operationStr, filterValue)
      )

      const querySnapshot = await getDocs(q)

      return querySnapshot.docs
    } catch (error) {
      throw new Error((error as { message: string; code: string }).code)
    } finally {
      setIsLoading(false)
    }
  }

  return { handleGet, handleSet, handleUpdate, isLoading }
}
