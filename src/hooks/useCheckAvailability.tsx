import { db } from '@/services/firebase'
import { collection, getDocs, limit, query, where } from 'firebase/firestore'

export const useCheckAvailability = () => {
  const handleCheckAvailability = async (value: string) => {
    try {
      const q = query(
        collection(db, 'users'),
        where('displayName', '==', value),
        limit(1)
      )
      const querySnapshot = await getDocs(q)
      if (querySnapshot.empty) {
        return false
      } else {
        return true
      }
    } catch (error) {
      throw new Error('Something went wrong')
    }
  }

  return { handleCheckAvailability }
}
